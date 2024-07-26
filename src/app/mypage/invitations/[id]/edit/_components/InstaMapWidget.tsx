"use client";

import { useEffect, useRef } from "react";
import { InstaMapWidget as InstaMapWidgetType } from "../types";
import EditInstaMapWidgetModal from "./EditInstaMapWidgetModal";
import logger from "@/utils/logger";

type Props = {
  widget: InstaMapWidgetType;
  invitationId: number;
};

const InstaMapWidget = ({ widget, invitationId }: Props) => {
  // MAP
  const {
    coordX,
    coordY,
    placeName,
    placeDetail,
    roadAddress,
    address,
    title,
  } = widget.instaMapWidget;
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

    if (!mapElement) {
      logger.error("mapElement is not valid");
      return;
    }

    const createMap = () => {
      const lat = coordY;
      const lng = coordX;
      mapElement.style.display = "block";

      if (!lat || !lng) {
        logger.error("lat or lng is not valid");
        mapElement.style.display = "none";
        return;
      }

      const mapOptions: kakao.maps.MapOptions = {
        center: new kakao.maps.LatLng(lat + 0.0005, lng),
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
          >${placeName}</span>
          <span
            class="flex text-sm whitespace-pre-line"
          >${roadAddress}</span>
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

    return () => {
      mapElement.style.display = "none";
    };
  }, [coordX, coordY, placeName, roadAddress]);
  // MAP

  return (
    <div className="flex-none flex flex-col border border-slate-200 rounded-lg bg-white">
      <div className="flex items-center p-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <span className="font-bold">지도</span>
        </div>
        <EditInstaMapWidgetModal widget={widget} invitationId={invitationId} />
      </div>

      <div className="flex flex-col border-b border-slate-200">
        <div className="flex flex-col gap-1 p-4">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-slate-700">
            {`${placeName} (${placeDetail})`}
          </span>
          <span className="text-slate-700">{roadAddress}</span>
        </div>
        <div ref={mapWrapperRef} className="w-full aspect-square" />
      </div>
    </div>
  );
};

export default InstaMapWidget;
