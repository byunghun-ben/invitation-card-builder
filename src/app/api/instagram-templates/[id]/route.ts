import { instaTemplateSchema } from "@/schemas/instagram";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "token-secret";

const tokenSchema = z.object({
  id: z.string(),
  iat: z.number(),
});

const extractTemplateId = (url: string) => {
  const regex = /\/api\/instagram-templates\/([^\/]+)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GET = async (request: NextRequest) => {
  // 0. path parameter에서 템플릿 id를 가져온다.
  const templateId = extractTemplateId(request.nextUrl.pathname);

  // 0-1. 템플릿 id가 없다면, 400 에러를 반환한다.
  if (!templateId) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  // 1. DB에서 템플릿 정보를 가져온다.
  const templateResponse = await new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  });

  // 1-1. 템플릿 정보가 없다면, 404 에러를 반환한다.
  if (!templateResponse) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  // 1-2. 템플릿 정보가 있다면, 반환한다.
  return NextResponse.json({
    message: "GET /api/instagram-templates/:id",
    instaTemplate: templateResponse,
  });
};

const extractUpdateTemplateDto = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const templateSchema = instaTemplateSchema.partial();

    const templateData = templateSchema.safeParse(body);

    if (!templateData.success) {
      console.log(templateData.error);
      return null;
    }

    return templateData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const PATCH = async (request: NextRequest) => {
  // 0. path parameter에서 템플릿 id를 가져온다.
  const templateId = extractTemplateId(request.nextUrl.pathname);

  // 0-1. 템플릿 id가 없다면, 400 에러를 반환한다.
  if (!templateId) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  // 1. 쿠키에 저장된 토큰을 확인한다.
  const tokenCookie = request.cookies.get("token");

  // 1-1. 토큰이 없다면, 401 에러를 반환한다.
  if (!tokenCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = verifyToken(tokenCookie.value);

  // 1-2. 토큰이 유효하지 않다면, 401 에러를 반환한다.
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 1-3. 토큰이 있다면, 다음 단계로.
  // 2. 토큰을 디코딩하여 사용자 정보를 확인한다.
  const tokenData = tokenSchema.safeParse(token);

  // 2-1. 토큰이 유효하지 않다면, 401 에러를 반환한다. (토큰이 만료되었거나, 유효하지 않은 토큰)
  if (!tokenData.success) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2-2. 토큰이 유효하다면, 사용자 정보를 반환한다.
  const { id, iat } = tokenData.data;

  // 2-3. 사용자 정보와 템플릿 id를 비교하여, 사용자가 템플릿을 수정할 권한이 있는지 확인한다.
  if (id !== templateId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 3. 사용자가 수정한 템플릿을 DB에 반영한다.
  // 3-1. body에서 수정된 템플릿 정보를 가져온다.
  // 3-2. 템플릿 정보를 파싱한다.
  // 3-3. 템플릿 정보가 유효하지 않다면, 400 에러를 반환한다.
  // 3-4. 템플릿 정보가 유효하다면, DB에 반영한다.
  const templateData = await extractUpdateTemplateDto(request);

  if (!templateData) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  const templateResponse = await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: "PATCH /api/instagram-templates",
        data: templateData,
      });
    }, 1000);
  });

  return NextResponse.json({
    message: "PATCH /api/instagram-templates/:id",
  });
};
