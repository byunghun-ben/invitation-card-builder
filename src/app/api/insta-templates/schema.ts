import { z } from "zod";

const updateMetadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  groomName: z.string().optional(),
  brideName: z.string().optional(),
});

const updateWeddingHallSchema = z.object({
  name: z.string(),
  address: z.string(),
  content: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      display_order: z.number(),
    }),
  ),
});

const updateStoriesSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    display_order: z.number(),
    images: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        display_order: z.number(),
      }),
    ),
  }),
);

const updatePostsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    display_order: z.number(),
    images: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        display_order: z.number(),
      }),
    ),
  }),
);

export const updateTemplateSchema = z.object({
  metadata: updateMetadataSchema.optional(),
  weddingHall: updateWeddingHallSchema.optional(),
  stories: updateStoriesSchema.optional(),
  posts: updatePostsSchema.optional(),
});

export type UpdateMetadata = z.infer<typeof updateMetadataSchema>;
export type UpdateWeddingHall = z.infer<typeof updateWeddingHallSchema>;
export type UpdateStories = z.infer<typeof updateStoriesSchema>;
export type UpdatePosts = z.infer<typeof updatePostsSchema>;
export type UpdateTemplateDto = z.infer<typeof updateTemplateSchema>;

// get
const getInstaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  display_order: z.number().default(0),
});

const getInstaStorySchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  images: z.array(getInstaImageSchema),
  display_order: z.number(),
});

const getWeddingHallSchema = z.object({
  template_id: z.string(),
  name: z.string(),
  address: z.string(),
  road_address: z.string(),
  url: z.string(),
  lat: z.string(),
  lng: z.string(),
  content: z.string(),
  images: z.array(getInstaImageSchema),
});

const getInstaCommentSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  created_at: z.string(),
});

const getInstaPostSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  content: z.string(),
  images: z.array(getInstaImageSchema),
  likes: z.number(),
  comments: z.array(getInstaCommentSchema),
  display_order: z.number(),
});

export const dbInstaMetadataSchema = z.object({
  template_id: z.string(),
  title: z.string(),
  description: z.string(),
  groom_name: z.string(),
  bride_name: z.string(),
  created_at: z.string(),
});

export const baseInstaTemplateResponseSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  code: z.string(),
});

export const instaTemplateResponseSchema =
  baseInstaTemplateResponseSchema.merge(
    z.object({
      metadata: dbInstaMetadataSchema,
      posts: z.array(getInstaPostSchema),
      stories: z.array(getInstaStorySchema),
      wedding_hall: getWeddingHallSchema,
    }),
  );

export type InstaMetadataResponse = z.infer<typeof dbInstaMetadataSchema>;
export type InstaImageResponse = z.infer<typeof getInstaImageSchema>;
export type InstaCommentResponse = z.infer<typeof getInstaCommentSchema>;
export type InstaPostResponse = z.infer<typeof getInstaPostSchema>;
export type InstaStoryResponse = z.infer<typeof getInstaStorySchema>;
export type InstaWeddingHallResponse = z.infer<typeof getWeddingHallSchema>;
export type BaseInstaTemplateResponse = z.infer<
  typeof baseInstaTemplateResponseSchema
>;
export type InstaTemplateResponse = z.infer<typeof instaTemplateResponseSchema>;
