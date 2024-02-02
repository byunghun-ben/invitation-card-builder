"use client";

import CommentIcon from "@/foundation/icons/CommentIcon";
import HeartIcon from "@/foundation/icons/HeartIcon";
import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { InstaPost } from "@/schemas/instagram";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import PostImageViewerV2 from "./PostImageViewerV2";

type Props = {
  post: InstaPost;
};

const PostItem = ({ post }: Props) => {
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = useCallback(() => {
    setLikeCount(prev => prev + 1);
  }, []);

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

      <PostImageViewerV2 post={post} />

      {/* Like & ImageIndex */}
      <div className="relative flex items-center my-1">
        <button
          type="button"
          onClick={handleLike}
          className="flex p-2 active:opacity-50"
        >
          <HeartIcon />
        </button>
        <Link
          className="flex p-2 active:opacity-50"
          href={`p/${post.id}/comments`}
        >
          <CommentIcon />
        </Link>
      </div>
      {/* Like & ImageIndex */}

      {/* Content */}
      <div className="flex flex-col gap-2 my-1 px-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold">{`좋아요 ${likeCount}개`}</span>
          <div className="text-xs whitespace-pre">
            {post.content || "본문을 입력하세요"}
          </div>
        </div>
        <span className="text-xs font-bold">댓글 0개 모두 보기</span>
      </div>
      {/* Content */}
    </div>
  );
};

export default PostItem;
