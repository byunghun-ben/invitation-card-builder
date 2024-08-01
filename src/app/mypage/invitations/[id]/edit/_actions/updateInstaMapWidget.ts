"use server";

import clientPromise from "@/lib/mongodb";
import { InvitationType } from "@/types/invitation";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
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
  widgetIndex: number;
  invitationId: string;
};

export const updateInstaMapWidget = async ({
  formValues,
  widgetIndex,
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const mongoClient = await clientPromise;

  const db = mongoClient.db("invitations");
  const invitations = db.collection<InvitationType>("invitations");

  await invitations.updateOne(
    {
      _id: new ObjectId(invitationId),
      "user.id": user.id,
    },
    {
      $set: {
        [`widgets.${widgetIndex}.title`]: title,
        [`widgets.${widgetIndex}.placeName`]: placeName,
        [`widgets.${widgetIndex}.placeDetail`]: placeDetail,
        [`widgets.${widgetIndex}.address`]: address,
        [`widgets.${widgetIndex}.road_address`]: roadAddress,
        [`widgets.${widgetIndex}.coord`]: [coordX, coordY],
      },
    },
  );

  revalidatePath(`/mypage/invitations/${invitationId}/edit`);
};
