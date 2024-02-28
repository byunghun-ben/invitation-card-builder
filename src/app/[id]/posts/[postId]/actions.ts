"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const createComment = async (postId: string, formData: FormData) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/comments`;

  // TODO: zod로 validation하기
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const password = formData.get("password") as string;

  const comment = {
    post_id: postId,
    name,
    content,
    password,
  };

  // reset form
  formData.set("name", "");
  formData.set("content", "");
  formData.set("password", "");

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  revalidateTag("comments");
};

export const deleteComment = async (commentId: string, password: string) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const encodedPassword = encodeURIComponent(password);
  const url = `${protocol}://${host}/api/comments/${commentId}?password=${encodedPassword}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Comment deleted");
  }
  revalidateTag("comments");
};
