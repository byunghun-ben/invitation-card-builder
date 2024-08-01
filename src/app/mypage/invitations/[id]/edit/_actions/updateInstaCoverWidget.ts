"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType } from "@/types/invitation";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
  invitationId: string;
  widgetIndex: number;
  title: string;
  imageUrl: string;
  content: string;
};

export const updateInstaCoverWidget = async ({
  invitationId,
  widgetIndex,
  title,
  content,
  imageUrl,
}: Props) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const mongoClient = await clientPromise;
  const db = mongoClient.db("invitations");
  const collection = db.collection<InvitationType>("invitations");

  await collection.updateOne(
    {
      _id: new ObjectId(invitationId),
      "user.id": user.id,
    },
    {
      $set: {
        [`widgets.${widgetIndex}.title`]: title,
        [`widgets.${widgetIndex}.url`]: imageUrl,
        [`widgets.${widgetIndex}.content`]: content,
      },
    },
  );

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
