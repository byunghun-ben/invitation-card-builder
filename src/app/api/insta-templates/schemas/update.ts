import { z } from "zod";

const updateImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  displayOrder: z.number(),
});

const updateMetadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  groomName: z.string().optional(),
  brideName: z.string().optional(),
});

const updateWeddingHallSchema = z.object({
  name: z.string(),
  address: z.string(),
  roadAddress: z.string().optional(),
  url: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  content: z.string(),
  images: z.array(updateImageSchema),
});

const updateStoriesSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    displayOrder: z.number(),
    images: z.array(updateImageSchema),
  }),
);

const updatePostsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    displayOrder: z.number(),
    images: z.array(updateImageSchema),
  }),
);

export const updateTemplateSchema = z.object({
  metadata: updateMetadataSchema.optional(),
  weddingHall: updateWeddingHallSchema.optional(),
  stories: updateStoriesSchema.optional(),
  posts: updatePostsSchema.optional(),
});

export type UpdateMetadataDto = z.infer<typeof updateMetadataSchema>;
export type UpdateWeddingHallDto = z.infer<typeof updateWeddingHallSchema>;
export type UpdateStoriesDto = z.infer<typeof updateStoriesSchema>;
export type UpdatePostsDto = z.infer<typeof updatePostsSchema>;
export type UpdateTemplateDto = z.infer<typeof updateTemplateSchema>;
