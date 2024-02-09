import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "token_secret";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

const signupRequestSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const POST = async (props: NextRequest) => {
  // 1. 요청 바디를 받아온다.
  const requestBody = await props.json();
  console.log("requestBody", requestBody);
  // 2. 요청 바디를 zod 스키마로 검증한다. (id, password)
  const requestData = signupRequestSchema.safeParse(requestBody);
  // 3. 검증이 실패하면 500 에러를 리턴한다.
  if (!requestData.success) {
    return NextResponse.json({ message: "zod 에러" }, { status: 500 });
  }
  // 4. 검증이 성공하면, id를 가지고 서버에 요청을 보낸다.
  const id = requestData.data.id;
  // DB에 id가 있는지 확인하는 요청
  const response = new Promise<{ status: number }>(resolve => {
    setTimeout(() => {
      // 4-1. 중복된 id가 있으면 200 응답을 리턴한다.
      // resolve({ status: 200 });
      // 4-2. 중복된 id가 없으면 404 응답을 리턴한다.
      resolve({ status: 404 });
    }, 1000);
  });

  const body = await response;
  // 5. 중복된 id가 있으면 404 에러를 리턴한다.
  if (body.status === 200) {
    return NextResponse.json(
      { message: "이미 존재하는 아이디입니다." },
      { status: 404 },
    );
  }

  // 6. id, password로 DB에 계정을 생성한다.
  // DB에 계정 생성 요청
  const createAccountResponse = new Promise<{ status: number }>(resolve => {
    setTimeout(() => {
      resolve({ status: 201 });
    }, 1000);
  });

  const createAccountBody = await createAccountResponse;

  // 7. 생성이 성공하면 201 응답을 리턴한다.
  // 7-1. id 정보가 포함된 Token을 생성하여 쿠기에 담아서 응답한다.
  if (createAccountBody.status === 201) {
    const token = jwt.sign({ id }, TOKEN_SECRET);
    return NextResponse.json(
      { message: "계정 생성 성공" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TOKEN_MAX_AGE};`,
        },
      },
    );
  }

  // 8. 생성이 실패하면 500 에러를 리턴한다.
  return NextResponse.json({ message: "계정 생성 실패" }, { status: 500 });
};
