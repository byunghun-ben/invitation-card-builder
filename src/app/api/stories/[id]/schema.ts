import { z } from "zod";

const instaImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  display_order: z.number().default(0),
});

export const getStoryResponseSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  images: z.array(instaImageSchema),
  display_order: z.number(),
});

export type GetStoryResponse = z.infer<typeof getStoryResponseSchema>;
