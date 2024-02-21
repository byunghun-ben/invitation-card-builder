import { instaMetadataSchema, instaTemplateSchema } from "@/schemas/instagram";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";

type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const templateCode = params.id;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}/metadata`;

  const res = await fetch(url);

  if (!res.ok) {
    return {
      title: "결혼식 청첩장",
      description: "결혼식에 초대합니다.",
    };
  }

  const body = await res.json();
  const instaTemplateMetadata = instaMetadataSchema.parse(body);

  return {
    title: instaTemplateMetadata.title,
    description: instaTemplateMetadata.description,
  };
}

type Props = {
  children: ReactNode;
  params: {
    id: string;
  };
};

const InstaViewLayout = ({ children, params }: Props) => {
  return (
    <div data-component="InstaViewLayout" className="w-full max-w-lg mx-auto">
      {children}
    </div>
  );
};

export default InstaViewLayout;
