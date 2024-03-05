"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { UpdateRequest } from "../api/insta-templates/schema";

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/");
};

export const updateTemplate = async (
  templateCode: string,
  data: UpdateRequest,
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

  revalidatePath("/create");
};
