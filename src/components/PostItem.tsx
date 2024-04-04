import CommentIcon from "@/foundation/icons/CommentIcon";
import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaPost, instaPostSchema } from "@/schemas/instaTemplate";
import Image from "next/image";
import Link from "next/link";
// import { useCallback } from "react";
import logger from "@/utils/logger";
import { headers } from "next/headers";
import PostImageViewerV2 from "./PostImageViewerV2";
import PostLikeButtonV2 from "./PostLikeButtonV2";

type Props = {
  post: InstaPost;
};

const PostItem = async ({ post: { id: postId } }: Props) => {
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
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

  const post = zodParseRes.data;

  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  const pathname = `${protocol}://${host}`;
  const postDetailPath = `${pathname}/posts/${post.id}`;
  const likeCount = post.likes;

  // 콤마로 구분된 숫자
  const commentCount = (post.comments.length ?? 0).toLocaleString();

  return (
    <article key={post.id} className="flex flex-col">
      {/* Header */}
      <div className="flex gap-2 items-center p-3">
        <Image
          alt="프로필 이미지"
          src={DEFAULT_IMAGE}
          className="rounded-full border object-cover"
          width={32}
          height={32}
        />
        <span className="text-sm font-bold">{post.title || "제목"}</span>
      </div>
      {/* Header */}

      <PostImageViewerV2 images={post.images} />

      <div className="relative flex items-center py-1">
        <PostLikeButtonV2 postId={postId} likeCount={likeCount} />
        <Link className="flex p-2 active:opacity-50" href={postDetailPath}>
          <CommentIcon />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 py-1 px-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold">{`좋아요 ${likeCount}개`}</span>
          <div className="text-sm whitespace-pre-line">
            {post.content || "본문을 입력하세요"}
          </div>
        </div>
        <Link href={postDetailPath} className="flex self-start">
          <span className="text-sm text-slate-700">{`댓글 ${commentCount}개 모두 보기`}</span>
        </Link>
      </div>
      {/* Content */}
    </article>
  );
};

export default PostItem;
