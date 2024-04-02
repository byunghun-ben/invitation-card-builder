import { instaImageSchema } from "@/schemas/instaTemplate";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://knuahpfeiqewcczgflkw.supabase.co/storage/v1/object/public/images";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const file = formData.get("file");
  const fileName = formData.get("fileName");

  if (!file || typeof fileName !== "string") {
    return NextResponse.json({ message: "BadRequest" }, { status: 400 });
  }

  const supabase = createClient();
  const fileUploadRes = await supabase.storage
    .from("images")
    .upload(fileName as string, file);

  if (fileUploadRes.error) {
    return NextResponse.json(
      { message: fileUploadRes.error.message },
      { status: 500 },
    );
  }

  const uploadFilePath = fileUploadRes.data.path;
  const url = `${BASE_URL}/${uploadFilePath}`;

  const uploadTemplateImageRes = await supabase
    .schema("insta_template")
    .from("images")
    .insert({ url })
    .select(`*`)
    .single();

  if (uploadTemplateImageRes.error) {
    return NextResponse.json(
      { message: uploadTemplateImageRes.error.message },
      { status: 500 },
    );
  }

  const instaImage = instaImageSchema.parse({
    ...uploadTemplateImageRes.data,
    displayOrder: uploadTemplateImageRes.data.display_order,
  });

  return NextResponse.json(instaImage);
};
