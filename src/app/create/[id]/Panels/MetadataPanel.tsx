"use client";

import { InstaMetadata } from "@/schemas/instagram";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

type Props = {
  metadata: InstaMetadata;
  setMetadata: Dispatch<SetStateAction<InstaMetadata>>;
};

const MetadataPanel = ({ metadata, setMetadata }: Props) => {
  const pathname = usePathname();
  const id = pathname.replace("/create/", "");

  const cardUrl = `https://boran-maria.com/${id}`;

  const handleChangeGroomName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMetadata(prev => ({
        ...prev,
        groomName: e.target.value,
      }));
    },
    [setMetadata],
  );

  const handleChangeBrideName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMetadata(prev => ({
        ...prev,
        brideName: e.target.value,
      }));
    },
    [setMetadata],
  );

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMetadata(prev => ({
        ...prev,
        title: e.target.value,
      }));
    },
    [setMetadata],
  );

  return (
    <div className="flex flex-col gap-10 max-w-96">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">프로필 정보</h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-500 dark:text-white"
              htmlFor="신랑이름"
            >
              신랑
            </label>
            <input
              id="신랑이름"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full p-2 border rounded dark:bg-slate-900"
              value={metadata.groomName}
              onChange={handleChangeGroomName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-500 dark:text-white"
              htmlFor="신부이름"
            >
              신부
            </label>
            <input
              id="신부이름"
              type="text"
              placeholder="이름을 입력하세요"
              className="p-2 border rounded dark:bg-slate-900"
              value={metadata.brideName}
              onChange={handleChangeBrideName}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">사이트 정보</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-500 dark:text-white"
              htmlFor="청첩장제목"
            >
              청첩장 제목
            </label>
            <input
              id="청첩장제목"
              type="text"
              placeholder="제목을 입력하세요"
              className="py-2 px-3 border rounded dark:bg-slate-900"
              value={metadata.title}
              onChange={handleChangeTitle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 dark:text-white">
              모바일 청첩장 주소
            </span>
            <Link href={cardUrl} className="underline" target="_blank">
              {cardUrl}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataPanel;
