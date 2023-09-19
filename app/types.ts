import { z } from "zod";

export const commitsPayload = z.object({
  repoUrl: z.string().url(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CommitsPayload = z.infer<typeof commitsPayload>;

export const changelogPayload = z.object({
  commits: z.array(
    z.object({
      message: z.string(),
      author: z.string().optional(),
    })
  ),
});
