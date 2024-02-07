import { getInstagramTemplate } from "@/api/serverAPI";
import connectDb from "@/lib/mongodb";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";

import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    await connectDb();

    const instagramTemplate = await getInstagramTemplate(id!);

    return createSuccessResponse(instagramTemplate, 200);
  } catch (error: any) {
    console.log(error);
    return createErrorResponse(error.message, 500);
  }
}
