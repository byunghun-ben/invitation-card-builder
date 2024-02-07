import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "token_secret";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

const loginRequestSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const POST = async (props: NextRequest) => {
  // 1. 요청 바디를 받아온다.
  const requestBody = await props.json();

  // 2. 요청 바디를 zod 스키마로 검증한다. (id, password)
  const requestData = loginRequestSchema.safeParse(requestBody);

  // 2-1. 검증이 실패하면 500 에러를 리턴한다.
  if (!requestData.success) {
    return NextResponse.json({ message: "zod 에러" }, { status: 500 });
  }
  // 3. 검증이 성공하면, id/password로 DB에 계정이 있는지 확인한다.
  const id = requestData.data.id;
  const password = requestData.data.password;

  // DB에 계정이 있는지 확인하는 요청
  const response = new Promise<{ status: number }>(resolve => {
    setTimeout(() => {
      // 계정이 없으면 404 응답을 리턴한다.
      // resolve({ status: 404 });
      // 계정이 있으면 200 응답을 리턴한다.
      resolve({ status: 200 });
    }, 1000);
  });

  const body = await response;

  // 3-1. 계정이 없으면 404 에러를 리턴한다.
  if (body.status === 404) {
    return NextResponse.json(
      { message: "계정이 존재하지 않아요." },
      { status: 404 },
    );
  }
  // 4. 계정이 있으면, id 정보가 포함된 Token을 생성하여 쿠키에 담아서 응답한다.
  if (body.status === 200) {
    const token = jwt.sign({ id }, TOKEN_SECRET);
    return NextResponse.json(
      { message: "로그인 성공" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${TOKEN_MAX_AGE}; SameSite=Strict`,
        },
      },
    );
  }

  return NextResponse.json({ message: "서버 에러" }, { status: 500 });
};
