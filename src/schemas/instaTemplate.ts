import { z } from "zod";

export const instaMetadataSchema = z.object({
  templateId: z.string(),
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
  createdAt: z.string(),
});

export const instaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  displayOrder: z.number(),
});

export const instaCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

export const instaPostSchema = z.object({
  id: z.string(),
  templateId: z.string(),
  title: z.string(),
  content: z.string(),
  images: z.array(instaImageSchema),
  likes: z.number(),
  comments: z.array(instaCommentSchema),
  displayOrder: z.number(),
});

export const instaStorySchema = z.object({
  id: z.string(),
  templateId: z.string(),
  title: z.string(),
  images: z.array(instaImageSchema),
  displayOrder: z.number(),
});

export const instaWeddingHallInfoSchema = z.object({
  name: z.string(),
  address: z.string(),
  roadAddress: z.string().default(""),
  url: z.string().default(""),
  lat: z.string().default(""),
  lng: z.string().default(""),
});

export const instaWeddingHallSchema = z
  .object({
    templateId: z.string(),
    content: z.string(),
    images: z.array(instaImageSchema),
  })
  .merge(instaWeddingHallInfoSchema);

// export const instaWeddingHallSchema = z.object({
//   templateId: z.string(),
//   name: z.string(),
//   address: z.string(),
//   roadAddress: z.string().default(""),
//   url: z.string().default(""),
//   lat: z.string().default(""),
//   lng: z.string().default(""),
//   content: z.string(),
//   images: z.array(instaImageSchema),
// });

export const baseInstaTemplateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  code: z.string(),
});

export const instaTemplateSchema = baseInstaTemplateSchema.merge(
  z.object({
    metadata: instaMetadataSchema,
    posts: z.array(instaPostSchema),
    stories: z.array(instaStorySchema),
    weddingHall: instaWeddingHallSchema,
  }),
);

export type InstaMetadata = z.infer<typeof instaMetadataSchema>;
export type InstaImage = z.infer<typeof instaImageSchema>;
export type InstaComment = z.infer<typeof instaCommentSchema>;
export type InstaPost = z.infer<typeof instaPostSchema>;
export type InstaStory = z.infer<typeof instaStorySchema>;

export type InstaWeddingHallInfo = z.infer<typeof instaWeddingHallInfoSchema>;
export type InstaWeddingHall = z.infer<typeof instaWeddingHallSchema>;

export type BaseInstaTemplate = z.infer<typeof baseInstaTemplateSchema>;
export type InstaTemplate = z.infer<typeof instaTemplateSchema>;

const updateMetadataSchema = instaMetadataSchema.pick({
  title: true,
  description: true,
  groomName: true,
  brideName: true,
});

const updateWeddingHallSchema = instaWeddingHallSchema.pick({
  name: true,
  address: true,
  content: true,
  images: true,
});

const updateStoriesSchema = instaStorySchema.array();

const updatePostsSchema = instaPostSchema.array();

export const updateInstaTemplateSchema = z.object({
  metadata: updateMetadataSchema.optional(),
  weddingHall: updateWeddingHallSchema.optional(),
  stories: updateStoriesSchema.optional(),
  posts: updatePostsSchema.optional(),
});

export type UpdateInstaTemplate = z.infer<typeof updateInstaTemplateSchema>;
