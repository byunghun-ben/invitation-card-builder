import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { GetStorySchema } from "./schema";

export const GET = async (request: NextRequest) => {
  // path: /api/stories/:id
  const storyId = request.nextUrl.pathname.split("/").pop() || "";

  if (!storyId || storyId === ":id") {
    return NextResponse.json({ message: "Missing storyId" }, { status: 400 });
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: story, error } = await supabase
    .schema("insta_template")
    .from("stories")
    .select(
      `*
      , images (*)`,
    )
    .eq("id", storyId)
    .single();

  if (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }

  if (!story) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const response = GetStorySchema.safeParse(story);

  if (!response.success) {
    // Parsing 실패
    return NextResponse.json({ message: "Parsing error" }, { status: 500 });
  }

  return NextResponse.json(response.data, { status: 200 });
};
