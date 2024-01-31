"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { InstaPost } from "@/schemas/instagram";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  post: InstaPost;
};

const PostItem = ({ post }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerWidth = containerRef.current?.clientWidth || 0;

  const [targetIndex, setTargetIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const handlePrev = useCallback(() => {
    const isLastIndex = targetIndex === 0;

    if (isLastIndex) {
      return;
    }

    setTargetIndex(prev => prev - 1);
  }, [targetIndex]);

  const handleNext = useCallback(() => {
    const isLastIndex = targetIndex === post.images.length - 1;

    if (isLastIndex) {
      return;
    }

    setTargetIndex(prev => prev + 1);
  }, [post.images.length, targetIndex]);

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

      {/* Images */}
      <div className="relative">
        <div className="w-full" style={{ paddingBottom: "100%" }} />
        <div className="absolute inset-0" ref={containerRef}>
          <div className="w-full h-full relative overflow-hidden">
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 rounded-full z-10 bg-white bg-opacity-0 hover:bg-opacity-80"
              onClick={handlePrev}
            >
              <svg
                className="w-8 h-8 text-slate-500 hover:text-slate-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.707 4.293a1 1 0 010 1.414L8.414 10l4.293 4.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                />
              </svg>
            </button>

            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 rounded-full z-10 bg-white bg-opacity-0 hover:bg-opacity-80"
              onClick={handleNext}
            >
              <svg
                className="w-8 h-8 text-slate-500 hover:text-slate-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            <ul
              className="flex bg-yellow-50 h-full w-full"
              style={{
                transform: `translateX(-${containerWidth * targetIndex}px)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {post.images.map((image, index) => (
                <li key={image.id} className="relative flex-none h-full w-full">
                  <Image
                    src={image.url}
                    alt="게시물 이미지"
                    className="object-cover h-full w-full"
                    fill
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Images */}

      {/* Like & ImageIndex */}
      <div className="relative p-2">
        <button type="button" onClick={handleLike}>
          ❤️
        </button>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
          {post.images.map((_, index) => (
            <button
              key={index}
              className="flex"
              onClick={() => setTargetIndex(index)}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  index === targetIndex
                    ? "bg-gray-900 dark:bg-slate-50"
                    : "bg-gray-500 dark:bg-gray-700"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      {/* Like & ImageIndex */}

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs">{`좋아요 ${likeCount}개`}</span>
          <div ref={contentDivRef}>
            <div className="text-xs whitespace-pre">
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
