"use server";

import clientPromise from "@/lib/mongodb";
import { CommentSchema } from "@/schemas/invitation";
import { CommentType } from "@/types/invitation";
import { revalidatePath } from "next/cache";

export const getComments = async (widgetId: string) => {
  const mongoClient = await clientPromise;
  const db = mongoClient.db();
  const collection = db.collection("comments");
  const comments = await collection.findOne({
    widgetId,
  });

  if (!comments) {
    return null;
  }

  const { data, error } = CommentSchema.safeParse({
    ...comments,
    id: comments._id.toString(),
  });

  if (error) {
    return null;
  }

  return data;
};

export const postWidgetComment = async (
  invitationId: string,
  widgetId: string,
  formValues: {
    id: string;
    name: string;
    content: string;
    password: string;
  },
) => {
  const comment = await getComments(widgetId);

  const mongoClient = await clientPromise;
  const db = mongoClient.db();

  if (!comment) {
    const collection = db.collection("comments");
    await collection.insertOne({
      widgetId,
      comments: [{ ...formValues, createdAt: new Date() }],
    });
  } else {
    const collection = db.collection<CommentType>("comments");
    await collection.updateOne(
      { widgetId },
      {
        $push: {
          comments: { ...formValues, createdAt: new Date() },
        },
      },
    );
  }

  revalidatePath(`/invitations/${invitationId}`);
};
