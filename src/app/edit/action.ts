"use server";

import {
  UpdateInstaTemplate,
  baseInstaTemplateSchema,
  instaImageSchema,
} from "@/schemas/instaTemplate";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
};

export const updateTemplate = async (
  templateCode: string,
  data: UpdateInstaTemplate,
) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  revalidatePath(`/edit/${templateCode}`);
};

export const getTemplateByUserId = async (userId: string) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const url = `${protocol}://${host}/api/insta-templates`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await response.json();

  const templates = baseInstaTemplateSchema.array().parse(responseBody);

  return templates.filter(template => template.userId === userId);
};

export const uploadFile = async (file: File): Promise<{ path: string }> => {
  "use server";
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("images")
    .upload(file.name, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const uploadImage = async (image: { path: string }) => {
  "use server";
  const BASE_URL =
    "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images";

  const url = `${BASE_URL}/${image.path}`;

  const supabase = createClient();

  const { data, error } = await supabase
    .schema("insta_template")
    .from("images")
    .insert({ url })
    .select(`*`)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return instaImageSchema.parse({
    ...data,
    displayOrder: data.display_order,
  });
};
