import { NextRequest, NextResponse } from "next/server";
import { getStory } from "./action";
import { transformInstaStory } from "./helpers";

export const GET = async (request: NextRequest) => {
  // path: /api/stories/:id
  const storyId = request.nextUrl.pathname.split("/").pop() || "";

  if (!storyId || storyId === ":id") {
    return NextResponse.json({ message: "Missing storyId" }, { status: 400 });
  }

  try {
    const storyResponse = await getStory(storyId);

    const story = transformInstaStory(storyResponse);

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
