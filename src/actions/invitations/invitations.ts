"use server";

import clientPromise from "@/lib/mongodb";
import { invitationSchema } from "@/schemas/invitation";
import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export const getInvitations = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations
    .find({
      "user.id": user.id,
    })
    .toArray();
  return invitationSchema
    .array()
    .parse(result.map(r => ({ ...r, id: r._id.toString() })));
};

export const getInvitation = async (id: string) => {
  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations.findOne({ _id: new ObjectId(id) });

  if (!result) {
    logger.error(`Failed to find invitation: ${id}`);
    return null;
  }

  const { data, error } = invitationSchema.safeParse({
    ...result,
    id: result._id.toString(),
  });

  if (error) {
    logger.error(`Failed to parse invitation: ${error.message}`);
    return null;
  }

  return data;
};
