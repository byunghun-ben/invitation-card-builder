"use client";

import { InstaPost } from "@/schemas/instagram";
import Image from "next/image";
import { debounce } from "radash";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  post: InstaPost;
};

const PostImageViewer = ({ post }: Props) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!imageContainerRef.current) {
      return;
    }

    const imageContainer = imageContainerRef.current;

    const handleResize = debounce({ delay: 100 }, () => {
      setContainerWidth(imageContainer.clientWidth);
    });

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [targetIndex, setTargetIndex] = useState(0);

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

  return (
    <div className="relative">
      <div className="w-full" style={{ paddingBottom: "100%" }} />
      <div className="absolute inset-0" ref={imageContainerRef}>
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
            {post.images.map(image => (
              <li key={image.id} className="relative flex-none h-full w-full">
                <Image
                  src={image.url}
                  alt="게시물 이미지"
                  className="object-cover h-full w-full"
                  fill
                  sizes="573px"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostImageViewer;
