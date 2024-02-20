import { instaPostSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const postId = request.nextUrl.pathname.split("/").pop() || "";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .schema("insta_template")
    .from("posts")
    .select(
      `
      *,
      comments (
        id,
        name,
        content,
        post_id,
        created_at
      ),
      images (
        id,
        url
      )
    `,
    )
    .eq("id", postId)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const post = instaPostSchema.safeParse(data);

  if (!post.success) {
    return NextResponse.json({ error: post.error }, { status: 500 });
  }

  return NextResponse.json({ ...post.data });
};
