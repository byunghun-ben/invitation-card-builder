import InstaHeader from "@/app/[id]/InstaHeader";
import PostImageViewerV2 from "@/components/PostImageViewerV2";
import MenuIcon from "@/foundation/icons/MenuIcon";
import { instaPostSchema } from "@/schemas/instagram";
import { headers } from "next/headers";
import PostLikeSection from "./PostLikeSection";
import CreateCommentForm from "./CreateCommentForm";

export const revalidate = 1;

type Props = {
  params: {
    id: string;
    postId: string;
  };
};

const Page = async (props: Props) => {
  const templateCode = props.params.id;
  const postId = props.params.postId;
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/posts/${postId}`;

  const res = await fetch(url);

  if (!res.ok) {
    return { notFound: true };
  }

  const body = await res.json();

  const instaPost = instaPostSchema.parse(body);

  return (
    <div className="w-full h-full flex flex-col">
      <InstaHeader templateCode={templateCode} metaTitle="DUMMY_TITLE" />

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
