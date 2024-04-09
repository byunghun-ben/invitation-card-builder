import { instaImageSchema } from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import { uid } from "radash";

export const readFileAsDataURL = (file: File): Promise<string> => {
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

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = url;
  });
};

export const convertImageToCanvas = (
  image: HTMLImageElement,
  maxWidth: number = 1024,
  maxHeight: number = 1024,
): HTMLCanvasElement => {
  // 원본 이미지와의 비율을 계산합니다.
  // 이미지의 크기가 maxWidth, maxHeight보다 작은 경우 1을 반환합니다.
  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);

  // 새로운 크기를 계산합니다.
  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;

  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    throw new Error("Cannot get canvas context");
  }

  canvasContext.drawImage(image, 0, 0, newWidth, newHeight);

  return canvas;
};

export const convertConvasToBlob = ({
  canvas,
  type = "image/webp",
  quality = 1,
}: {
  canvas: HTMLCanvasElement;
  type?: string;
  quality?: number;
}): Promise<Blob> => {
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

export const compressImage = async (file: File): Promise<File> => {
  const fileName = uid(12);

  const fileUrl = await readFileAsDataURL(file);
  const image = await loadImage(fileUrl);

  const canvas = convertImageToCanvas(image);
  const blob = await convertConvasToBlob({ canvas, quality: 0.7 });
  const compressedFile = new File([blob], fileName, { type: blob.type });

  return compressedFile;
};

export const uploadImageFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);

  const res = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    logger.error("res", res);
    throw new Error("Cannot upload image");
  }

  const resBody = await res.json();
  const newImage = instaImageSchema.parse(resBody);

  return newImage;
};
