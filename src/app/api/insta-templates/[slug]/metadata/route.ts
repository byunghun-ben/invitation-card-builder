import { instaMetadataSchema } from "@/schemas/instagram";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // pathname: /api/insta-templates/:slug/metadata
  const pathname = req.nextUrl.pathname;
  const code = pathname.split("/")[3];

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .schema("insta_template")
    .from("metadata")
    .select(
      `
      *,
      template ()
    `,
    )
    .eq("template.code", code)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const metadata = instaMetadataSchema.safeParse(data);

  if (!metadata.success) {
    return NextResponse.json({ message: "Data is invalid" }, { status: 500 });
  }

  return NextResponse.json({ ...metadata.data });
};
