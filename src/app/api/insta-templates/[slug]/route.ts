import { NextRequest, NextResponse } from "next/server";
import {
  getInstaTemplate,
  updateMetadata,
  updatePosts,
  updateStories,
  updateWeddingHall,
} from "../action";
import { updateRequestSchema } from "../schema";

export const GET = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const templateCode = pathname.split("/").pop() || "";

  try {
    const data = await getInstaTemplate(templateCode);

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const templateCode = pathname.split("/").pop() || "";

  if (!templateCode || templateCode === ":slug") {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const template = await getInstaTemplate(templateCode);

  // TODO: template.userId === request.userId

  const body = await request.json();

  const validationResult = updateRequestSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { message: JSON.stringify(validationResult.error) },
      { status: 400 },
    );
  }

  const updateData = validationResult.data;

  if (updateData.stories) {
    await updateStories(template.id, updateData.stories);
  }

  if (updateData.posts) {
    await updatePosts(template.id, updateData.posts);
  }

  if (updateData.metadata) {
    await updateMetadata(template.id, updateData.metadata);
  }

  if (updateData.weddingHall) {
    await updateWeddingHall(template.id, updateData.weddingHall);
  }

  return NextResponse.json({ message: "OK" });
};
