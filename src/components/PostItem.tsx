import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaPost, instaPostSchema } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import { headers } from "next/headers";
import Image from "next/image";
import InstaPostLikeAndComment from "./InstaPost/InstaPostLikeAndComment";
import PostImageViewerV2 from "./PostImageViewerV2";

const getPost = async (postId: string): Promise<InstaPost | null> => {
  "use server";

  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/posts/${postId}`;

  const res = await fetch(url, {
    next: {
      tags: [`posts:${postId}`],
    },
  });

  const data = await res.json();
  const zodParseRes = instaPostSchema.safeParse(data);

  if (!zodParseRes.success) {
    logger.error("PostItem", zodParseRes.error);
    return null;
  }

  return zodParseRes.data;
};

type Props = {
  templateCode: string;
  postId: string;
};

const PostItem = async ({ templateCode, postId }: Props) => {
  const post = await getPost(postId);

  if (!post) {
    return null;
  }

  const postTitle = post.title;
  const postContent = post.content;
  const likeCount = post.likes;
  const commentCount = post.comments.length;

  return (
    <article key={post.id} className="flex flex-col">
      <div className="flex gap-2 items-center p-2">
        <Image
          alt="프로필 이미지"
          src={DEFAULT_IMAGE}
          className="rounded-full border object-cover"
          width={24}
          height={24}
        />
        <span className="text-sm">{postTitle}</span>
      </div>

      <PostImageViewerV2 images={post.images} />

      <InstaPostLikeAndComment
        templateCode={templateCode}
        postId={post.id}
        defaultLikeCount={likeCount}
        commentCount={commentCount}
      />

      {postContent && (
        <div className="flex flex-col gap-1 py-1 px-3">
          <p className="text-sm whitespace-pre-line">{postContent}</p>
        </div>
      )}
    </article>
  );
};

export default PostItem;
