"use client";

import { ChangeEvent, useCallback, useRef } from "react";

type Props = {
  index: number;
  post: {
    id: string;
    title: string;
    content: string;
    images: {
      id: string;
      url: string;
    }[];
  };
  onRemove: (postId: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  onChangeContent: (id: string, content: string) => void;
  onChangeImages: (
    id: string,
    images: {
      id: string;
      url: string;
    }[],
  ) => void;
};

const PostForm = ({
  post,
  index,
  onRemove,
  onChangeTitle,
  onChangeContent,
  onChangeImages,
}: Props) => {
  const FORM_TITLE = `${index + 1}번째 게시물`;

  const isImageEmpty = post.images.length === 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = useCallback(() => {
    onRemove(post.id);
  }, [post.id]);

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const file = files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result;

        if (!dataURL || typeof dataURL !== "string") {
          return;
        }

        const id = Math.random().toString(36).slice(2);

        const newImages = [
          ...post.images,
          {
            id,
            url: dataURL,
          },
        ];

        onChangeImages(post.id, newImages);
      };

      reader.readAsDataURL(file);

      e.target.value = "";
    },
    [post.images],
  );

  const removeImage = useCallback(
    (id: string) => () => {
      const newImages = post.images.filter(image => image.id !== id);
      onChangeImages(post.id, newImages);
    },
    [],
  );

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeTitle(post.id, e.target.value);
    },
    [post.id],
  );

  const handleChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeContent(post.id, e.target.value);
    },
    [post.id],
  );

  return (
    <>
      {/* Story */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3>{FORM_TITLE}</h3>
          <button
            type="button"
            className="text-xxs text-red-500"
            onClick={handleRemove}
          >
            게시물 삭제
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="py-2 px-3 border border-slate-400 rounded dark:bg-slate-900 dark:text-white"
            placeholder="게시물 제목을 입력하세요."
            value={post.title}
            onChange={handleChangeTitle}
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
              {post.images.map(image => (
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
            className="border border-slate-700 rounded py-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-sm font-bold">사진 또는 영상 추가</span>
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={onChangeFile}
          />

          <textarea
            className="min-h-20 resize-none py-2 px-3 border border-slate-400 rounded dark:bg-slate-900 dark:text-white"
            placeholder="본문을 입력하세요."
            value={post.content}
            onChange={handleChangeContent}
            onKeyUp={e => {
              // TODO: Auto resize
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
        </div>
      </div>
      {/* Story */}
    </>
  );
};

export default PostForm;
