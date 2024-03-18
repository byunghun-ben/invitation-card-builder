import { z } from "zod";

export const createCommentRequestSchema = z.object({
  post_id: z.string(),
  name: z.string(),
  content: z.string(),
  password: z.string(),
});

export type CreateCommentRequest = z.infer<typeof createCommentRequestSchema>;
