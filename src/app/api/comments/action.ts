import { createClient } from "@/utils/supabase/server";
import { CreateCommentRequest } from "./schema";

export const createComment = async (createCommentDto: CreateCommentRequest) => {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .schema("insta_template")
    .from("comments")
    .insert(createCommentDto);

  if (error) {
    console.error(error);
    throw new Error("댓글 작성 중 오류가 발생했습니다.");
  }

  return data;
};
