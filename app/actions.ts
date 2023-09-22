"use server";

import { client } from "@/trigger";
import { CommitsPayload, SupabasePayload } from "./types";

export async function jobRun(payload: CommitsPayload) {
  return await client.sendEvent({
    name: "trigger.github",
    payload,
  });
}

export async function saveToSupabase(payload: SupabasePayload) {
  return await client.sendEvent({
    name: "trigger.supabase.upsert",
    payload,
  });
}
