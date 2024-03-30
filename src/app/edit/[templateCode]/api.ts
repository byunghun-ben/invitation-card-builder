"use server";

import { InstaTemplate, instaTemplateSchema } from "@/schemas/instaTemplate";
import KakaoMapSchema from "@/schemas/kakaoMap";
import { headers } from "next/headers";

export const getInstaTemplateByCode = async (
  templateCode: string,
): Promise<InstaTemplate> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch template");
  }

  const responseBody = await res.json();

  return instaTemplateSchema.parse(responseBody);
};

export const searchLocalByKeyword = async (query: string) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/search/local?query=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("검색에 실패했습니다.");
  }

  const data = await response.json();
  const parsedData = KakaoMapSchema.searchLocalByKeywordSchema.parse(data);

  return parsedData;
};
