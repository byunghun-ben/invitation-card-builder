"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { InstaWeddingHall } from "@/schemas/instagram";
import Image from "next/image";
import Link from "next/link";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const ImageNextButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center w-8 h-8 rounded-full z-10 bg-white bg-opacity-0 hover:bg-opacity-80"
      onClick={onClick}
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
      className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center w-8 h-8 rounded-full z-10 bg-white bg-opacity-0 hover:bg-opacity-80"
      onClick={onClick}
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
  );
};

type Props = {
  weddingHall: InstaWeddingHall;
};

const WeddingHallItem = ({ weddingHall }: Props) => {
  const content = weddingHall.content || "식장 소개가 없습니다.";
  const weddingHallImages = weddingHall.images || [];
  const weddingHallImageCount = weddingHallImages.length;

  const naverMapUrl = encodeURI(
    `https://map.naver.com/v5/search/${weddingHall.name}`,
  );
  const kakaoMapUrl = encodeURI(
    `https://map.kakao.com/link/search/${weddingHall.name}`,
  );

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [weddingHallImageCount]);

  const handlePrev = useCallback(() => {
    const isLastIndex = activeImageIndex === 0;

    if (isLastIndex) {
      return;
    }

    setActiveImageIndex(prev => prev - 1);
  }, [activeImageIndex]);

  const handleNext = useCallback(() => {
    const isLastIndex = activeImageIndex === weddingHallImageCount - 1;

    if (isLastIndex) {
      return;
    }

    setActiveImageIndex(prev => prev + 1);
  }, [activeImageIndex, weddingHallImageCount]);

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
          <ImagePrevButton onClick={handlePrev} />
          <ImageNextButton onClick={handleNext} />
          <div className="w-full h-full bg-blue-300 overflow-hidden">
            <ul
              className="flex w-full h-full"
              style={{
                transform: `translateX(-${activeImageIndex * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {weddingHall.images.map(image => (
                <li key={image.id} className="relative flex-none w-full h-full">
                  <Image
                    src={image.url}
                    alt="식장 설명 이미지"
                    className="object-cover"
                    fill
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <span className="font-bold">{weddingHall.name || "식장 이름"}</span>
        <div className="flex gap-2">
          <Link
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center p-2 border border-green-400 rounded"
          >
            <span className="text-xs">네이버 지도로 확인하기</span>
          </Link>
          <Link
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center p-2 border border-yellow-400 rounded"
          >
            <span className="text-xs">카카오 지도로 확인하기</span>
          </Link>
        </div>
        <div>
          <p className="text-xs whitespace-pre-line">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingHallItem;
