"use server";

import { InvitationSchema } from "@/app/mypage/invitations/[id]/edit/types";
import { createClient } from "@/utils/supabase/server";

export const getInvitation = async (invitationId: number) => {
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
        )
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
