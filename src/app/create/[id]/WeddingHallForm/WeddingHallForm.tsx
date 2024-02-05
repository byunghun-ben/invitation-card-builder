"use client";

import { InstaImage, InstaWeddingHall } from "@/schemas/instagram";
import Image from "next/image";
import { uid } from "radash";
import { useCallback, useRef, useState } from "react";
import LocalSearchModal from "./LocalSearchModal";
import { useProcessMultipleImages } from "../useFile";

type Props = {
  weddingHall: InstaWeddingHall;
  onChangeName: (name: string) => void;
  onChangeAddress: (address: string) => void;
  onChangeContent: (content: string) => void;
  onChangeImages: (images: InstaImage[]) => void;
};

const WeddingHallForm = ({
  weddingHall,
  onChangeName,
  onChangeAddress,
  onChangeImages,
  onChangeContent,
}: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeContent(e.target.value);
    },
    [onChangeContent],
  );

  const handleImageClick = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleProcessImages = useCallback((blobs: Blob[]) => {
    const newImages = blobs.map(blob => {
      const id = uid(10, "image-id");
      const url = URL.createObjectURL(blob);

      return {
        id,
        url,
      };
    });

    onChangeImages(newImages);
  }, []);

  const { handleChangeFileInputMultiple } = useProcessMultipleImages({
    onProcessImages: handleProcessImages,
  });

  const handleRemoveImage = useCallback(
    (id: string) => () => {
      const newImages = weddingHall.images.filter(image => image.id !== id);
      onChangeImages(newImages);
    },
    [weddingHall.images, onChangeImages],
  );

  const [isOpenLocalSearchModal, setIsOpenLocalSearchModal] = useState(false);

  const handleSelectLocalSearch = useCallback(
    (result: { name: string; address: string }) => {
      console.log("result", result);
      onChangeName(result.name);
      onChangeAddress(result.address);
    },
    [onChangeName, onChangeAddress],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">결혼식장</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {weddingHall.name && weddingHall.address && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-xs">식장이름</span>
                <span className="">{weddingHall.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">주소</span>
                <span className="">{weddingHall.address}</span>
              </div>
            </div>
          )}
          <button
            type="button"
            className="p-2 border rounded hover:bg-slate-50 dark:hover:bg-slate-700"
            onClick={() => setIsOpenLocalSearchModal(true)}
          >
            <span className="text-sm font-bold">식장 위치 검색</span>
          </button>
          <LocalSearchModal
            isOpen={isOpenLocalSearchModal}
            onClose={() => setIsOpenLocalSearchModal(false)}
            onSelect={handleSelectLocalSearch}
          />
        </div>

        <div className="flex flex-col gap-2">
          {weddingHall.images.length === 0 && (
            <div className="flex border rounded min-h-24">
              <span className="flex-1 self-center text-center">
                사진을 추가해보세요 (ex, 약도)
              </span>
            </div>
          )}
          {weddingHall.images.length > 0 && (
            <div className="flex gap-2 flex-wrap p-2 border border-slate-400 rounded">
              {/* Image */}
              {weddingHall.images.map(image => (
                <div key={image.id} className="flex flex-col gap-1 pb-1">
                  <Image
                    src={image.url}
                    alt="게시물 이미지"
                    className="object-cover h-16 w-16"
                    width={64}
                    height={64}
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={handleRemoveImage(image.id)}
                  >
                    <span className="text-xs text-red-500">삭제</span>
                  </button>
                </div>
              ))}
              {/* Image */}
            </div>
          )}

          <button
            type="button"
            className="p-2 border rounded hover:bg-slate-50 dark:hover:bg-slate-700"
            onClick={handleImageClick}
          >
            <span className="text-sm font-bold">사진 추가</span>
          </button>
          <input
            type="file"
            name="wedding-hall-image"
            id="wedding-hall-image-input"
            className="hidden"
            accept="image/*"
            ref={imageRef}
            onChange={handleChangeFileInputMultiple}
            multiple
          />
        </div>

        <textarea
          className="h-auto min-h-14 py-2 px-3 border rounded dark:bg-slate-900 dark:text-white"
          placeholder="본문을 입력하세요"
          onKeyUp={e => {
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onChange={handleChangeContent}
        />
      </div>
    </div>
  );
};

export default WeddingHallForm;
