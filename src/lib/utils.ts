import { NextResponse } from "next/server";

export function createErrorResponse(
  message: string,
  statusCode: number,
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
  };

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export function createSuccessResponse(
  data: any,
  statusCode: number,
): NextResponse {
  return new NextResponse(JSON.stringify(data), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}
