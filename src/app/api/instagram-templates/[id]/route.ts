import { getInstagramTemplate } from "@/api/serverAPI";
import connectDb from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const id = request.nextUrl.searchParams.get("id");
    const instagramTemplate = await getInstagramTemplate(id!);

    console.log(request.nextUrl.searchParams);

    return NextResponse.json({
      status: "success",
      instagramTemplate,
    });
  } catch (error: any) {
    console.log(error);
    return createErrorResponse(error.message, 500);
  }
}
