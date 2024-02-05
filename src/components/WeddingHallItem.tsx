"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import { InstaWeddingHall } from "@/schemas/instagram";
import Image from "next/image";
import Link from "next/link";
import PostImageViewerV2 from "./PostImageViewerV2";

type Props = {
  weddingHall: InstaWeddingHall;
};

const WeddingHallItem = ({ weddingHall }: Props) => {
  const content = weddingHall.content || "식장 소개가 없습니다.";

  const naverMapUrl = encodeURI(
    `https://map.naver.com/v5/search/${weddingHall.name}`,
  );
  const kakaoMapUrl = encodeURI(
    `https://map.kakao.com/link/search/${weddingHall.name}`,
  );

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

      <PostImageViewerV2 images={weddingHall.images} />

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
