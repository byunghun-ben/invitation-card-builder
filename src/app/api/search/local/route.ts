import { NextRequest, NextResponse } from "next/server";
import { getLocalSearchResponseSchema } from "../schema";

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

const BASE_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "검색어를 입력해주세요" },
      { status: 400 },
    );
  }

  const url = `${BASE_URL}?query=${query}&size=5`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${KAKAO_API_KEY}`,
    },
  });

  const data = await response.json();

  const parsedData = getLocalSearchResponseSchema.parse(data);

  return NextResponse.json({ message: "검색 성공", ...parsedData });
};

export { GET };
