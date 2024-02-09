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
const checkUserPermission = async (request: NextRequest) => {
  console.log("checkUserPermission", request.nextUrl.pathname);
  const token = getJwtFromRequest(request);

  if (!token) {
    return false;
  }

  try {
    const isValid = await verifyJwt(token, TOKEN_SECRET);

    return isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getDecodedJwt = (request: NextRequest) => {
  const token = getJwtFromRequest(request);

  if (!token) {
    return null;
  }

  return decodeJwt(token);
};

export const middleware = async (request: NextRequest) => {
  console.log("Request URL:", request.nextUrl.pathname);

  const isCreatePage = request.nextUrl.pathname.includes("/create");

  if (isCreatePage) {
    const hasPermission = await checkUserPermission(request);

    if (!hasPermission) {
      return NextResponse.redirect(`${NEXT_SERVER_URL}/login`);
    }

    const decodedJwt = getDecodedJwt(request);

    if (!decodedJwt) {
      return NextResponse.redirect(`${NEXT_SERVER_URL}/login`);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/create/:id+"],
};
