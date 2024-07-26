import { map, z } from "zod";

// Schema
export const InstaPostWidgetSchema = z.object({
  id: z.number(),
  order: z.number(),
  type: z.literal("INSTA_POST"),
  instaPostWidget: z.object({
    images: z.array(
      z.object({
        id: z.number(),
        url: z.string(),
      }),
    ),
    content: z.string(),
  }),
});

export const InstaMapWidgetSchema = z.object({
  id: z.number(),
  order: z.number(),
  type: z.literal("INSTA_MAP"),
  instaMapWidget: z.object({
    title: z.string(),
    placeName: z.string(),
    placeDetail: z.string(),
    address: z.string(),
    roadAddress: z.string(),
    coordX: z.number(),
    coordY: z.number(),
  }),
});

export const WidgetSchema = z.discriminatedUnion("type", [
  InstaPostWidgetSchema,
  InstaMapWidgetSchema,
]);

export const InvitationSchema = z.object({
  id: z.number(),
  weddingId: z.number(),
  invitationTypeId: z.number(),
  widgets: z.array(WidgetSchema),
});

export const VenueSchema = z.object({
  venueName: z.string(),
  hallName: z.string(),
  address: z.string(),
  roadAddress: z.string(),
  coordX: z.number(),
  coordY: z.number(),
  mapType: z.union([z.literal("KAKAO"), z.literal("NAVER")]),
});

// Type
export type InstaPostWidget = z.infer<typeof InstaPostWidgetSchema>;
export type InstaMapWidget = z.infer<typeof InstaMapWidgetSchema>;
export type Widget = z.infer<typeof WidgetSchema>;
export type Invitation = z.infer<typeof InvitationSchema>;
