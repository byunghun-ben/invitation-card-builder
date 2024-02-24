"use client";

import { InstaImage } from "@/schemas/instagram";
import { ChangeEvent, useCallback } from "react";

type Props = {
  onChangeImage: (image: InstaImage) => void;
};

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

export const useChangeImage = ({ onChangeImage }: Props) => {
  const handleChangeFileInput = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files[0]) {
        e.target.value = "";
        return;
      }

      const file = e.target.files[0];

      const id = Math.random().toString(36).slice(2);
      const dataUrl = await readFileAsDataURL(file);

      e.target.value = "";
      onChangeImage({ id, url: dataUrl });
    },
    [onChangeImage],
  );

  return {
    handleChangeFileInput,
  };
};

type UseChangeImagesProps = {
  onChangeImages: (images: InstaImage[]) => void;
};

export const useChangeImages = ({ onChangeImages }: UseChangeImagesProps) => {
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

      const dataUrls = await Promise.all(readers);

      const images = dataUrls.map(dataUrl => {
        const id = Math.random().toString(36).slice(2);

        return { id, url: dataUrl };
      });

      e.target.value = "";
      onChangeImages(images);
    },
    [onChangeImages],
  );

  return {
    handleChangeFileInputMultiple,
  };
};
