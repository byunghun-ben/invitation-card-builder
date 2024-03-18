import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getSupabaseUser = async () => {
  "use server";
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !user) {
    console.error(getUserError);
    redirect("/auth/login");
  }

  return user;
};
