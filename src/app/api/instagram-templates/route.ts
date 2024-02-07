import connectDb from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");

    const page = page_str ? parseInt(page_str, 10) : 1;
    const limit = limit_str ? parseInt(limit_str, 10) : 10;

    let json_response = {
      status: "success",
      results: [],
      todos: [],
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    console.log(error);
    return createErrorResponse(error.message, 500);
  }
}
