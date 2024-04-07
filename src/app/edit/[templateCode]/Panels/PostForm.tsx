"use client";

import { InstaImage, InstaPost } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import { max } from "radash";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Loading } from "@/components/Loading";
import toast from "react-hot-toast";
import { compressImage, uploadImageFile } from "../../helpers";

type Props = {
  index: number;
  post: InstaPost;
  onRemove: (postId: string) => void;
  onChangeTitle: (id: string, title: string) => void;
  onChangeContent: (id: string, content: string) => void;
  onChangeImages: (id: string, images: InstaImage[]) => void;
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
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleRemove = useCallback(() => {
    onRemove(post.id);
  }, [onRemove, post.id]);

  const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      e.target.value = "";

      if (!file) {
        return;
      }

      const compressedFile = await compressImage(file);
      const newImageDisplayOrder =
        max(post.images.map(i => i.displayOrder)) ?? 0 + 1;
      const newImage = await uploadImageFile(compressedFile);

      const newImages: InstaImage[] = [
        ...post.images,
        {
          ...newImage,
          displayOrder: newImageDisplayOrder,
        },
      ];

      onChangeImages(post.id, newImages);
      toast.success("이미지가 추가되었습니다.");
    } catch (error) {
      logger.error("error", error);
    } finally {
      setIsImageUploading(false);
    }
  };

  const removeImage = useCallback(
    (id: string) => () => {
      const newImages = post.images.filter(image => image.id !== id);
      onChangeImages(post.id, newImages);
    },
    [post.images, post.id, onChangeImages],
  );

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeTitle(post.id, e.target.value);
    },
    [post.id, onChangeTitle],
  );

  const handleChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeContent(post.id, e.target.value);
    },
    [post.id, onChangeContent],
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
            삭제
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="py-2 px-3 border border-slate-400 rounded"
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
            className="border border-slate-400 rounded py-2 enabled:hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <textarea
            className="min-h-20 py-2 px-3 border border-slate-400 rounded"
            placeholder="본문을 입력하세요."
            value={post.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      {/* Story */}
    </>
  );
};

export default PostForm;
