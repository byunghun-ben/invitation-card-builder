import { instaImageSchema } from "@/schemas/instaTemplate";
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
): HTMLCanvasElement => {
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
  const blob = await convertConvasToBlob({ canvas });
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
    console.error("res", res);
    throw new Error("Cannot upload image");
  }

  const resBody = await res.json();
  const newImage = instaImageSchema.parse(resBody);

  return newImage;
};
