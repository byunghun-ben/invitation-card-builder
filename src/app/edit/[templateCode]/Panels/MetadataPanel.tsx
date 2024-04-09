"use client";

import { InstaMetadata } from "@/schemas/instaTemplate";
import Link from "next/link";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

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
          <label htmlFor="groomNameInput" className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700">신랑</span>
            <input
              id="groomNameInput"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full p-2 border rounded"
              value={metadata.groomName}
              onChange={handleChangeGroomName}
            />
          </label>

          <label htmlFor="신부이름" className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-700">신부</span>
            <input
              id="신부이름"
              type="text"
              placeholder="이름을 입력하세요"
              className="p-2 border rounded"
              value={metadata.brideName}
              onChange={handleChangeBrideName}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">사이트 정보</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1" htmlFor="meta-title">
            <span className="text-xs font-bold text-slate-700">
              청첩장 제목
            </span>
            <input
              id="meta-title"
              type="text"
              placeholder="제목을 입력하세요"
              className="py-2 px-3 border rounded"
              value={metadata.title}
              onChange={handleChangeTitle}
            />
          </label>

          <label className="flex flex-col gap-1" htmlFor="meta-description">
            <span className="text-xs font-bold text-slate-700">
              청첩장 소개
            </span>
            <textarea
              id="meta-description"
              placeholder="소개를 입력하세요"
              className="py-2 px-3 border rounded"
              value={metadata.description}
              onChange={handleChangeDescription}
            />
          </label>

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
