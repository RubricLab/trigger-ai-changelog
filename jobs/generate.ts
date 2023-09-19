import { Octokit } from "octokit";
import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { commitsPayload } from "@/app/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

client.defineJob({
  id: "generate",
  name: "GitHub - Get Commits",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "changelog.generate",
    schema: commitsPayload,
  }),
  run: async (payload, io) => {
    const { repoUrl, startDate, endDate } = payload;
    const [owner, repo] = repoUrl.split("/").slice(-2);

    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7)).toISOString();

    try {
      const { data: commits } = await octokit.rest.repos.listCommits({
        owner,
        repo,
        // Default to one week ago
        since: startDate || weekAgo,
        until: endDate || new Date().toISOString(),
        per_page: 100,
      });

      return commits;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
