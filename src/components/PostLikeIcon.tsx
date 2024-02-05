"use client";

import HeartIcon from "@/foundation/icons/HeartIcon";
import { useCallback, useState } from "react";

type Props = {
  onLike: () => void;
};

const PostLikeIcon = ({ onLike }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    setIsLiked(true);
    onLike();
  }, [onLike]);

  return (
    <button type="button" className="p-2 group" onClick={handleLike}>
      <HeartIcon
        className={`${
          isLiked ? "fill-red-400 stroke-red-400" : ""
        } transition group-active:scale-90 group-active:rotate-12`}
      />
    </button>
  );
};

export default PostLikeIcon;
