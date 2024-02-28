import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createCommentDto = z.object({
  post_id: z.string(),
  name: z.string(),
  content: z.string(),
  password: z.string(),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = createCommentDto.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const comment = parsedBody.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .schema("insta_template")
    .from("comments")
    .insert(comment);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
};
