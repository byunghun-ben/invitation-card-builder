"use server";

import { InvitationSchema } from "@/app/mypage/invitations/[id]/edit/types";
import clientPromise from "@/lib/mongodb";
import { invitationSchema, WeddingSchema } from "@/schemas/invitation";
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
  return invitationSchema
    .array()
    .parse(result.map(r => ({ ...r, id: r._id.toString() })));
};

export const getInvitation = async (id: string) => {
  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations.findOne({ _id: new ObjectId(id) });

  if (!result) {
    throw new Error("Invitation not found");
  }

  return invitationSchema.parse({
    ...result,
    id: result._id.toString(),
  });
};
