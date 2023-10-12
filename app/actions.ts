"use server";

import { supabase } from "@/jobs";
import { client } from "@/trigger";
import { redirect } from "next/navigation";
import { Database } from "./types/supabase";
import { z } from "zod";
import { daysAgo } from "@/lib/utils";

//this schema takes the form data, valdates it and extracts the owner/repo
const formSchema = z
  .object({
    //intentionally not a URL because it'll work if you pass in just owner/repo
    repoUrl: z.string(),
    startDate: z.coerce.date().default(daysAgo(7)),
    endDate: z.coerce.date().default(new Date()),
  })
  .transform((data, ctx) => {
    const segments = data.repoUrl.split("/");
    if (segments.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid repo URL",
        path: ["repoUrl"],
      });

      return z.NEVER;
    }

    const [owner, repo] = segments.slice(-2);

    return {
      ...data,
      owner,
      repo,
    };
  });

export async function generateChangelog(formData: FormData) {
  const { owner, repo, startDate, endDate, repoUrl } = formSchema.parse(
    Object.fromEntries(formData.entries())
  );

  //create a Supabase row, this will cause a Job to run
  const repoRecords = await supabase.native
    .from("repos")
    .upsert({
      owner,
      repo,
      repo_url: repoUrl,
    })
    .select()
    .maybeSingle();

  if (!repoRecords.data) {
    throw `${repoRecords.error?.message}\n${repoRecords.error?.details}`;
  }

  const changelogRecord = await supabase.native
    .from("changelogs")
    .insert({
      repo: repoRecords.data.id,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    })
    .select()
    .maybeSingle();

  if (!changelogRecord.data) {
    throw `${changelogRecord.error?.message}\n${changelogRecord.error?.details}`;
  }

  //redirect to the page where we're going to show the generated log
  redirect(`/changelogs/${owner}/${repo}/${changelogRecord.data.id}`);
}
