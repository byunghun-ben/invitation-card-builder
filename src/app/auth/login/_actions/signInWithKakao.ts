import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const URL = getURL();

type Params = {
  next?: string;
};

export const signInWithKakao = async ({ next = "/" }: Params) => {
  "use server";
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${URL}/auth/callback/kakao?next=${next}`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};
