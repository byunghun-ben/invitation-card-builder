import { z } from "zod";

export const WeddingSchema = z.object({
  id: z.number(),
  weddingDate: z.string(),
  weddingTime: z.string(),
  couple: z.object({
    firstPersonName: z.string(),
    secondPersonName: z.string(),
    coupleType: z.string(),
  }),
  venue: z.object({
    venueName: z.string(),
    hallName: z.string(),
    address: z.string(),
    roadAddress: z.string(),
    coordX: z.number(),
    coordY: z.number(),
  }),
});

export type WeddingType = z.infer<typeof WeddingSchema>;
