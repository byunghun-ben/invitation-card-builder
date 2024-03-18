import { createClient } from "@/utils/supabase/server";
import { DeleteCommentRequest } from "./schema";

export const deleteComment = async ({ id, password }: DeleteCommentRequest) => {
  "use server";

  const supabase = createClient();

  const { error, count } = await supabase
    .schema("insta_template")
    .from("comments")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("password", password);

  if (error) {
    console.error(error);
    throw new Error("댓글 삭제 중 오류가 발생했습니다.");
  }

  return count;
};
