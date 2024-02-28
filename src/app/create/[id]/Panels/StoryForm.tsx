"use client";

import { InstaImage, InstaStory } from "@/schemas/instagram";
import { uid } from "radash";
import { useCallback, useRef } from "react";
import { useProcessImage } from "../useFile";

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

  const handleChangeImage = useCallback(
    (blob: Blob) => {
      const id = uid(10, "image-id");
      const url = URL.createObjectURL(blob);
      const newImages = [
        ...story.images,
        {
          id,
          url,
        },
      ];

      onChangeImages(story.id, newImages);
    },
    [story.images, story.id, onChangeImages],
  );

  const { handleChangeFileInput } = useProcessImage({
    onProcessImages: handleChangeImage,
  });

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
                  사진이나 영상을 추가해보세요.
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
            className="border border-slate-400 rounded py-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-sm">사진 또는 영상 추가</span>
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/webp"
            onChange={handleChangeFileInput}
          />
        </div>
      </div>
      {/* Story */}
    </>
  );
};

export default StoryForm;
