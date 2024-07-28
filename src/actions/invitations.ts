"use server";

import { InvitationSchema } from "@/app/mypage/invitations/[id]/edit/types";
import clientPromise from "@/lib/mongodb";
import { WeddingSchema } from "@/schemas/invitation";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getInvitationV1 = async (invitationId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("invitations")
    .select(
      `
      id,
      weddingId:wedding_id,
      invitationTypeId:invitation_type_id,
      widgets (
        id,
        type,
        order,
        instaPostWidget:insta_post_widgets (
          content,
          images (
            id,
            url:image_url
          )
        ),
        instaMapWidget:insta_map_widgets (
          title,
          placeName:place_name,
          placeDetail:place_detail,
          address,
          roadAddress:road_address,
          coordX:coord_x,
          coordY:coord_y
        ),
        instaCoverWidget:insta_cover_widgets (*)
      ),
      wedding:weddings (
        *,
        couple:couples (*),
        venue:venues (*)
      )
    `,
    )
    .eq("id", invitationId)
    .single();

  if (error) {
    throw error;
  }

  const invitation = InvitationSchema.parse(data);

  return invitation;
};

export const getWedding = async (weddingId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("weddings")
    .select(
      `
      id,
      weddingDate:wedding_date,
      weddingTime:wedding_time,
      couple:couples (
        firstPersonName:first_person_name,
        secondPersonName:second_person_name,
        coupleType:couple_type
      ),
      venue:venues (
        venueName:venue_name,
        hallName:hall_name,
        address,
        roadAddress:road_address,
        coordX:coord_x,
        coordY:coord_y
      )
    `,
    )
    .eq("id", weddingId)
    .single();

  if (error) {
    throw error;
  }

  return WeddingSchema.parse(data);
};

const invitationSchema = z.object({
  _id: z.instanceof(ObjectId),
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
  widgets: z.array(z.any()),
});

export const getInvitations = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations
    .find({
      "user.id": user.id,
    })
    .toArray();
  return invitationSchema.array().parse(result);
};
