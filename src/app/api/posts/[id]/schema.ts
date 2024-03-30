import { z } from "zod";

export const updatePostRequestSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  likes: z.number().optional(),
});

export type UpdatePostRequest = z.infer<typeof updatePostRequestSchema>;

const getInstaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  display_order: z.number().default(0),
});

const getInstaCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  created_at: z.string(),
});

export const getPostResponseSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  content: z.string(),
  images: getInstaImageSchema.array(),
  likes: z.number(),
  comments: getInstaCommentSchema.array(),
  display_order: z.number(),
});

export type GetPostResponse = z.infer<typeof getPostResponseSchema>;
