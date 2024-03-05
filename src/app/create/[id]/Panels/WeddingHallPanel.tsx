"use client";

import { InstaWeddingHall } from "@/schemas/instagram";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useProcessMultipleImages } from "../useFile";
import LocalSearchModal from "./LocalSearchModal";
import { insertImages, uploadFiles } from "./helpers";

type Props = {
  weddingHall: InstaWeddingHall;
  setWeddingHall: Dispatch<SetStateAction<InstaWeddingHall>>;
};

const WeddingHallPanel = ({ weddingHall, setWeddingHall }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setWeddingHall(prev => ({
        ...prev,
        content: e.target.value,
      }));
    },
    [setWeddingHall],
  );

  const handleImageClick = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleAfterProcessImages = useCallback(
    async (blobs: Blob[]) => {
      // convert blob to file
      const files = blobs.map((blob, index) => {
        const fileName = `${Date.now()}-${index}`;
        return new File([blob], fileName, { type: blob.type });
      });

      // upload to supabase storage
      const uploadRes = await uploadFiles(files);

      if (!uploadRes) {
        alert("이미지 업로드에 실패했습니다");
        setIsImageUploading(false);
        return;
      }

      // insert to images table
      const newImages = await insertImages(uploadRes);

      if (!newImages) {
        alert("이미지 업로드에 실패했습니다");
        setIsImageUploading(false);
        return;
      }

      setWeddingHall(prev => {
        // update display_order
        const images = [...prev.images, ...newImages].map((image, index) => ({
          ...image,
          display_order: index,
        }));

        return {
          ...prev,
          images,
        };
      });
      setIsImageUploading(false);
    },
    [setWeddingHall],
  );

  const { handleChangeFileInputMultiple } = useProcessMultipleImages({
    onProcessImages: handleAfterProcessImages,
  });

  const handleRemoveImage = useCallback(
    (id: string) => () => {
      setWeddingHall(prev => {
        const newImages = prev.images.filter(image => image.id !== id);

        return {
          ...prev,
          images: newImages,
        };
      });
    },
    [setWeddingHall],
  );

  const [isOpenLocalSearchModal, setIsOpenLocalSearchModal] = useState(false);

  const handleSelectLocalSearch = useCallback(
    (result: { name: string; address: string }) => {
      console.log("result", result);
      setWeddingHall(prev => ({
        ...prev,
        name: result.name,
        address: result.address,
      }));
    },
    [setWeddingHall],
  );

  const sortedImages = useMemo(() => {
    return weddingHall.images.sort((a, b) => a.display_order - b.display_order);
  }, [weddingHall.images]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">결혼식장</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {weddingHall.name && weddingHall.address && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-700">
                  식장이름
                </span>
                <span className="">{weddingHall.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-700">주소</span>
                <span className="">{weddingHall.address}</span>
              </div>
            </div>
          )}
          <button
            type="button"
            className="p-2 border rounded hover:bg-slate-50"
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
              {sortedImages.map(image => (
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
            className="p-2 border rounded hover:bg-slate-50 disabled:opacity-50"
            onClick={handleImageClick}
            disabled={isImageUploading}
          >
            <span className="text-sm font-bold">
              {isImageUploading ? "이미지 업로딩 중" : "사진 추가"}
            </span>
          </button>
          <input
            type="file"
            name="wedding-hall-image"
            id="wedding-hall-image-input"
            className="hidden"
            accept="image/*"
            ref={imageRef}
            onChange={e => {
              setIsImageUploading(true);
              handleChangeFileInputMultiple(e);
            }}
            multiple
          />
        </div>

        <textarea
          className="h-auto min-h-20 py-2 px-3 border rounded"
          placeholder="본문을 입력하세요"
          value={weddingHall.content}
          onChange={handleChangeContent}
        />
      </div>
    </div>
  );
};

export default WeddingHallPanel;
