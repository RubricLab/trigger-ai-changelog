"use server";

import { client } from "@/trigger";

/**
 * Forward form data to the Trigger.dev client
 */
export const runGenerateJob = async (payload: {
  repoUrl: string;
  startDate?: string;
  endDate?: string;
}): Promise<any> => {
  return await client.sendEvent({
    name: "changelog.generate",
    payload,
  });
};
