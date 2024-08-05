import { NextRequest, NextResponse } from "next/server";
import { createComment_DEPRECATED } from "./action";
import { createCommentRequestSchema } from "./schema";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const createCommentRequestSafeParseReturn =
    createCommentRequestSchema.safeParse(body);

  if (!createCommentRequestSafeParseReturn.success) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  const createCommentDto = createCommentRequestSafeParseReturn.data;

  try {
    const data = await createComment_DEPRECATED(createCommentDto);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
