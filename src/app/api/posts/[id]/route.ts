import { NextRequest, NextResponse } from "next/server";
import { getPost, updatePost } from "./action";
import { updatePostRequestSchema } from "./schema";
import { transformInstaPost } from "./helpers";

export const PATCH = async (request: NextRequest) => {
  const postId = request.nextUrl.pathname.split("/").pop();

  if (!postId || postId === ":id") {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const requestBody = await request.json();

  const updatePostRequestParseReturn =
    updatePostRequestSchema.safeParse(requestBody);

  if (!updatePostRequestParseReturn.success) {
    return NextResponse.json(
      {
        message: "유요하지 않은 요청입니다.",
        error: updatePostRequestParseReturn.error,
      },
      { status: 400 },
    );
  }

  try {
    await updatePost(postId, updatePostRequestParseReturn.data);

    return NextResponse.json({ message: "Updated" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const postId = request.nextUrl.pathname.split("/").pop() || "";

  try {
    const getPostResponse = await getPost(postId);

    const instaPost = transformInstaPost(getPostResponse);

    return NextResponse.json(instaPost);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
