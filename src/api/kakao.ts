import KakaoMapSchema from "@/schemas/kakaoMap";
import { z } from "zod";

const searchLocalByKeywordSchema = z.object({
  message: z.string(),
  documents: KakaoMapSchema.LocalSearchKeywordDocument.array(),
  meta: KakaoMapSchema.LocalSearchKeywordMeta,
});

const searchLocalByKeyword = async (query: string) => {
  const response = await fetch(`/search/local?query=${query}`);

  if (!response.ok) {
    throw new Error("검색에 실패했습니다.");
  }

  const data = await response.json();
  const parsedData = searchLocalByKeywordSchema.parse(data);

  return parsedData;
};

const KakaoMapAPI = {
  searchLocalByKeyword,
};

export default KakaoMapAPI;
