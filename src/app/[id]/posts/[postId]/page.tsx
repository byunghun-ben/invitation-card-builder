"use client";

import InstaHeader from "@/app/[id]/InstaHeader";
import PostImageViewerV2 from "@/components/PostImageViewerV2";
import PostLikeIcon from "@/components/PostLikeIcon";
import { DummyInstaTemplate } from "@/foundation/data";
import MenuIcon from "@/foundation/icons/MenuIcon";
import { uid } from "radash";
import { FormEvent, useCallback, useState } from "react";

const POST_DATA = DummyInstaTemplate.posts[1];

const Page = () => {
  const [likeCount, setLikeCount] = useState(POST_DATA.likes);
  const [replies, setReplies] = useState(
    POST_DATA.replies.map(reply => ({ ...reply, id: uid(10, "reply-id") })),
  );

  const handleLike = useCallback(() => {
    setLikeCount(prev => prev + 1);
  }, []);

  const handleReplySubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");

    const content = formData.get("content");

    if (!name || typeof name !== "string") {
      return;
    }

    if (!content || typeof content !== "string") {
      return;
    }

    setReplies(prev => [
      ...prev,
      {
        id: uid(10, "reply-id"),
        name,
        content,
      },
    ]);

    e.currentTarget.reset();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <InstaHeader instaTemplate={DummyInstaTemplate} />

      {/* ImageViewer */}
      <PostImageViewerV2 images={POST_DATA.images} />
      {/* ImageViewer */}

      <div className="flex-none py-1">
        <PostLikeIcon onLike={handleLike} />
        <p className="text-sm font-bold mb-2 px-2">{`좋아요 ${likeCount}개`}</p>
        <p className="text-sm whitespace-pre-line px-2">{POST_DATA.content}</p>
      </div>

      <div className="flex-1 pt-1 pb-4 flex flex-col gap-4 border-t">
        <ul className="flex-none flex flex-col gap-2">
          {replies.map(reply => (
            <li key={reply.id} className="flex items-start">
              <div className="flex-1 flex flex-col gap-1 pl-2">
                <p className="text-sm font-bold">{reply.name}</p>
                <p className="text-sm whitespace-pre-line">{reply.content}</p>
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

        <form className="flex flex-col gap-3 px-2" onSubmit={handleReplySubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="이름"
              className="p-2 rounded dark:bg-slate-900 dark:text-white"
              autoComplete="off"
            />
            <input
              type="text"
              name="content"
              placeholder="댓글 달기..."
              className="p-2 rounded dark:bg-slate-900 dark:text-white"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="border py-2 rounded">
            <span className="text-sm font-bold">게시</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
