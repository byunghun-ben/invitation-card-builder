"use client";

import InstaPostLikeAndComment from "@/components/InstaPost/InstaPostLikeAndComment";
import PostImageViewerV2 from "@/components/PostImageViewerV2";
import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaPost } from "@/schemas/instaTemplate";
import Image from "next/image";

type Props = {
  templateCode: string;
  post: InstaPost;
};

const PostItem = ({ templateCode, post }: Props) => {
  return (
    <article className="flex flex-col">
      <div className="flex gap-2 items-center p-2">
        <Image
          alt="프로필 이미지"
          src={DEFAULT_IMAGE}
          className="rounded-full border object-cover"
          width={24}
          height={24}
        />
        <span className="text-sm">{post.title}</span>
      </div>

      <PostImageViewerV2 images={post.images} />

      <InstaPostLikeAndComment
        templateCode={templateCode}
        postId={post.id}
        defaultLikeCount={post.likes}
        commentCount={post.comments.length}
      />

      {post.content && (
        <div className="flex flex-col gap-1 py-1 px-3">
          <p className="text-sm whitespace-pre-line">{post.content}</p>
        </div>
      )}
    </article>
  );
};

export default PostItem;
