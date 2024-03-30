"use client";

import { InstaMetadata } from "@/schemas/instaTemplate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

// 도메인 주소: https://boran-maria.com
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

type Props = {
  templateCode: string;
  metadata: InstaMetadata;
  setMetadata: Dispatch<SetStateAction<InstaMetadata>>;
};

const MetadataPanel = ({ templateCode, metadata, setMetadata }: Props) => {
  const publicUrl = `${DOMAIN}/${templateCode}`;

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

  const handleChangeDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMetadata(prev => ({
        ...prev,
        description: e.target.value,
      }));
    },
    [setMetadata],
  );

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">프로필 정보</h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-700"
              htmlFor="신랑이름"
            >
              신랑
            </label>
            <input
              id="신랑이름"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full p-2 border rounded"
              value={metadata.groomName}
              onChange={handleChangeGroomName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-700"
              htmlFor="신부이름"
            >
              신부
            </label>
            <input
              id="신부이름"
              type="text"
              placeholder="이름을 입력하세요"
              className="p-2 border rounded"
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
              className="text-xs font-bold text-slate-700"
              htmlFor="meta-title"
            >
              청첩장 제목
            </label>
            <input
              id="meta-title"
              type="text"
              placeholder="제목을 입력하세요"
              className="py-2 px-3 border rounded"
              value={metadata.title}
              onChange={handleChangeTitle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-bold text-slate-700"
              htmlFor="meta-description"
            >
              청첩장 소개
            </label>
            <textarea
              id="meta-description"
              placeholder="소개를 입력하세요"
              className="py-2 px-3 border rounded"
              value={metadata.description}
              onChange={handleChangeDescription}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700">
              모바일 청첩장 주소
            </span>
            <Link href={publicUrl} className="underline" target="_blank">
              {publicUrl}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataPanel;
