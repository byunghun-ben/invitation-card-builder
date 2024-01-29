import { instagramTemplateSchema } from "@/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BASE_URL = process.env.API_URL;

const loginDto = z.object({
  id: z.string(),
  password: z.string(),
});

export const POST = async (props: NextRequest) => {
  const requestBody = await props.json();

  const requestData = loginDto.safeParse(requestBody);

  if (!requestData.success) {
    return NextResponse.json({ message: "zod 에러" }, { status: 500 });
  }

  try {
    const instagramTemplateId = requestData.data.id;
    const instagramTemplatePassword = requestData.data.password;

    const response = await fetch(
      `${BASE_URL}/instagram-templates/${instagramTemplateId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("response.status", response.status);

    const body = await response.json();

    const parsedBody = instagramTemplateSchema.safeParse(body);

    if (!parsedBody.success) {
      console.log("parsedBody", parsedBody.error);
      return NextResponse.json({ message: "zod 에러" }, { status: 500 });
    }

    const isPasswordCorrect =
      parsedBody.data.password === instagramTemplatePassword;

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "비밀번호가 틀렸어요." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "로그인 성공",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 에러가 발생했어요. (ID로 청첩장을 찾을 수 없는 경우)" },
      { status: 500 },
    );
  }
};
