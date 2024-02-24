import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { decodeJwt, verifyJwt } from "./helper/middleware";

// const TOKEN_SECRET = process.env.TOKEN_SECRET || "token-secret";
// const NEXT_SERVER_URL = process.env.NEXT_SERVER_URL || "http://localhost:3000";

// const getJwtFromRequest = (request: NextRequest) => {
//   const cookie = request.cookies.get("token");

//   if (!cookie) {
//     return null;
//   }

//   return cookie.value;
// };

// // 유저 권한을 체크하는 함수
// const checkUserPermission = async (request: NextRequest) => {
//   console.log("checkUserPermission", request.nextUrl.pathname);
//   const token = getJwtFromRequest(request);

//   if (!token) {
//     return false;
//   }

//   try {
//     const isValid = await verifyJwt(token, TOKEN_SECRET);

//     return isValid;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const getDecodedJwt = (request: NextRequest) => {
//   const token = getJwtFromRequest(request);

//   if (!token) {
//     return null;
//   }

//   return decodeJwt(token);
// };

// export const middleware = async (request: NextRequest) => {
//   console.log("Request URL:", request.nextUrl.pathname);

//   const isCreatePage = request.nextUrl.pathname.includes("/create");

//   if (isCreatePage) {
//     const hasPermission = await checkUserPermission(request);

//     if (!hasPermission) {
//       return NextResponse.redirect(`${NEXT_SERVER_URL}/login`);
//     }

//     const decodedJwt = getDecodedJwt(request);

//     if (!decodedJwt) {
//       return NextResponse.redirect(`${NEXT_SERVER_URL}/login`);
//     }

//     return NextResponse.next();
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/create/:id+"],
// };
