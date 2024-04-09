"use client";

import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { debounce } from "radash";
import { useCallback, useMemo, useState } from "react";

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

  const debouncedUpdateLikeCount = useMemo(
    () =>
      debounce({ delay: 1000 }, (likes: number) => {
        return fetch(`/api/posts/${postId}`, {
          method: "PATCH",
          body: JSON.stringify({ likes }),
        });
      }),
    [postId],
  );

  const handleLike = useCallback(async () => {
    const newLikes = likeCount + 1;
    setIsLiked(true);
    setLikeCount(newLikes);

    debouncedUpdateLikeCount(newLikes);
  }, [likeCount, debouncedUpdateLikeCount]);

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
            } w-6 h-6 transition group-active:scale-90 group-active:rotate-12`}
          />
        </button>
        <Link className="flex p-2 active:opacity-50" href={postDetailPath}>
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
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
