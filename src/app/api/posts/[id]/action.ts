import { createClient } from "@/utils/supabase/server";
import { UpdatePostRequest, getPostResponseSchema } from "./schema";

export const updatePost = async (
  postId: string,
  updatePostDto: UpdatePostRequest,
) => {
  "use server";

  const supabase = createClient();

  const { error } = await supabase
    .schema("insta_template")
    .from("posts")
    .update(updatePostDto)
    .eq("id", postId);

  if (error) {
    console.error(error);
    throw new Error("업데이트 중 오류가 발생했습니다.");
    // return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
};

export const getPost = async (postId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("insta_template")
    .from("posts")
    .select(
      `
      *,
      comments (
        id,
        name,
        content,
        post_id,
        created_at
      ),
      images (
        id,
        url
      )
    `,
    )
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("포스트를 찾는 중 오류가 발생했습니다.");
  }

  const getPostResponse = getPostResponseSchema.parse(data);

  return getPostResponse;
};
