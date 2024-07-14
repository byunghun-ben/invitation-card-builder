"use server";

import { Owner } from "@/schemas/pagesisters";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { TemplateFormValues } from "../_hooks/TemplateFormContext";

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

const createCouples = async (owners: Owner[]) => {
  const supabase = createClient();

  const coupleType = getCoupleType(owners);

  const { data, error } = await supabase
    .from("couples")
    .insert({
      first_person_name: owners[0].name,
      second_person_name: owners[1].name,
      couple_type: coupleType,
    })
    .select(`id`)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

const createVenues = async (location: TemplateFormValues["location"]) => {
  if (!location) {
    return;
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("venues")
    .insert({
      venue_name: location.placeName,
      hall_name: location.placeDetail,
      address: location.address,
      road_address: location.roadAddress,
      coord_x: location.coord[0],
      coord_y: location.coord[1],
      map_type: location.mapType,
    })
    .select(`id`)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

const createWedding = async (props: {
  coupleId: number;
  venueId: number;
  weddingDate: TemplateFormValues["eventAt"]["date"];
  weddingTime: TemplateFormValues["eventAt"]["time"];
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("weddings")
    .insert({
      couple_id: props.coupleId,
      venue_id: props.venueId,
      wedding_date: format(props.weddingDate, "yyyy-MM-dd"),
      wedding_time: props.weddingTime,
    })
    .select(`id`)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

const createInvitation = async (weddingId: number) => {
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

  const [coupleId, venueId] = await Promise.all([
    createCouples(formValues.owners),
    createVenues(formValues.location),
  ]);

  const weddingId = await createWedding({
    coupleId,
    venueId,
    weddingDate: formValues.eventAt.date,
    weddingTime: formValues.eventAt.time,
  });

  const invitationId = await createInvitation(weddingId);

  return {
    invitationId,
  };
};
