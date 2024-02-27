import z from "zod";

export const instaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  display_order: z.number().default(0),
});

const instaStorySchema = z.object({
  id: z.string(),
  title: z.string(),
  images: z.array(instaImageSchema),
});

const weddingHallSchema = z.object({
  template_id: z.string(),
  name: z.string(),
  address: z.string(),
  content: z.string(),
  images: z.array(instaImageSchema),
});

const instaCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  created_at: z.string(),
});

export const instaPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  images: z.array(instaImageSchema),
  likes: z.number(),
  comments: z.array(instaCommentSchema),
});

export const instaMetadataSchema = z.object({
  template_id: z.string(),
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
  created_at: z.string(),
});

export const instaTemplateSchema = z.object({
  id: z.string(),
  code: z.string(),
  metadata: instaMetadataSchema.omit({ template_id: true, created_at: true }),
  posts: z.array(instaPostSchema),
  stories: z.array(instaStorySchema),
  wedding_hall: weddingHallSchema,
});

export type InstaImage = z.infer<typeof instaImageSchema>;
export type InstaStory = z.infer<typeof instaStorySchema>;
export type InstaComment = z.infer<typeof instaCommentSchema>;
export type InstaPost = z.infer<typeof instaPostSchema>;
export type InstaMetadata = z.infer<typeof instaMetadataSchema>;
export type InstaWeddingHall = z.infer<typeof weddingHallSchema>;
export type InstaTemplate = z.infer<typeof instaTemplateSchema>;
