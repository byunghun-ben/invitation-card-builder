"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType } from "@/types/invitation";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

type FormValues = {
  title: string;
  greetingContent: string;
  hosts: {
    name: string;
    description: string;
  }[];
};

export const updateInstaGreetingWidget = async (
  invitationId: string,
  widgetIndex: number,
  formValues: FormValues,
) => {
  try {
    const _id = new ObjectId(invitationId);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("invitations");
    const collection = db.collection<InvitationType>("invitations");
    await collection.updateOne(
      {
        _id,
        "user.id": user.id,
      },
      {
        $set: {
          [`widgets.${widgetIndex}.title`]: formValues.title,
          [`widgets.${widgetIndex}.greetingContent`]:
            formValues.greetingContent,
          [`widgets.${widgetIndex}.hosts`]: formValues.hosts,
        },
      },
    );

    revalidatePath(`/mypage/invitations/${invitationId}/edit`);
  } catch (error) {
    logger.error(error);
  }
};
