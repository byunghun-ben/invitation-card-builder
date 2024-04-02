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

export const getMetadataByTemplateCode = async (
  templateCode: string,
): Promise<InstaMetadata> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}/metadata`;

  const res = await fetch(url);
  const responseBody = await res.json();

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

  return instaTemplateSchema.parse(responseBody);
};

export const getInstaPost = async (postId: string): Promise<InstaPost> => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/posts/${postId}`;

  const res = await fetch(url, {
    next: {
      tags: ["posts", "comments"],
    },
  });
  const responseBody = await res.json();
  return instaPostSchema.parse(responseBody);
};
