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
        id,
        code,
        metadata (
          title,
          description,
          groomName,
          brideName
        ),
        posts (
          id,
          title,
          content,
          likes,
          images (*),
          comments (
            id,
            name,
            content,
            created_at
          )
        ),
        stories (
          id,
          title,
          images (*)
        ),
        wedding_hall (
          template_id,
          name,
          address,
          content,
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
