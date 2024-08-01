"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType } from "@/types/invitation";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editInstaPostWidget = async ({
  images,
  widgetIndex,
  invitationId,
  content,
}: {
  widgetIndex: number;
  images: { id: string; url: string }[];
  invitationId: string;
  content: string;
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const mongoClient = await clientPromise;
  const db = mongoClient.db("invitations");
  const invitations = db.collection<InvitationType>("invitations");

  const invitation = await invitations.updateOne(
    {
      _id: new ObjectId(invitationId),
      "user.id": user.id,
    },
    {
      $set: {
        [`widgets.${widgetIndex}.content`]: content,
        [`widgets.${widgetIndex}.images`]: images,
      },
    },
  );

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
