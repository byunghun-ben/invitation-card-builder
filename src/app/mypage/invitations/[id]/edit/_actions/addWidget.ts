"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType, WidgetType } from "@/types/invitation";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const onAddWidget = async ({
  invitationId,
  newWidget,
}: {
  invitationId: string;
  newWidget: WidgetType;
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    logger.error("User not found");
    return;
  }

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("invitations");
    const invitations = db.collection<InvitationType>("invitations");
    const invitation = await invitations.updateOne(
      {
        _id: new ObjectId(invitationId),
        "user.id": user.id,
      },
      {
        $push: {
          widgets: newWidget,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
