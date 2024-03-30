import KakaoMapSchema from "@/schemas/kakaoMap";
import { z } from "zod";

export const getLocalSearchResponseSchema = z.object({
  documents: KakaoMapSchema.localSearchKeywordDocument.array(),
  meta: KakaoMapSchema.localSearchKeywordMeta,
});
