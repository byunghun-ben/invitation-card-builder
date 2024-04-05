"use server";

import {
  InstaMetadata,
  InstaPost,
  InstaTemplate,
  instaMetadataSchema,
  instaPostSchema,
  instaTemplateSchema,
} from "@/schemas/instaTemplate";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const getMetadataByTemplateCode = async (
  templateCode: string,
): Promise<InstaMetadata> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}/metadata`;

  const res = await fetch(url);
  const responseBody = await res.json();

  // 에러 핸들링
  // 1. 404 에러
  if (res.status === 404) {
    notFound();
  }

  // 2. 500 에러
  if (!res.ok) {
    throw new Error("Internal Server Error");
  }

  const instaMetadata = instaMetadataSchema.parse(responseBody);

  return instaMetadata;
};

// TODO: 중복 제거하기
export const getInstaTemplateByCode = async (
  templateCode: string,
): Promise<InstaTemplate> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  const res = await fetch(url);
  const responseBody = await res.json();

  // 에러 핸들링
  // 1. 404 에러
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Internal Server Error");
  }

  return instaTemplateSchema.parse(responseBody);
};

export const getInstaPost = async (
  postId: string,
): Promise<InstaPost | null> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/posts/${postId}`;

  const res = await fetch(url, {
    next: {
      tags: ["posts", "comments"],
    },
  });

  if (!res.ok) {
    return null;
  }

  const responseBody = await res.json();

  const zodParseRes = instaPostSchema.safeParse(responseBody);

  if (!zodParseRes.success) {
    return null;
  }

  return zodParseRes.data;
};
