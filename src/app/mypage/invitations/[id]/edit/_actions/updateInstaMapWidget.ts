"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type Props = {
  formValues: {
    title: string;
    placeName: string;
    placeDetail: string;
    address: string;
    roadAddress: string;
    coordX: number;
    coordY: number;
  };
  widgetId: number;
  invitationId: number;
};

export const updateInstaMapWidget = async ({
  formValues,
  widgetId,
  invitationId,
}: Props) => {
  const {
    title,
    placeName,
    placeDetail,
    address,
    roadAddress,
    coordX,
    coordY,
  } = formValues;
  const supabase = createClient();

  await supabase
    .from("insta_map_widgets")
    .update({
      title,
      place_name: placeName,
      place_detail: placeDetail,
      address,
      road_address: roadAddress,
      coord_x: coordX,
      coord_y: coordY,
    })
    .eq("widget_id", widgetId);

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
