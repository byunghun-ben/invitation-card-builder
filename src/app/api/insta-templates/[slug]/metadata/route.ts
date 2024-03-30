import { NextRequest, NextResponse } from "next/server";
import { getMetadata } from "./action";
import { transformMetadata } from "../../helpers/transformToClient";

export const GET = async (req: NextRequest) => {
  // pathname: /api/insta-templates/:slug/metadata
  const pathname = req.nextUrl.pathname;
  const templateCode = pathname.split("/")[3];

  const metadataResponse = await getMetadata(templateCode);

  const metadata = transformMetadata(metadataResponse);

  return NextResponse.json(metadata);
};
