import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const templateCode = pathname.split("/").pop() || "";

  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { error, data } = await supabase
    .schema("insta_template")
    .from("template")
    .select(
      `
        *,
        metadata (*),
        posts (
          *,
          images (*),
          comments (*)
        ),
        stories (
          *,
          images (*)
        ),
        wedding_hall (
          *,
          images (*)
        )
      `,
    )
    .eq("code", templateCode)
    .single();

  if (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(data);
};
