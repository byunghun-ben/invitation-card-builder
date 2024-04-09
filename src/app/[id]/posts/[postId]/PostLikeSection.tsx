"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { debounce } from "radash";
import { useMemo, useState } from "react";

type Props = {
  postId: string;
  defaultLikes: number;
};

const PostLikeSection = ({ postId, defaultLikes }: Props) => {
  const [likes, setLikes] = useState(defaultLikes);
  const [isLiked, setIsLiked] = useState(false);
  const formattedLikes = likes.toLocaleString();

  const debouncedUpdateLikes = useMemo(
    () =>
      debounce({ delay: 1000 }, async (newLikes: number) => {
        await fetch(`/api/posts/${postId}`, {
          method: "PATCH",
          body: JSON.stringify({ likes: newLikes }),
        });
      }),
    [postId],
  );

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        className="p-2 group"
        onClick={() => {
          const newLikes = likes + 1;
          setLikes(newLikes);
          setIsLiked(true);

          debouncedUpdateLikes(newLikes);
        }}
        aria-label="좋아요 버튼"
      >
        <HeartIcon
          className={`${
            isLiked ? "fill-red-400 stroke-red-400" : ""
          } w-6 h-6 transition group-active:scale-90 group-active:rotate-12`}
        />
      </button>
      <p className="text-sm font-bold px-2">{`좋아요 ${formattedLikes}개`}</p>
    </div>
  );
};

export default PostLikeSection;
