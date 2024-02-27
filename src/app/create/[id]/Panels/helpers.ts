import { instaImageSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/client";

// upload files to supabase storage
export const uploadFiles = async (files: File[]) => {
  const supabase = createClient();

  try {
    const uploadRes = await Promise.all(
      files.map(async file => {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(file.name, file);

        if (error) {
          throw new Error(error.message);
        }

        return data;
      }),
    );

    return uploadRes;
  } catch (error) {
    console.error("uploadFiles error", error);
    return null;
  }
};

// insert to images table
export const insertImages = async (images: { path: string }[]) => {
  const BASE_URL =
    "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images";
  const supabase = createClient();

  try {
    const newImages = await Promise.all(
      images.map(async image => {
        const { data, error } = await supabase
          .schema("insta_template")
          .from("images")
          .insert({ url: `${BASE_URL}/${image.path}` })
          .select(`*`)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        return instaImageSchema.parse(data);
      }),
    );

    return newImages;
  } catch (error) {
    console.error("insertImages error", error);
    return null;
  }
};
