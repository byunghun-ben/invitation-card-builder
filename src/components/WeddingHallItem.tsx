"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaWeddingHall } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PostImageViewerV2 from "./PostImageViewerV2";

type Props = {
  weddingHall: InstaWeddingHall;
};

const WeddingHallItem = ({ weddingHall }: Props) => {
  const name = weddingHall.name;
  const content = weddingHall.content;

  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const isKakaoScriptLoadedRef = useRef(false);

  useEffect(() => {
    const naverMapUrl = encodeURI(`https://map.naver.com/v5/search/${name}`);
    const kakaoMapUrl = encodeURI(`https://map.kakao.com/link/search/${name}`);

    const mapElement = mapWrapperRef.current;
    const isKakaoScriptLoaded = isKakaoScriptLoadedRef.current;

    if (!window.kakao) {
      logger.error("kakao is not valid");
      return;
    }

    const createMap = () => {
      const lat = Number(weddingHall.lat);
      const lng = Number(weddingHall.lng);

      if (!mapElement) {
        logger.error("mapElement is not valid");
        return;
      }

      if (!lat || !lng) {
        logger.error("lat or lng is not valid");
        mapElement.style.display = "none";
        return;
      }

      const mapOptions: kakao.maps.MapOptions = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
        disableDoubleClick: true,
        disableDoubleClickZoom: true,
        draggable: false,
        scrollwheel: false,
      };
      const map = new window.kakao.maps.Map(mapElement, mapOptions);

      // 마커 생성하기
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      // 커스텀 오버레이 생성하기
      const customOverlayContent = `
        <div
          class="absolute -top-12 left-0 flex flex-col gap-1 w-60 bg-white shadow-md py-2 px-3 -translate-x-1/2 -translate-y-full rounded"
        >
          <span
            class="flex font-bold whitespace-pre-line"
          >${name}</span>
          <span
            class="flex text-sm whitespace-pre-line"
          >${weddingHall.roadAddress}</span>
          <a href="${kakaoMapUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-2 border border-yellow-400 rounded">
            <span class="text-xs">카카오 지도</span>
          </a>
          <a href="${naverMapUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-2 border border-green-400 rounded">
            <span class="text-xs">네이버 지도</span>
          </a>
        </div>
      `;

      // 커스텀 오버레이가 표시될 위치입니다
      const customOverlayPosition = new kakao.maps.LatLng(lat, lng);

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new kakao.maps.CustomOverlay({
        position: customOverlayPosition,
        content: customOverlayContent,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
    };

    window.kakao.maps.load(() => {
      isKakaoScriptLoadedRef.current = true;
      createMap();
    });

    if (isKakaoScriptLoaded) {
      createMap();
    }
  }, [weddingHall.lat, weddingHall.lng, name, weddingHall.roadAddress]);

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
        <span className="text-sm font-bold">{`${name} 오시는 길`}</span>
      </div>

      <PostImageViewerV2 images={weddingHall.images} />
      <div ref={mapWrapperRef} className="w-full aspect-square mt-4" />

      <div className="flex flex-col gap-2 p-3">
        {content && <p className="text-sm whitespace-pre-line">{content}</p>}
      </div>
    </div>
  );
};

export default WeddingHallItem;
