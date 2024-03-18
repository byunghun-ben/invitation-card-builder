import { z } from "zod";

export const deleteCommentRequestSchema = z.object({
  // id는 1글자 이상이여야 하고, :id 이면 안된다.
  id: z
    .string()
    .min(1)
    .refine(id => id !== ":id"),
  password: z.string().min(1),
});

export type DeleteCommentRequest = z.infer<typeof deleteCommentRequestSchema>;
