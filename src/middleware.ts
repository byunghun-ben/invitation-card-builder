import { NextRequest, NextResponse } from "next/server";
import { decodeJwt, verifyJwt } from "./helper/middleware";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "token-secret";
const NEXT_SERVER_URL = process.env.NEXT_SERVER_URL || "http://localhost:3000";

const getJwtFromRequest = (request: NextRequest) => {
  const cookie = request.cookies.get("token");

  if (!cookie) {
    return null;
  }

  return cookie.value;
};

// 유저 권한을 체크하는 함수
const checkUserPermission = (request: NextRequest, id: string) => {
  console.log("checkUserPermission", request.nextUrl.pathname);
  const token = getJwtFromRequest(request);

  if (!token) {
    return false;
  }

  try {
    const isValid = verifyJwt(token, TOKEN_SECRET);

    if (!isValid) {
      return false;
    }

    const { payload } = decodeJwt(token);

    return payload.id === id;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const middleware = (request: NextRequest) => {
  console.log("Request URL:", request.nextUrl.pathname);

  const isCreateDetail = request.nextUrl.pathname.includes("/create/");

  if (isCreateDetail) {
    const id = request.nextUrl.pathname.split("/create/")[1];
    const hasPermission = checkUserPermission(request, id);

    return hasPermission
      ? NextResponse.next()
      : NextResponse.redirect(`${NEXT_SERVER_URL}/create`);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/create/:id+"],
};
