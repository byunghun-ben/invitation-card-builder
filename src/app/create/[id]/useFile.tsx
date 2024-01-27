"use client";

import { ChangeEvent, useCallback } from "react";

type Props = {
  onChangeImage: (image: FileImage) => void;
};

const readFileAsDataURL = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;

      if (!dataUrl || typeof dataUrl !== "string") {
        return;
      }

      resolve(dataUrl);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const useChangeImage = ({ onChangeImage }: Props) => {
  const handleChangeFileInput = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const file = files[0];

      if (!file) {
        return;
      }

      const id = Math.random().toString(36).slice(2);
      const dataUrl = await readFileAsDataURL(file);

      onChangeImage({ id, url: dataUrl });
    },
    [onChangeImage],
  );

  return {
    handleChangeFileInput,
  };
};

type UseChangeImagesProps = {
  onChangeImages: (images: FileImage[]) => void;
};

export const useChangeImages = ({ onChangeImages }: UseChangeImagesProps) => {
  const handleChangeFileInputMultiple = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
        return;
      }

      const filesArray = Array.from(files);

      const readers = filesArray.map(file => {
        return readFileAsDataURL(file);
      });

      const dataUrls = await Promise.all(readers);

      const images = dataUrls.map(dataUrl => {
        const id = Math.random().toString(36).slice(2);

        return { id, url: dataUrl };
      });

      onChangeImages(images);
    },
    [onChangeImages],
  );

  return {
    handleChangeFileInputMultiple,
  };
};
