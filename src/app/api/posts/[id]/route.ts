import { instaPostSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const patchPostDto = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  likes: z.number().optional(),
});

export const PATCH = async (request: NextRequest) => {
  const postId = request.nextUrl.pathname.split("/").pop();

  if (!postId || postId === ":id") {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const requestBody = await request.json();

  const parsed = patchPostDto.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Parse Error", error: parsed.error },
      { status: 400 },
    );
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .schema("insta_template")
    .from("posts")
    .update(parsed.data)
    .eq("id", postId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ message: "Updated" });
};

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
