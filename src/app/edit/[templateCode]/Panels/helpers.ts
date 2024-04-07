import logger from "@/utils/logger";
import { uploadFile, uploadImage } from "../../action";

// upload files to supabase storage
export const uploadFiles = async (files: File[]) => {
  try {
    const uploadRes = await Promise.all(files.map(uploadFile));

    return uploadRes;
  } catch (error) {
    logger.error("uploadFiles error", error);
    return null;
  }
};

// insert to images table
export const insertImages = async (images: { path: string }[]) => {
  try {
    const newImages = await Promise.all(images.map(uploadImage));

    return newImages;
  } catch (error) {
    logger.error("insertImages error", error);
    return null;
  }
};
