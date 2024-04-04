"use client";

import { InstaImage, InstaStory } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import { max } from "radash";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Loading } from "@/components/Loading";
import toast from "react-hot-toast";
import { compressImage, uploadImageFile } from "../../helpers";

type Props = {
  index: number;
  story: InstaStory;
  onRemove: (id: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  onChangeImages: (id: string, images: InstaImage[]) => void;
};

const StoryForm = ({
  index,
  story,
  onRemove,
  onChangeTitle,
  onChangeImages,
}: Props) => {
  const FORM_TITLE = `${index + 1}번째 스토리`;

  const isImageEmpty = story.images.length === 0;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleRemove = useCallback(() => {
    onRemove(story.id);
  }, [onRemove, story.id]);

  const removeImage = useCallback(
    (id: string) => () => {
      const newImages = story.images.filter(image => image.id !== id);

      onChangeImages(story.id, newImages);
    },
    [story.images, story.id, onChangeImages],
  );

  const handleChangeFileInput = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const target = event.target;
      const file = target.files?.[0];
      target.value = "";

      if (!file) {
        return;
      }

      const compressedFile = await compressImage(file);

      const newImage = await uploadImageFile(compressedFile);
      const newImageDisplayOrder =
        max(story.images.map(i => i.displayOrder)) ?? 0 + 1;

      const newImages: InstaImage[] = [
        ...story.images,
        {
          ...newImage,
          displayOrder: newImageDisplayOrder,
        },
      ];

      onChangeImages(story.id, newImages);
      toast.success("이미지가 추가되었습니다.");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <>
      {/* Story */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700">{FORM_TITLE}</h3>
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={handleRemove}
          >
            <span className="text-xs text-red-500">삭제</span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="py-2 px-3 border border-slate-400 rounded"
            placeholder="스토리 제목을 입력하세요."
            value={story.title}
            onChange={e => onChangeTitle(story.id, e.target.value)}
          />

          {isImageEmpty && (
            <>
              {/* Empty */}
              <div className="h-24 flex items-center justify-center border border-slate-400 rounded">
                <span className="text-sm text-slate-500 select-none">
                  사진을 추가해보세요.
                </span>
              </div>
              {/* Empty */}
            </>
          )}

          {!isImageEmpty && (
            <div className="flex gap-2 flex-wrap p-2 border border-slate-400 rounded">
              {/* Image */}
              {story.images.map(image => (
                <div key={image.id} className="flex flex-col gap-1 pb-1">
                  <div
                    className="h-16 w-16 bg-cover bg-center border rounded"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={removeImage(image.id)}
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
            className="border border-slate-400 rounded py-1 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => fileInputRef.current?.click()}
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
            className="hidden"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/webp"
            onChange={event => {
              setIsImageUploading(true);
              handleChangeFileInput(event);
            }}
          />
        </div>
      </div>
      {/* Story */}
    </>
  );
};

export default StoryForm;
