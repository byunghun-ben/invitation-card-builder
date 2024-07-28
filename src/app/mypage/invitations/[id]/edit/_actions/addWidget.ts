"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { VenueSchema } from "../types";
import logger from "@/utils/logger";

const createWidget = async ({
  invitationId,
  widgetType,
  widgetLastOrder,
}: {
  invitationId: number;
  widgetType: string;
  widgetLastOrder: number;
}): Promise<number> => {
  const supabase = createClient();

  const { data: newWidget, error } = await supabase
    .from("widgets")
    .insert({
      invitation_id: invitationId,
      type: widgetType,
      order: widgetLastOrder + 1,
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return newWidget?.id;
};

const createInstaPostWidget = async (widgetId: number): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.from("insta_post_widgets").insert({
    widget_id: widgetId,
    content: "",
  });

  if (error) {
    throw error;
  }
};

const createInstaMapWidget = async ({
  widgetId,
  weddingId,
}: {
  widgetId: number;
  weddingId: number;
}): Promise<void> => {
  const supabase = createClient();

  const { data: venueData, error: venueError } = await supabase
    .from("venues")
    .select(
      `
      venueName:venue_name,
      hallName:hall_name,
      address,
      roadAddress:road_address,
      coordX:coord_x,
      coordY:coord_y,
      mapType:map_type
    `,
    )
    .eq("wedding_id", weddingId)
    .single();

  const { data: venue, error: venueParseError } =
    VenueSchema.safeParse(venueData);

  if (venueError || venueParseError) {
    throw venueError || venueParseError;
  }

  const { error } = await supabase.from("insta_map_widgets").insert({
    widget_id: widgetId,
    title: "약도",
    place_name: venue.venueName,
    place_detail: venue.hallName,
    address: venue.address,
    road_address: venue.roadAddress,
    coord_x: venue.coordX,
    coord_y: venue.coordY,
  });

  if (error) {
    throw error;
  }
};

const createInstaCoverWidget = async ({
  widgetId,
  weddingId,
}: {
  widgetId: number;
  weddingId: number;
}): Promise<void> => {
  const supabase = createClient();

  const { data: couplesData, error: couplesError } = await supabase
    .from("couples")
    .select(
      `
      first_person_name,
      second_person_name
    `,
    )
    .eq("wedding_id", weddingId)
    .single();

  if (couplesError) {
    throw couplesError;
  }

  const title = `${couplesData.first_person_name} & ${couplesData.second_person_name}`;

  const { error } = await supabase.from("insta_cover_widgets").insert({
    widget_id: widgetId,
    title,
    url: "",
  });

  if (error) {
    throw error;
  }
};

export const onAddWidget = async ({
  weddingId,
  invitationId,
  widgetType,
  widgetLastOrder,
}: {
  weddingId: number;
  invitationId: number;
  widgetType: string;
  widgetLastOrder: number;
}) => {
  console.log("invitationId", invitationId);
  const widgetId = await createWidget({
    invitationId,
    widgetLastOrder,
    widgetType,
  });

  try {
    switch (widgetType) {
      case "INSTA_POST": {
        await createInstaPostWidget(widgetId);
        break;
      }

      case "INSTA_MAP": {
        await createInstaMapWidget({ widgetId, weddingId });
        break;
      }

      case "INSTA_COVER": {
        await createInstaCoverWidget({ widgetId, weddingId });
        break;
      }

      default: {
        logger.error("Unknown widget type", { widgetType });
        return;
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
