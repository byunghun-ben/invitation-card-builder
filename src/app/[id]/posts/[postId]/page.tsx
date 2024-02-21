import InstaHeader from "@/app/[id]/InstaHeader";
import PostImageViewerV2 from "@/components/PostImageViewerV2";
import MenuIcon from "@/foundation/icons/MenuIcon";
import { instaMetadataSchema, instaPostSchema } from "@/schemas/instagram";
import { headers } from "next/headers";
import PostLikeSection from "./PostLikeSection";
import CreateCommentForm from "./CreateCommentForm";

export const revalidate = 1;

const getPost = async (postId: string) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/posts/${postId}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const body = await res.json();

  const instaPost = instaPostSchema.parse(body);

  return instaPost;
};

const getMetadata = async (templateCode: string) => {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/insta-templates/${templateCode}/metadata`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch metadata");
  }

  const body = await res.json();
  const instaTemplateMetadata = instaMetadataSchema.parse(body);

  return instaTemplateMetadata;
};

type Props = {
  params: {
    id: string;
    postId: string;
  };
};

const Page = async (props: Props) => {
  console.log("Page", props);
  const templateCode = props.params.id;

  const instaPost = await getPost(props.params.postId);
  const instaTemplateMetadata = await getMetadata(templateCode);

  return (
    <div className="w-full h-full flex flex-col">
      <InstaHeader
        templateCode={templateCode}
        metaTitle={instaTemplateMetadata.title}
      />

      {/* ImageViewer */}
      <PostImageViewerV2 images={instaPost.images} />
      {/* ImageViewer */}

      <div className="flex-none py-1">
        <PostLikeSection likes={instaPost.likes} />
        <p className="text-sm whitespace-pre-line px-2">{instaPost.content}</p>
      </div>

      <div className="flex-1 pt-1 pb-4 flex flex-col gap-4 border-t">
        <ul className="flex-none flex flex-col gap-2">
          {instaPost.comments.map(comment => (
            <li key={comment.id} className="flex items-start">
              <div className="flex-1 flex flex-col gap-1 pl-2">
                <p className="text-sm font-bold">{comment.name}</p>
                <p className="text-sm whitespace-pre-line">{comment.content}</p>
              </div>
              <button
                type="button"
                className="p-2 text-sm rounded active:bg-slate-50 dark:active:bg-slate-900"
              >
                <MenuIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>

        <CreateCommentForm />
      </div>
    </div>
  );
};

export default Page;
