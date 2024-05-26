"use client";

import { LocalSearchKeywordDocumentType } from "@/schemas/kakaoMap";
import logger from "@/utils/logger";
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import DateInput from "../Input/DateInput";
import TextInput from "../Input/TextInput";
import WeddingHallSearch from "./WeddingHallSearch";
import { HallLocation } from "@/schemas/pagesisters";

const WeddingHallSection = () => {
  const [eventAt, setEventAt] = useState<string>("");
  const [location, setLocation] = useState<HallLocation | null>(null);

  const showSearch = !location;

  const handleSelectItem = useCallback(
    (item: LocalSearchKeywordDocumentType) => {
      setLocation({
        address: item.address_name,
        coord: [Number(item.x), Number(item.y)],
        mapType: "KAKAO",
        placeDetail: "",
        placeId: item.id,
        placeName: item.place_name,
        roadAddress: item.road_address_name,
      });
    },
    [],
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">예식장 정보 입력</h2>
        <p className="text-sm text-slate-400">
          아직 정해지지 않았다면, 나중에 입력해도 됩니다.
        </p>
      </div>

      <div className="flex flex-col">
        {location && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="flex font-bold text-slate-600">예식장 주소</span>
              <div className="relative flex items-center w-full bg-slate-100 border border-slate-200 rounded">
                <div className="flex-1 flex flex-col px-4">
                  <span>{location.roadAddress}</span>
                  <span className="text-sm text-slate-400">
                    {location.address}
                  </span>
                </div>
                <button
                  type="button"
                  className="flex-none flex-center w-16 h-16"
                  aria-label="삭제"
                >
                  <TrashIcon className="w-6 h-6 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex font-bold text-slate-600">예식장 이름</span>
              <TextInput
                value={location.placeName}
                onChange={value => {
                  setLocation({ ...location, placeName: value });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex font-bold text-slate-600">홀 이름</span>
              <TextInput
                value={location.placeDetail}
                onChange={value => {
                  setLocation({ ...location, placeDetail: value });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex font-bold text-slate-600">예식 일시</span>
              <DateInput
                value={eventAt}
                onChange={value => {
                  logger.log(value);
                  setEventAt(value);
                }}
                placeholder="예식일을 선택해주세요"
                rightIcon={
                  <div className="flex-center w-12 h-12">
                    <CalendarDaysIcon className="w-6 h-6 text-slate-500" />
                  </div>
                }
                className="cursor-default"
                readOnly
              />
            </div>
          </div>
        )}
        {showSearch && <WeddingHallSearch onSelect={handleSelectItem} />}
      </div>
    </section>
  );
};

export default WeddingHallSection;
