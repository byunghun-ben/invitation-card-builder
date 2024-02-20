"use client";

import PostLikeButton from "@/components/PostLikeButton";
import { useState } from "react";

type Props = {
  likes: number;
};

const PostLikeSection = ({ likes }: Props) => {
  const [likeCount, setLikeCount] = useState(likes);

  return (
    <>
      <PostLikeButton
        onLike={() => {
          setLikeCount(prev => prev + 1);
        }}
      />
      <p className="text-sm font-bold mb-2 px-2">{`좋아요 ${likeCount}개`}</p>
    </>
  );
};

export default PostLikeSection;
