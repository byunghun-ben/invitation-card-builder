import { z } from "zod";

const updateMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
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
    images: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        display_order: z.number(),
      }),
    ),
  }),
);

export const updateRequestSchema = z.object({
  metadata: updateMetadataSchema.optional(),
  weddingHall: updateWeddingHallSchema.optional(),
  stories: updateStoriesSchema.optional(),
  posts: updatePostsSchema.optional(),
});

export type UpdateMetadata = z.infer<typeof updateMetadataSchema>;
export type UpdateWeddingHall = z.infer<typeof updateWeddingHallSchema>;
export type UpdateStories = z.infer<typeof updateStoriesSchema>;
export type UpdatePosts = z.infer<typeof updatePostsSchema>;

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
});

const getWeddingHallSchema = z.object({
  template_id: z.string(),
  name: z.string(),
  address: z.string(),
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
});

const getInstaMetadataSchema = z.object({
  template_id: z.string(),
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
  created_at: z.string(),
});

export const instaTemplateResponseSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  code: z.string(),
  metadata: getInstaMetadataSchema,
  posts: z.array(getInstaPostSchema),
  stories: z.array(getInstaStorySchema),
  wedding_hall: getWeddingHallSchema,
});
