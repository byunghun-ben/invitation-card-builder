import { z } from "zod";

export const StoryResponseSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  created_at: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      created_at: z.string(),
    }),
  ),
});
