import WeddingHallItem from "@/components/WeddingHallItem";
import { instaTemplateSchema } from "@/schemas/instagram";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import InstaHeader from "./InstaHeader";
import PostSection from "./ViewSection/PostSection";
import StorySection from "./ViewSection/StorySection";

export const revalidate = 1;

type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: "결혼식 청첩장 메타 타이틀",
    description: "결혼식 청첩장 메타 설명",
  };
}

type Props = {
  params: {
    id: string;
  };
};

const Page = async (props: Props) => {
  const templateCode = props.params.id;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}`;

  const res = await fetch(url);

  if (!res.ok) {
    return (
      <div>
        <h1>Failed to fetch insta template</h1>
      </div>
    );
  }

  const body = await res.json();
  const instaTemplate = instaTemplateSchema.parse(body);

  return (
    <div className="h-full w-full flex-1 flex flex-col">
      <InstaHeader
        templateCode={templateCode}
        metaTitle={instaTemplate.metadata.title}
      />

      <StorySection stories={instaTemplate.stories} />

      <PostSection posts={instaTemplate.posts} />

      <WeddingHallItem weddingHall={instaTemplate.wedding_hall} />
    </div>
  );
};

export default Page;
