"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
// import HeartIcon from "@/foundation/icons/HeartIcon";
import { useCallback, useState } from "react";

type Props = {
  onLike: () => void;
};

const PostLikeButton = ({ onLike }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    setIsLiked(true);
    onLike();
  }, [onLike]);

  return (
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
  );
};

export default PostLikeButton;
