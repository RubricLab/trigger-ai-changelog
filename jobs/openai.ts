import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { changelogPayload } from "@/app/types";
import { OpenAI } from "@trigger.dev/openai";

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
      const res = await io.runTask("Generating changelog...", async () => {
        const prefix = `
    You're a head of developer relations tasked with writing a friendly changelog for your team.
    Below are the commit messages since the last changelog.
    Begin with one paragraph to introduce any themes or highlights.
    Then, summarize the important commit messages in bullet points.
    Feel free to write markdown.
    Keep it light and limit prose.
    `;
        const prompt = `${prefix}\n\n${commits
          .map((c) => c.message)
          .join("\n")}`;

        // const response = await io.openai.backgroundCreateChatCompletion(
        //   "OpenAI Completions API",
        //   {
        //     model: "gpt-4",
        //     messages: [
        //       {
        //         role: "user",
        //         content: prompt,
        //       },
        //     ],
        //   }
        // );
        const response = {
          choices: [
            {
              message: {
                content: "dummy",
              },
            },
          ],
        };

        if (!response?.choices?.length) {
          throw new Error("OpenAI failed to return a response");
        }

        return response.choices[0].message.content;
      });

      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
