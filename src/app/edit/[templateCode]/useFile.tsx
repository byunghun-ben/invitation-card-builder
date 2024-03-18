"use client";

import { ChangeEvent, useCallback } from "react";

const IMAGE_QUALITY = 0.8;

const readFileAsDataURL = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;

      if (!dataUrl || typeof dataUrl !== "string") {
        reject(new Error("Invalid data URL"));
        return;
      }

      resolve(dataUrl);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

const loadImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = url;
  });
};

const convertImageToCanvas = (image: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  if (!canvasContext) {
    throw new Error("Cannot get canvas context");
  }

  canvas.width = image.width;
  canvas.height = image.height;
  canvasContext.drawImage(image, 0, 0, image.width, image.height);

  return canvas;
};

const convertCanvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number = 1,
) => {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error("Cannot convert canvas to blob"));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
};

const getFirstFileFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || !e.target.files[0]) {
    return null;
  }

  return e.target.files[0];
};

type Props = {
  onProcessImages: (blob: Blob) => void;
};

export const useProcessImage = ({ onProcessImages }: Props) => {
  const handleChangeFileInput = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = getFirstFileFromEvent(e);

      if (!file) {
        e.target.value = "";
        return;
      }

      const fileUrl = await readFileAsDataURL(file);
      const image = await loadImage(fileUrl);
      const canvas = convertImageToCanvas(image);
      const blob = await convertCanvasToBlob(
        canvas,
        "image/webp",
        IMAGE_QUALITY,
      );

      onProcessImages(blob);
      e.target.value = "";
    },
    [onProcessImages],
  );

  return {
    handleChangeFileInput,
  };
};

type UseProcessMultipleImages = {
  onProcessImages: (blobs: Blob[]) => void;
};

export const useProcessMultipleImages = ({
  onProcessImages, // TODO: onProcessImages 보다는 afterProcessImages 같은 이름이 더 좋을 것 같다.
}: UseProcessMultipleImages) => {
  const handleChangeFileInputMultiple = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
        e.target.value = "";
        return;
      }

      const filesArray = Array.from(files);

      const readers = filesArray.map(file => {
        return readFileAsDataURL(file);
      });

      const fileUrls = await Promise.all(readers);

      const images = await Promise.all(
        fileUrls.map(async fileUrl => {
          const image = await loadImage(fileUrl);
          const canvas = convertImageToCanvas(image);
          const blob = await convertCanvasToBlob(
            canvas,
            "image/webp",
            IMAGE_QUALITY,
          );

          return blob;
        }),
      );

      e.target.value = "";
      onProcessImages(images);
    },
    [onProcessImages],
  );

  return {
    handleChangeFileInputMultiple,
  };
};
