"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const editInstaPostWidget = async ({
  imageIds,
  widgetId,
  invitationId,
  content,
}: {
  imageIds: number[];
  widgetId: number;
  invitationId: number;
  content: string;
}) => {
  console.log("저장");

  const supabase = createClient();

  const newImages = imageIds.map(imageId => ({
    image_id: imageId,
    insta_post_widget_id: widgetId,
  }));

  if (newImages.length !== 0) {
    const { error } = await supabase
      .from("insta_post_widgets_images_link")
      .insert(newImages);

    if (error) {
      console.error(error);
      return;
    }
  }

  const { error: error2 } = await supabase
    .from("insta_post_widgets")
    .update({
      content,
    })
    .eq("widget_id", widgetId);

  if (error2) {
    console.error(error2);
    return;
  }

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
