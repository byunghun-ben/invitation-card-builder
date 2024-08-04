import { ObjectId } from "mongodb";
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

// MongoDB
const BaseWidgetSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const InstaCoverWidgetSchema = BaseWidgetSchema.extend({
  type: z.literal("INSTA_COVER"),
  content: z.string().default(""),
  url: z.string(),
});

export const InstaPostWidgetSchema = BaseWidgetSchema.extend({
  type: z.literal("INSTA_POST"),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
    }),
  ),
  content: z.string(),
});

export const InstaMapWidgetSchema = BaseWidgetSchema.extend({
  type: z.literal("INSTA_MAP"),
  placeName: z.string(),
  placeDetail: z.string(),
  address: z.string(),
  roadAddress: z.string(),
  coord: z.array(z.number()),
});

export const InstaGreetingWidgetSchema = BaseWidgetSchema.extend({
  type: z.literal("INSTA_GREETING"),
  greetingContent: z.string(),
  hosts: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
});

export const WidgetSchema = z.union([
  InstaCoverWidgetSchema,
  InstaPostWidgetSchema,
  InstaMapWidgetSchema,
  InstaGreetingWidgetSchema,
]);

export const invitationSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  user: z.object({
    id: z.string(),
    email: z.string(),
  }),
  owners: z.array(
    z.object({
      id: z.union([z.literal("firstOwner"), z.literal("secondOwner")]),
      role: z.union([z.literal("groom"), z.literal("bride")]),
      name: z.string(),
    }),
  ),
  location: z
    .object({
      address: z.string(),
      coord: z.array(z.number()),
      mapType: z.literal("KAKAO"),
      placeDetail: z.string(),
      placeId: z.string(),
      placeName: z.string(),
      roadAddress: z.string(),
    })
    .nullable(),
  eventAt: z.object({
    date: z.string(),
    time: z.string(),
  }),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  updatedAt: z.date(),
  widgets: z.array(WidgetSchema),
});

export const LikeSchema = z.object({
  id: z.string(),
  widgetId: z.string(),
  likes: z.array(z.object({ userId: z.string(), likedAt: z.date() })),
});
