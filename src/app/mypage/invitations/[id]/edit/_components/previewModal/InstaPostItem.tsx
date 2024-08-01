"use client";

import { InstaPostWidgetType } from "@/types/invitation";
import { ChatBubbleOvalLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  widget: InstaPostWidgetType;
};

const InstaPostItem = ({ widget }: Props) => {
  const { images, content } = widget;

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col py-10">
      <div className="relative">
        <div className="w-full" style={{ paddingBottom: "100%" }} />
        <div className="absolute inset-0">
          <div className="w-full h-full relative overflow-hidden">
            <ul
              className="flex bg-yellow-50 h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar scrolling-touch"
              role="presentation"
            >
              {images.length === 0 && (
                <li className="w-full h-full flex-center">
                  <div>이미지가 없습니다.</div>
                </li>
              )}

              {images.map((image, index) => (
                <li
                  key={image.id}
                  className="relative flex-none h-full w-full snap-start"
                >
                  <Image
                    src={image.url}
                    alt="이미지"
                    className="object-cover h-full w-full"
                    width={510}
                    height={510}
                    draggable={false}
                    priority={index === 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-1">
        <div className="relative flex items-center">
          <button
            type="button"
            className="p-2 group"
            // onClick={handleLike}
            aria-label="좋아요 버튼"
          >
            <HeartIcon
              className={`${
                isLiked ? "fill-red-400 stroke-red-400" : ""
              } w-6 h-6 transition group-active:scale-90 group-active:rotate-12`}
            />
          </button>
          <Link className="flex p-2 active:opacity-50" href={"/"}>
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex gap-2 px-3">
          <span className="text-sm font-medium">{`좋아요 000개`}</span>
          <span className="text-sm font-medium">{`댓글 000개`}</span>
        </div>
      </div>

      {!!content && (
        <div className="flex flex-col gap-1 py-1 px-3">
          <p className="text-sm whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
};

export default InstaPostItem;
