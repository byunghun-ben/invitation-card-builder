"use client";

import { LocalSearchKeywordDocumentType } from "@/schemas/kakaoMap";
import { HallLocation } from "@/schemas/pagesisters";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useTemplateFormContext } from "../../_hooks/TemplateFormContext";
import DateTimePickerInput from "../Input/DateTimePickerInput";
import TextInput from "../Input/TextInput";
import WeddingHallSearch from "./WeddingHallSearch";

const WeddingHallSection = () => {
  const { form } = useTemplateFormContext();
  const { setValue, control } = form;
  const { location } = useWatch({ control });

  const showSearch = !location;

  const handleSelectItem = useCallback(
    (item: LocalSearchKeywordDocumentType) => {
      setValue("location", {
        address: item.address_name,
        coord: [Number(item.x), Number(item.y)],
        mapType: "KAKAO",
        placeDetail: "",
        placeId: item.id,
        placeName: item.place_name,
        roadAddress: item.road_address_name,
      });
    },
    [setValue],
  );

  const resetLocation = () => {
    setValue("location", null);
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="font-bold text-slate-700">예식장 정보 입력</h2>
        <p className="text-sm text-slate-400">
          아직 정해지지 않았다면, 나중에 입력해도 됩니다.
        </p>
      </div>

      <div className="flex flex-col mb-6">
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
                  onClick={resetLocation}
                >
                  <TrashIcon className="w-6 h-6 text-slate-500" />
                </button>
              </div>
            </div>

            <Controller
              control={control}
              name="location.placeName"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <span className="flex font-bold text-slate-600">
                    예식장 이름
                  </span>
                  <TextInput {...field} />
                </div>
              )}
            />

            <Controller
              control={control}
              name="location.placeDetail"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <span className="flex font-bold text-slate-600">홀 이름</span>
                  <TextInput {...field} />
                </div>
              )}
            />
          </div>
        )}
        {showSearch && (
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-slate-700">예식장 주소</h3>
            <WeddingHallSearch onSelect={handleSelectItem} />
          </div>
        )}
      </div>

      <Controller
        control={form.control}
        name="eventAt"
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-slate-700">예식 일시</h3>
            <DateTimePickerInput value={value} onChange={onChange} />
          </div>
        )}
      />
    </section>
  );
};

export default WeddingHallSection;
