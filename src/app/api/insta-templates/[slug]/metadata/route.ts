import { NextRequest, NextResponse } from "next/server";
import { checkIfError } from "@/utils/helpers";
import logger from "@/utils/logger";
import { getMetadata } from "./action";
import { transformMetadata } from "../../helpers/transformToClient";

export const GET = async (req: NextRequest) => {
  // pathname: /api/insta-templates/:slug/metadata
  const pathname = req.nextUrl.pathname;
  const templateCode = pathname.split("/")[3];

  logger.log("GET", { templateCode });

  try {
    const metadataResponse = await getMetadata(templateCode);
    const metadata = transformMetadata(metadataResponse);

    return NextResponse.json(metadata);
  } catch (error) {
    logger.error("INSTA_TEMPLATES_METADATA_GET_ERROR", error);
    if (!checkIfError(error)) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }

    if (error.message === "Not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
