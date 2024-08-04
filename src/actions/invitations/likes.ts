"use server";

import clientPromise from "@/lib/mongodb";
import { LikeSchema } from "@/schemas/invitation";
import { LikeType } from "@/types/invitation";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const getWidgetLike = async (widgetId: string) => {
  const mongoClient = await clientPromise;
  const db = mongoClient.db();
  const collection = db.collection("likes");
  const like = await collection.findOne({
    widgetId,
  });

  if (!like) {
    return null;
  }

  const { data, error } = LikeSchema.safeParse({
    ...like,
    id: like._id.toString(),
  });

  if (error) {
    return null;
  }

  return data;
};

export const postWidgetLike = async (
  invitationId: string,
  widgetId: string,
  userId: string,
) => {
  const like = await getWidgetLike(widgetId);

  const mongoClient = await clientPromise;
  const db = mongoClient.db();

  if (!like) {
    const collection = db.collection("likes");
    await collection.insertOne({
      widgetId,
      likes: [{ userId, likedAt: new Date() }],
    });
  } else {
    const collection = db.collection<LikeType>("likes");
    await collection.updateOne(
      { widgetId },
      {
        $push: {
          likes: { userId, likedAt: new Date() },
        },
      },
    );
  }

  revalidatePath(`/invitations/${invitationId}`);
};
