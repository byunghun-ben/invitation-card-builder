/* eslint-disable jsx-a11y/control-has-associated-label */

"use client";

import PostImageViewerV2 from "@/components/PostImageViewerV2";
import PostLikeButton from "@/components/PostLikeButton";
import CommentIcon from "@/foundation/icons/CommentIcon";
import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaPost } from "@/schemas/instaTemplate";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  post: InstaPost;
};

const PostItem = ({ post }: Props) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = useCallback(() => {
    setLikeCount(prev => prev + 1);
  }, []);

  const contentDivRef = useRef<HTMLDivElement>(null);

  return (
    <div key={post.id} className="flex flex-col">
      {/* Header */}
      <div className="py-3 px-2">
        <div className="flex gap-1 items-center">
          <Image
            alt="프로필 이미지"
            src={DEFAULT_IMAGE}
            className="rounded-full border object-cover"
            width={24}
            height={24}
          />
          <span className="text-xxs">{post.title || "제목"}</span>
        </div>
      </div>
      {/* Header */}

      <PostImageViewerV2 images={post.images} />

      {/* Like & ImageIndex */}
      <div className="relative flex items-center my-1">
        <PostLikeButton onLike={handleLike} />
        <button type="button" className="flex p-2 active:opacity-50">
          <CommentIcon />
        </button>
      </div>
      {/* Like & ImageIndex */}

      {/* Content */}
      <div className="flex flex-col gap-2 px-2 py-1">
        <div className="flex flex-col gap-1">
          <span className="text-xs">{`좋아요 ${likeCount}개`}</span>
          <div ref={contentDivRef}>
            <div className="text-xs whitespace-pre-line">
              {post.content || "본문을 입력하세요"}
            </div>
          </div>
        </div>
        <span className="text-xs">댓글 0개 모두 보기</span>
      </div>
      {/* Content */}
    </div>
  );
};

export default PostItem;
