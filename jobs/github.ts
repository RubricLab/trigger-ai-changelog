import { Octokit } from "octokit";
import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { commitsPayload } from "@/app/types";
import { daysAgo, now } from "@/lib/utils";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

client.defineJob({
  id: "github",
  name: "GitHub - Get Commits",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "trigger.github",
    schema: commitsPayload,
  }),
  run: async (payload, io) => {
    const { repoUrl, startDate, endDate } = payload;
    const [owner, repo] = repoUrl.split("/").slice(-2);

    try {
      const commitsTask = await io.runTask("Fetching commits...", async () => {
        const { data } = await octokit.rest.repos.listCommits({
          owner,
          repo,
          // Default to one week ago
          since: startDate || daysAgo(7).toISOString(),
          until: endDate || now().toISOString(),
          per_page: 100,
        });

        return data;
      });

      const modifiedCommits = commitsTask.map(({ commit, author }) => ({
        message: commit.message
          .trim()
          .replaceAll("\r", "")
          .replaceAll("\n\n", "\n"),
        author: author?.login,
      }));

      const { id } = await io.sendEvent("Call OpenAI API...", {
        name: "trigger.openai",
        payload: {
          commits: modifiedCommits,
        },
      });

      return { id };
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
