import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { openaiPayload } from "@/app/types";
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
    schema: openaiPayload,
  }),
  integrations: { openai },
  run: async (payload, io) => {
    const { commits } = payload;

    try {
      const markdown: string = await io.runTask(
        "Generating changelog...",
        async () => {
          const prefix = `
Limit prose. Be extremely concise.
You're the head of developer relations at a SaaS. You'll write a short and professional but fun changelog.
Below are the commit messages since the last changelog.
Title: catchy and foretelling.
Intro: fun; themes and highlights.
Then, summarize the most important changes in bullet points.
Write in markdown. Ignore numbers, IDs, and timestamps. Keep it light.
Limit prose.
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
      throw e;
    }
  },
});
