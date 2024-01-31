import { z } from "zod";

const InstaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export type InstaImage = z.infer<typeof InstaImageSchema>;

const InstaMetadataSchema = z.object({
  brideName: z.string(),
  groomName: z.string(),
  title: z.string().default(""),
});

export type InstaMetadata = z.infer<typeof InstaMetadataSchema>;

const InstaStorySchema = z.object({
  id: z.string(),
  title: z.string(),
  images: InstaImageSchema.array(),
});

export type InstaStory = z.infer<typeof InstaStorySchema>;

const InstaPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  images: InstaImageSchema.array(),
});

export type InstaPost = z.infer<typeof InstaPostSchema>;

const InstaWeddingHallSchema = z.object({
  name: z.string(),
  address: z.string(),
  images: InstaImageSchema.array(),
  content: z.string(),
});

export type InstaWeddingHall = z.infer<typeof InstaWeddingHallSchema>;

export const InstaTemplateSchema = z.object({
  _id: z.string(),
  id: z.string(),
  password: z.string(),
  hasPaid: z.boolean(),
  metadata: InstaMetadataSchema.default({
    brideName: "",
    groomName: "",
    title: "",
  }),
  stories: InstaStorySchema.array().default([]),
  posts: InstaPostSchema.array().default([]),
  weddingHall: InstaWeddingHallSchema.default({
    name: "",
    address: "",
    images: [],
    content: "",
  }),
});
