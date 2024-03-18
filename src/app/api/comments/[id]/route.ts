import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "./action";
import { deleteCommentRequestSchema } from "./schema";

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

  const deleteCommentRequestParseReturn = deleteCommentRequestSchema.safeParse({
    id: commentId,
    password,
  });

  if (!deleteCommentRequestParseReturn.success) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  try {
    const count = await deleteComment(deleteCommentRequestParseReturn.data);

    if (count === 0) {
      // 비밀번호가 틀렸을 때
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "삭제되었습니다." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
