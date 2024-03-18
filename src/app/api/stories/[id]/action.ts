import { createClient } from "@/utils/supabase/server";
import { getStoryResponseSchema } from "./schema";

export const getStory = async (storyId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("insta_template")
    .from("stories")
    .select(
      `*,
      images (*)`,
    )
    .eq("id", storyId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("스토리를 찾는 중 오류가 발생했습니다.");
  }

  if (!data) {
    console.error("Not found");
    throw new Error("스토리를 찾을 수 없습니다.");
  }

  const storyResponse = getStoryResponseSchema.parse(data);

  return storyResponse;
};
