"use client";

import CommentIcon from "@/foundation/icons/CommentIcon";
import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { InstaPost } from "@/schemas/instagram";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import PostImageViewerV2 from "./PostImageViewerV2";
import PostLikeIcon from "./PostLikeIcon";

type Props = {
  post: InstaPost;
};

const PostItem = ({ post }: Props) => {
  const pathname = usePathname();
  const postDetailPath = `${pathname}/posts/${post.id}`;

  const [likeCount, setLikeCount] = useState(post.likes);
  // 콤마로 구분된 숫자
  const commentCount = (post.comments.length ?? 0).toLocaleString();

  const handleLike = useCallback(() => {
    setLikeCount(prev => prev + 1);
  }, []);

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
        <PostLikeIcon onLike={handleLike} />
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
