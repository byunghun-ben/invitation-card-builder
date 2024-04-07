"use client";

import PostLikeButton from "@/components/PostLikeButton";
import { useCallback, useState } from "react";

type Props = {
  postId: string;
  likes: number;
};

const PostLikeSection = ({ postId, likes }: Props) => {
  const [likeCount, setLikeCount] = useState(likes);

  // TODO: 빠르게 여러번 클릭했을 때, 여러번 요청이 가는 문제를 debounce로 해결하기
  const handleLike = useCallback(async () => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);

    try {
      await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: newLikeCount,
        }),
      });
    } catch (error) {
      setLikeCount(likeCount);
    }
  }, [likeCount, postId]);

  return (
    <div className="flex flex-col items-start">
      <PostLikeButton onLike={handleLike} />
      <p className="text-sm font-bold px-2">{`좋아요 ${likeCount}개`}</p>
    </div>
  );
};

export default PostLikeSection;
