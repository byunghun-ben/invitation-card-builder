import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  try {
    if (!code) {
      throw new Error("No code found");
    }

    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
};
