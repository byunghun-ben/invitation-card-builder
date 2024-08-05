"use server";

import { getInvitation } from "@/actions/invitations/invitations";
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
    logger.error("Failed to add widget", error);
    return;
  }

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};

export const removeWidget = async ({
  invitationId,
  widgetId,
}: {
  invitationId: string;
  widgetId: string;
}) => {
  try {
    const invitation = await getInvitation(invitationId);

    if (!invitation) {
      logger.error(`Failed to find invitation: ${invitationId}`);
      return;
    }

    const newWidgets = invitation.widgets.filter(({ id }) => id !== widgetId);
    const mongoClient = await clientPromise;
    const db = mongoClient.db("invitations");
    const collection = db.collection<InvitationType>("invitations");
    await collection.updateOne(
      { _id: new ObjectId(invitationId) },
      {
        $set: {
          widgets: newWidgets,
        },
      },
    );

    revalidatePath(`/mypage/invitations/${invitationId}/edit`);
  } catch (error) {
    logger.error("Failed to remove widget", error);
    return;
  }
};
