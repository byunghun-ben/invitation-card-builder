"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import {
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaWeddingHall,
} from "@/schemas/instagram";
import Image from "next/image";
import PostItem from "./PostItem";
import WeddingHallItem from "@/components/WeddingHallItem";

type Props = {
  metadata: InstaMetadata;
  posts: InstaPost[];
  stories: InstaStory[];
  weddingHall: InstaWeddingHall;
};

const PreviewSection = ({ metadata, posts, stories, weddingHall }: Props) => {
  const title = metadata.title || "청첩장 제목을 입력하세요";

  return (
    <section className="basis-96 max-w-96 flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex-none h-10 px-3 flex items-center">
        <span>{title}</span>
        <div className="ml-auto flex items-center">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Header */}

      {/* Story */}
      <div className="flex-none flex py-2 px-4">
        <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
          {stories.map(story => (
            <div
              key={story.id}
              className="flex-none basis-16 flex flex-col gap-1 items-center"
            >
              <div>
                <Image
                  src={story.images?.[0]?.url || DEFAULT_IMAGE}
                  alt="스토리 썸네일 이미지"
                  className="w-16 h-16 rounded-full border object-cover"
                  width={64}
                  height={64}
                />
              </div>
              <span className="text-xxs line-clamp-1">
                {story.title || "스토리"}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Story */}

      {/* Posts */}
      <div className="flex-none flex flex-col">
        {/* Empty */}
        {posts.length === 0 && (
          <div className="flex flex-col">
            <div className="flex flex-col items-center py-6 border">
              <span className="text-slate-500">아직 게시물이 없어요.</span>
              <p className="text-slate-500">
                둘만의 이야기가 담긴 게시물을 추가해보세요!
              </p>
            </div>
          </div>
        )}
        {/* Empty */}
        {/* Post */}
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
        {/* Post */}
      </div>
      {/* Posts */}

      {/* WeddingHall */}
      <WeddingHallItem weddingHall={weddingHall} />
      {/* WeddingHall */}
    </section>
  );
};

export default PreviewSection;
