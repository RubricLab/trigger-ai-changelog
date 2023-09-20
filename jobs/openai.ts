import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { changelogPayload } from "@/app/types";
import { OpenAI } from "@trigger.dev/openai";

const maxTokens = Math.floor(4097 * 3.5);

const openai = new OpenAI({
  id: "openai",
  apiKey: process.env.OPENAI_API_KEY!,
});

client.defineJob({
  id: "openai",
  name: "OpenAI - Generate Changelog",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "trigger.openai",
    schema: changelogPayload,
  }),
  integrations: { openai },
  run: async (payload, io) => {
    const { commits } = payload;

    try {
      const markdown: string = await io.runTask(
        "Generate changelog...",
        async () => {
          const prefix = `
    You're the head of developer relations tasked with writing a changelog for your team that's fun to read.
    Start with a title to introduce the release.
    Below are the commit messages since the last changelog.
    Begin with a fun paragraph to introduce themes and highlights.
    Then, summarize the important commit messages in bullet points.
    Write in GitHub-flavored markdown.
    Omit IDs and timestamps.
    Keep it light and limit prose.
    `;

          const prompt = `${prefix}\n\n${commits
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

          if (!response?.choices?.length) {
            throw new Error("OpenAI failed to return a response");
          }

          return response.choices[0].message?.content || "";
        }
      );

      return { markdown };
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
