import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  return NextResponse.json({ status: 501, body: "Not implemented" });
};

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ status: 501, body: "Not implemented" });
};

export const DELETE = async (request: NextRequest) => {
  // path: /api/comments/:id?password=:password
  const commentId = request.nextUrl.pathname.split("/").pop();
  const password = request.nextUrl.searchParams.get("password") || "";

  if (!commentId || commentId === ":id") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, count } = await supabase
    .schema("insta_template")
    .from("comments")
    .delete({ count: "exact" })
    .eq("id", commentId)
    .eq("password", password);

  if (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }

  if (count === 0) {
    // 비밀번호가 틀렸을 때
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
};
