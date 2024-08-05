"use server";

import logger from "@/utils/logger";
import { createClient } from "@/utils/supabase/server";
import { CreateCommentRequest } from "./schema";

export const createComment_DEPRECATED = async (
  createCommentDto: CreateCommentRequest,
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("insta_template")
    .from("comments")
    .insert(createCommentDto);

  if (error) {
    logger.error(error);
    throw new Error("댓글 작성 중 오류가 발생했습니다.");
  }

  return data;
};
