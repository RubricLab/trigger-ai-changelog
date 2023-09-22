"use server";

import { client } from "@/trigger";
import { CommitsPayload, SupabaseLookup, SupabasePayload } from "./types";

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

export async function getSupabaseChangelogs(payload: SupabaseLookup) {
  return await client.sendEvent({
    name: "trigger.supabase.get",
    payload,
  });
}
