"use server";

import { client } from "@/trigger";
import { CommitsPayload } from "./types";

/**
 * Forward form data to the Trigger.dev client
 */
export async function jobRun(payload: CommitsPayload) {
  return await client.sendEvent({
    name: "trigger.github",
    payload,
  });
}
