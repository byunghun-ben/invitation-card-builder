import { z } from "zod";

const dbInstaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  display_order: z.number(),
});

const dbInstaCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  created_at: z.string(),
});

export const dbInstaPostSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  content: z.string(),
  likes: z.number(),
  display_order: z.number(),
});

const dbDetailedInstaPostSchema = dbInstaPostSchema.merge(
  z.object({
    images: z.array(dbInstaImageSchema),
    comments: z.array(dbInstaCommentSchema),
  }),
);

export const dbInstaMetadataSchema = z.object({
  template_id: z.string(),
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
  created_at: z.string(),
});
