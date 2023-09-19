"use server";

import { client } from "@/trigger";
import { CommitsPayload } from "./types";

/**
 * Forward form data to the Trigger.dev client
 */
export const runGenerateJob = async (payload: CommitsPayload) => {
  return await client.sendEvent({
    name: "changelog.generate",
    payload,
  });
};
