"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
};

// updateMetadata
const updateMetadataDto = z.object({
  title: z.string(),
  description: z.string(),
  groomName: z.string(),
  brideName: z.string(),
});

type UpdateMetadataDto = z.infer<typeof updateMetadataDto>;

export const updateMetadata = async ({
  templateId,
  dto,
}: {
  templateId: string;
  dto: UpdateMetadataDto;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .update(dto)
    .eq("template_id", templateId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateTag("metadata");
};
