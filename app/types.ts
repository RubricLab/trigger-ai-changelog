import { z } from "zod";

export const commitsPayload = z.object({
  repoUrl: z.string().url(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const openaiPayload = z.object({
  commits: z.array(
    z.object({
      message: z.string(),
      author: z.string().optional(),
    })
  ),
});

export const supabasePayload = z.object({
  markdown: z.string(),
  owner: z.string(),
  repo: z.string(),
  date: z.string(),
});

export type CommitsPayload = z.infer<typeof commitsPayload>;
export type OpenaiPayload = z.infer<typeof openaiPayload>;
export type SupabasePayload = z.infer<typeof supabasePayload>;
