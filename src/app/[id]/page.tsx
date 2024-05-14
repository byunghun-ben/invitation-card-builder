import PostItem from "@/components/PostItem";
import WeddingHallItem from "@/components/WeddingHallItem";
import { Metadata, ResolvingMetadata } from "next";
import { getInstaTemplateByCode, getMetadataByTemplateCode } from "./api";
import InstaHeader from "./ui/InstaHeader";
import StorySection from "./ui/ViewSection/StorySection";

type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const templateCode = params.id;

  try {
    const instaMetadata = await getMetadataByTemplateCode(templateCode);

    return {
      title: instaMetadata.title,
      description: instaMetadata.description,
    };
  } catch (error) {
    return {
      title: "결혼식 청첩장",
      description: "결혼식에 초대합니다.",
    };
  }
}

type Props = {
  params: {
    id: string;
  };
};

const Page = async (props: Props) => {
  const templateCode = props.params.id;

  const instaTemplate = await getInstaTemplateByCode(templateCode);

  return (
    <div className="h-full w-full flex-1 flex flex-col">
      <InstaHeader
        templateCode={templateCode}
        metaTitle={instaTemplate.metadata.title}
      />

      <StorySection
        templateCode={templateCode}
        stories={instaTemplate.stories}
      />

      <section className="flex-none flex flex-col">
        {instaTemplate.posts.map(post => (
          <PostItem
            key={post.id}
            postId={post.id}
            templateCode={templateCode}
          />
        ))}
      </section>

      <WeddingHallItem weddingHall={instaTemplate.weddingHall} />
    </div>
  );
};

export default Page;
