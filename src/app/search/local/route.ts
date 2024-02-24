import KakaoMapSchema from "@/schemas/kakaoMap";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

const BASE_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

const responseDataSchema = z.object({
  documents: KakaoMapSchema.LocalSearchKeywordDocument.array(),
  meta: KakaoMapSchema.LocalSearchKeywordMeta,
});

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "검색어를 입력해주세요" },
      { status: 400 },
    );
  }

  console.log(query);

  const url = `${BASE_URL}?query=${query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${KAKAO_API_KEY}`,
    },
  });

  const data = await response.json();

  const parsedData = responseDataSchema.parse(data);

  return NextResponse.json({ message: "검색 성공", ...parsedData });
};

export { GET };
