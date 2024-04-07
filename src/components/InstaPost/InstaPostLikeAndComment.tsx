"use client";

import { customRevalidateTag } from "@/app/actions";
import CommentIcon from "@/foundation/icons/CommentIcon";
import HeartIcon from "@/foundation/icons/HeartIcon";
import logger from "@/utils/logger";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type Props = {
  templateCode: string;
  postId: string;
  defaultLikeCount: number;
  commentCount: number;
};

const InstaPostLikeAndComment = ({
  templateCode,
  postId,
  defaultLikeCount,
  commentCount,
}: Props) => {
  const postDetailPath = `/${templateCode}/posts/${postId}`;

  const [likeCount, setLikeCount] = useState(defaultLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const controllerRef = useRef(new AbortController());

  const handleLike = useCallback(async () => {
    const controller = controllerRef.current;
    setIsLiked(true);
    setLikeCount(prev => prev + 1);

    try {
      await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ likes: likeCount + 1 }),
        signal: controller.signal,
      });

      customRevalidateTag(`posts:${postId}`);
    } catch (error) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
      logger.error("InstaPostLikeAndComment", error);
    }
  }, [likeCount, postId]);

  const formattedLikeCount = likeCount.toLocaleString();
  const formattedCommentCount = commentCount.toLocaleString();

  return (
    <div className="flex flex-col py-1">
      <div className="relative flex items-center">
        <button
          type="button"
          className="p-2 group"
          onClick={handleLike}
          aria-label="좋아요 버튼"
        >
          <HeartIcon
            className={`${
              isLiked ? "fill-red-400 stroke-red-400" : ""
            } transition group-active:scale-90 group-active:rotate-12`}
          />
        </button>
        <Link className="flex p-2 active:opacity-50" href={postDetailPath}>
          <CommentIcon />
        </Link>
      </div>
      <div className="flex gap-2 px-3">
        <span className="text-sm font-medium">{`좋아요 ${formattedLikeCount}개`}</span>
        <span className="text-sm font-medium">{`댓글 ${formattedCommentCount}개`}</span>
      </div>
    </div>
  );
};

export default InstaPostLikeAndComment;
