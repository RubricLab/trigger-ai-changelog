import { z } from "zod";

export const commitsPayload = z.object({
  repoUrl: z.string().url(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type CommitsPayload = z.infer<typeof commitsPayload>;

export type CommitsResponse = {
  commit: {
    message:string
  }
}[] 