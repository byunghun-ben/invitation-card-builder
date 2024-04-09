"use client";

import { Loading } from "@/components/Loading";
import { InstaImage, InstaWeddingHall } from "@/schemas/instaTemplate";
import Image from "next/image";
import { max } from "radash";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { compressImage, uploadImageFile } from "../../helpers";
import LocalSearchModal from "./LocalSearchModal";

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

  const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      e.target.value = "";

      if (!file) {
        return;
      }

      const compressedFile = await compressImage(file);
      const newImage = await uploadImageFile(compressedFile);
      const newImageDisplayOrder =
        max(weddingHall.images.map(i => i.displayOrder)) ?? 0 + 1;

      const newImages: InstaImage[] = [
        ...weddingHall.images,
        {
          ...newImage,
          displayOrder: newImageDisplayOrder,
        },
      ];

      setWeddingHall(prev => ({
        ...prev,
        images: newImages,
      }));
      toast.success("이미지가 추가되었습니다.");
    } catch (error) {
      toast.error("이미지를 추가하는 중에 오류가 발생했습니다.");
    } finally {
      setIsImageUploading(false);
    }
  };

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
      setWeddingHall(prev => ({
        ...prev,
        name: result.name,
        address: result.address,
      }));
    },
    [setWeddingHall],
  );

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
            <span className="text-sm">식장 위치 검색</span>
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
                    className="w-16 h-16 object-cover object-center border rounded"
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
            className="p-2 border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleImageClick}
            disabled={isImageUploading}
          >
            {isImageUploading ? (
              <Loading />
            ) : (
              <span className="text-sm">이미지 추가</span>
            )}
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
              handleChangeFileInput(e);
            }}
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
