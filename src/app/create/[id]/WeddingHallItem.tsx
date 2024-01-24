"use client";

import Image from "next/image";
import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { MouseEventHandler, useRef, useState } from "react";

const ImageNextButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full dark:bg-slate-700 z-10"
      onClick={onClick}
    >
      <span className="text-2xl font-bold">❯</span>
    </button>
  );
};

const ImagePrevButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full dark:bg-slate-700 z-10"
      onClick={onClick}
    >
      <span className="text-2xl font-bold">❮</span>
    </button>
  );
};

type Props = {
  weddingHall: {
    name: string;
    address: string;
    images: {
      id: string;
      url: string;
    }[];
    content: string;
  };
};

const WeddingHallItem = ({ weddingHall }: Props) => {
  const content = weddingHall.content || "식장 소개가 없습니다.";

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex-none flex flex-col">
      <div className="py-3 px-2">
        <div className="flex items-center gap-1">
          <Image
            src={DEFAULT_IMAGE}
            alt="프로필 이미지"
            width={24}
            height={24}
            className="rounded-full border object-cover"
          />
          <span className="text-xxs">오시는 길</span>
        </div>
      </div>

      <div className="relative bg-slate-50">
        <div className="w-full" style={{ paddingBottom: "100%" }} />
        <div className="absolute inset-0" ref={imageContainerRef}>
          <ImagePrevButton
            onClick={() => {
              if (activeImageIndex === 0) {
                return;
              }

              setActiveImageIndex(prev => prev - 1);
            }}
          />
          <ImageNextButton
            onClick={() => {
              if (activeImageIndex >= 2) {
                return;
              }

              setActiveImageIndex(prev => prev + 1);
            }}
          />
          <div className="w-full h-full bg-blue-300 overflow-hidden">
            <ul
              className="flex w-full h-full"
              style={{
                transform: `translateX(-${activeImageIndex * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <li className="flex-none w-full h-full bg-green-300">1</li>
              <li className="flex-none w-full h-full bg-red-300">2</li>
              <li className="flex-none w-full h-full bg-amber-300">3</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <span className="font-bold">{weddingHall.name || "식장 이름"}</span>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 flex items-center justify-center p-2 border border-green-400 rounded"
          >
            <span className="text-xs">네이버 지도로 확인하기</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center p-2 border border-yellow-400 rounded"
          >
            <span className="text-xs">카카오 지도로 확인하기</span>
          </button>
        </div>
        <div>
          <p className="text-xs whitespace-pre">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingHallItem;
