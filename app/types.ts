import { z } from "zod";

export const commitsPayload = z.object({
  repoUrl: z.string().url(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type CommitsPayload = z.infer<typeof commitsPayload>;
