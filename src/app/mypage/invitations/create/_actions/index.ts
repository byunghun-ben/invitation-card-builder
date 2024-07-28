"use server";

import { Owner } from "@/schemas/pagesisters";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { TemplateFormValues } from "../_hooks/TemplateFormContext";
import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import logger from "@/utils/logger";
import { z } from "zod";

const getCoupleType = (owners: Owner[]) => {
  let coupleType = "groom_bride";

  if (owners[0].role === "bride" && owners[1].role === "groom") {
    coupleType = "bride_groom";
  }

  if (owners[0].role === "bride" && owners[1].role === "bride") {
    coupleType = "bride_bride";
  }

  if (owners[0].role === "groom" && owners[1].role === "groom") {
    coupleType = "groom_groom";
  }

  return coupleType;
};

const createCouples = async (
  weddingId: number,
  owners: Owner[],
): Promise<void> => {
  const supabase = createClient();

  const coupleType = getCoupleType(owners);

  const { data, error } = await supabase.from("couples").insert({
    wedding_id: weddingId,
    first_person_name: owners[0].name,
    second_person_name: owners[1].name,
    couple_type: coupleType,
  });

  if (error) {
    throw error;
  }
};

const createVenues = async (
  weddingId: number,
  location: TemplateFormValues["location"],
): Promise<void> => {
  if (!location) {
    throw new Error("location is required");
  }

  const supabase = createClient();

  const { data, error } = await supabase.from("venues").insert({
    wedding_id: weddingId,
    venue_name: location.placeName,
    hall_name: location.placeDetail,
    address: location.address,
    road_address: location.roadAddress,
    coord_x: location.coord[0],
    coord_y: location.coord[1],
    map_type: location.mapType,
  });

  if (error) {
    throw error;
  }
};

const createWedding = async (props: {
  weddingDate: TemplateFormValues["eventAt"]["date"];
  weddingTime: TemplateFormValues["eventAt"]["time"];
}): Promise<number> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 정보를 가져올 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("weddings")
    .insert({
      wedding_date: format(props.weddingDate, "yyyy-MM-dd"),
      wedding_time: props.weddingTime,
      user_id: user.id,
    })
    .select(`id`)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

const createInvitation = async (weddingId: number): Promise<number> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      wedding_id: weddingId,
      invitation_type_id: 1,
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

export const createTemplateMetadata = async (
  formValues: TemplateFormValues,
): Promise<{ invitationId: number }> => {
  // createCouples와 createVenues가 병렬로 실행되고, 둘 중 하나라도 에러가 발생하면
  // Promise.all은 에러를 던지고, 둘 다 성공하면 아무것도 반환하지 않습니다.

  const weddingId = await createWedding({
    weddingDate: formValues.eventAt.date,
    weddingTime: formValues.eventAt.time,
  });

  const [_, __, invitationId] = await Promise.all([
    createCouples(weddingId, formValues.owners),
    createVenues(weddingId, formValues.location),
    createInvitation(weddingId),
  ]);

  revalidatePath("/mypage");

  return {
    invitationId,
  };
};

export const createInvitationByMongoDB = async (
  formValues: TemplateFormValues,
) => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw error;
  }

  const date = new Date(
    `${format(formValues.eventAt.date, "yyyy-MM-dd")} ${formValues.eventAt.time}`,
  );
  const formattedDate = format(date, "yyyy년 MM월 dd일 HH시 mm분");
  const title = `${formValues.owners[0].name} & ${formValues.owners[1].name}의 결혼식`;
  const description = formValues.location
    ? `${title}이 ${formattedDate}에 ${formValues.location.placeName}에서 열립니다.`
    : `${title}이 ${formattedDate}에 열립니다.`;

  const client = await clientPromise;
  const db = client.db("invitations");
  const invitations = db.collection("invitations");
  const result = await invitations.insertOne({
    createdAt: new Date(),
    user: {
      id: user.id,
      email: user.email,
    },
    owners: formValues.owners,
    location: formValues.location,
    eventAt: {
      date: format(formValues.eventAt.date, "yyyy-MM-dd"),
      time: formValues.eventAt.time,
    },
    meta: {
      title,
      description,
    },
    updatedAt: new Date(),
    widgets: [],
  });

  logger.log("result", result);

  return result.insertedId.toString();
};
