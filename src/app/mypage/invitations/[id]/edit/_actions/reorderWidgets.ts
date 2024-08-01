"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType } from "@/types/invitation";
import logger from "@/utils/logger";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

type Props = {
  widgetIndex: number;
  invitationId: string;
  direction: "up" | "down";
};

export const reorderWidgets = async ({
  widgetIndex,
  invitationId,
  direction,
}: Props) => {
  const _id = new ObjectId(invitationId);

  try {
    const mongoClient = await clientPromise;

    const db = mongoClient.db("invitations");
    const collection = db.collection<InvitationType>("invitations");
    const invitations = await collection.findOne({
      _id,
    });

    if (!invitations) {
      throw new Error("Invitation not found");
    }

    const widgets = invitations.widgets;

    if (direction === "up") {
      if (widgetIndex === 0) {
        return;
      }

      const temp = widgets[widgetIndex - 1];
      widgets[widgetIndex - 1] = widgets[widgetIndex];
      widgets[widgetIndex] = temp;
    } else {
      if (widgetIndex === widgets.length - 1) {
        return;
      }

      const temp = widgets[widgetIndex + 1];
      widgets[widgetIndex + 1] = widgets[widgetIndex];
      widgets[widgetIndex] = temp;
    }

    await collection.updateOne(
      {
        _id,
      },
      {
        $set: {
          widgets,
        },
      },
    );

    revalidatePath(`/mypage/invitations/${invitationId}/edit`);
  } catch (error) {
    logger.error("Error reordering widgets", error);
  }
};
