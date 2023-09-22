import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { supabaseLookup, supabasePayload } from "@/app/types";
import { Supabase } from "@trigger.dev/supabase";
import { Database } from "@/app/types/supabase";

const supabase = new Supabase<Database>({
  id: "supabase",
  projectId: process.env.SUPABASE_ID!,
  supabaseKey: process.env.SUPABASE_KEY!,
});

client.defineJob({
  id: "supabase",
  name: "Supabase - Save Changelog",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "trigger.supabase.upsert",
    schema: supabasePayload,
  }),
  integrations: {
    supabase,
  },
  run: async (payload, io) => {
    const { owner, repo, markdown, date } = payload;

    try {
      const task = await io.supabase.runTask("save-changelog", async (db) => {
        const upsertRepo = await db
          .from("repos")
          .upsert({ owner, name: repo })
          .select("id")
          .single();

        if (upsertRepo.error) throw upsertRepo.error;
        if (!upsertRepo.data)
          throw new Error("No data returned from upsertRepo");

        const upsertChangelog = await db.from("changelogs").upsert(
          {
            markdown,
            repo: upsertRepo.data?.id,
            date,
          },
          {
            onConflict: "repo,date",
          }
        );

        if (upsertChangelog.error) throw upsertChangelog.error;

        return upsertChangelog.data;
      });

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});

client.defineJob({
  id: "supabase-get",
  name: "Supabase - Get Changelog",
  version: "0.1.0",
  trigger: eventTrigger({
    name: "trigger.supabase.get",
    schema: supabaseLookup,
  }),
  integrations: {
    supabase,
  },
  run: async (payload, io) => {
    const { owner, repo, date } = payload;

    try {
      const task = await io.supabase.runTask("get-changelog", async (db) => {
        const changelog = await db
          .from("repos")
          .select("changelogs ( markdown )")
          .eq("owner", owner)
          .eq("name", repo)
          .eq("changelogs.date", date)
          .single();

        if (changelog.error) throw changelog.error;
        if (!changelog.data) throw new Error("No data returned from changelog");

        return changelog.data;
      });

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
