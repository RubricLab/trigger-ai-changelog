import { z } from "zod";
import { client } from "@/trigger";
import { Github } from "@trigger.dev/github";
import { OpenAI } from "@trigger.dev/openai";
import { eventTrigger } from "@trigger.dev/sdk";
import { Supabase, SupabaseManagement } from "@trigger.dev/supabase";
import { Database } from "@/app/types/supabase";

const maxTokens = Math.floor(4097 * 3.5);

const openai = new OpenAI({
  id: "openai",
  apiKey: process.env.OPENAI_API_KEY!,
});

const github = new Github({
  id: "github",
  token: process.env.GITHUB_TOKEN!,
});

export const supabase = new Supabase<Database>({
  id: "supabase",
  projectId: process.env.SUPABASE_ID!,
  supabaseKey: process.env.SUPABASE_KEY!,
});

const supabaseManagement = new SupabaseManagement({
  id: "supabase-mgmt",
});

const supabaseTriggers = supabaseManagement.db<Database>(
  process.env.SUPABASE_ID!
);

client.defineJob({
  id: "supabase-changelog-inserted",
  name: "Changelog created",
  version: "0.1.0",
  trigger: supabaseTriggers.onInserted({
    table: "changelogs",
  }),
  run: async (payload, io) => {
    await io.sendEvent("Generate changelog", {
      id: payload.record.id.toString(),
      name: "generate.changelog",
      payload: {
        changelogId: payload.record.id,
      },
    });
  },
});

client.defineJob({
  id: "generate-changelog",
  name: "Generate Changelog",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "generate.changelog",
    schema: z.object({
      changelogId: z.number(),
    }),
  }),
  integrations: { supabase, github, openai },
  run: async (payload, io) => {
    const gettingRecordStatus = await io.createStatus(
      "Generating changelog...",
      {
        label: "Fetching repo",
        state: "loading",
      }
    );

    //1. get the changelog and repo record from Supabase
    const changelog = await io.supabase.runTask(
      "Get changelog",
      async (client) => {
        const record = await client
          .from("changelogs")
          .select(
            `
          id,
          start_date,
          end_date,
          repo: repos(*)
          `
          )
          .eq("id", payload.changelogId)
          .maybeSingle();

        if (!record.data) {
          throw new Error("No changelog found");
        }

        return record.data;
      }
    );

    if (!changelog.repo) {
      await gettingRecordStatus.update("fetch failed", {
        label: `No repo found`,
        state: "failure",
      });
      throw new Error("No repo found");
    }
    const { owner, repo } = changelog.repo;

    await gettingRecordStatus.update("record fetched", {
      label: "Fetched repo",
      state: "success",
    });

    const gettingCommitsStatus = await io.createStatus("Getting commits", {
      label: "Fetching commits from GitHub",
      state: "loading",
    });

    //2. get all of the commit messages from Github
    const rawCommits = await io.github.runTask(
      "Getting commits...",
      async (client) => {
        const { data } = await client.rest.repos.listCommits({
          owner,
          repo,
          // Default to one week ago
          since: changelog.start_date,
          until: changelog.end_date,
          per_page: 100,
        });

        return data;
      }
    );

    if (rawCommits.length === 0) {
      await gettingCommitsStatus.update("No commits found", {
        label: "No commits found",
        state: "failure",
      });
      throw new Error("No commits found");
    }

    await gettingCommitsStatus.update("Got commits", {
      label: `Fetched ${rawCommits.length} commits from GitHub`,
      state: "success",
    });

    const summarizingStatus = await io.createStatus("Summarizing commits", {
      label: `Summarizing ${rawCommits.length} commits using OpenAI`,
      state: "loading",
    });

    //3. Get the commits into the correct format for the prompt
    const commits = rawCommits.map(({ commit, author }) => ({
      message: commit.message
        .trim()
        .replaceAll("\r", "")
        .replaceAll("\n\n", "\n"),
      author: author?.login,
    }));

    //4. Generate the changelog using OpenAI
    const promptPrefix = `
    Limit prose. Be extremely concise.
    You're the head of developer relations at a SaaS. You'll write a short and professional but fun changelog.
    Below are the commit messages since the last changelog.
    Title: catchy and foretelling.
    Intro: fun; themes and highlights.
    Then, summarize the most important changes in bullet points.
    Write in markdown. Ignore numbers, IDs, and timestamps. Keep it light.
    Limit prose.`;

    const prompt = `${promptPrefix}\n\n${commits
      .map((c) => c.message)
      .join("\n")
      .slice(0, maxTokens)}`;

    const response = await io.openai.backgroundCreateChatCompletion(
      "OpenAI Completions API",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }
    );

    const changelogMarkdown = response.choices.at(0)?.message?.content;

    if (!changelogMarkdown) {
      await summarizingStatus.update("completed", {
        label: "Failed to summarize commits",
        state: "failure",
      });
      throw new Error("OpenAI failed to return a response");
    }

    await summarizingStatus.update("completed summary", {
      label: `Summarized ${rawCommits.length} commits using OpenAI`,
      state: "success",
    });

    const savingStatus = await io.createStatus("Storing commits", {
      label: "Saving changelog to Supabase",
      state: "loading",
    });

    await io.supabase.runTask(
      "Update changelog with markdown",
      async (client) => {
        await client
          .from("changelogs")
          .update({
            markdown: changelogMarkdown,
          })
          .eq("id", payload.changelogId);
      }
    );

    await savingStatus.update("completed saving", {
      label: "Saved changelog to Supabase",
      state: "success",
    });

    return {
      markdown: changelogMarkdown,
    };
  },
});
