"use server";

import { createClient } from "@/utils/supabase/server";
import { InstaMetadataResponse, dbInstaMetadataSchema } from "../../schema";

export const getMetadata = async (
  templateCode: string,
): Promise<InstaMetadataResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .select(
      `
      *,
      template!inner ()
    `,
    )
    .eq("template.code", templateCode)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  console.log("getMetadata", templateCode);

  if (!data) {
    throw new Error("Not found");
  }

  const validationResult = dbInstaMetadataSchema.parse(data);

  return validationResult;
};
