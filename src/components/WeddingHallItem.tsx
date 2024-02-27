"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaWeddingHall } from "@/schemas/instagram";
import Image from "next/image";
import Link from "next/link";
import PostImageViewerV2 from "./PostImageViewerV2";
import { useMemo } from "react";

type Props = {
  weddingHall: InstaWeddingHall;
};

const WeddingHallItem = ({ weddingHall }: Props) => {
  const name = weddingHall.name || "식장 이름";
  const content = weddingHall.content || "식장 소개가 없습니다.";

  const naverMapUrl = encodeURI(
    `https://map.naver.com/v5/search/${weddingHall.name}`,
  );
  const kakaoMapUrl = encodeURI(
    `https://map.kakao.com/link/search/${weddingHall.name}`,
  );

  const sortedImages = useMemo(() => {
    return weddingHall.images.sort((a, b) => a.display_order - b.display_order);
  }, [weddingHall.images]);

  return (
    <div className="flex-none flex flex-col">
      <div className="flex items-center gap-1 p-3">
        <Image
          src={DEFAULT_IMAGE}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="rounded-full border object-cover"
        />
        <span className="text-sm font-bold">오시는 길</span>
      </div>

      <PostImageViewerV2 images={sortedImages} />

      <div className="flex flex-col gap-2 p-3">
        <span className="font-bold">{name}</span>
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
        <p className="text-sm whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default WeddingHallItem;
