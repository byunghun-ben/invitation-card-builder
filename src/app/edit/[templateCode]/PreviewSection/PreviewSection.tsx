"use client";

import WeddingHallItem from "@/components/WeddingHallItem";
import {
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaWeddingHall,
} from "@/schemas/instaTemplate";
import { useCallback, useRef, useState } from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { MapIcon } from "@heroicons/react/24/outline";
import PostItem from "./PostItem";
import StoryItem from "./StoryItem";
import PreviewInstaHeader from "./PreviewInstaHeader";

type Props = {
  templateCode: string;
  metadata: InstaMetadata;
  posts: InstaPost[];
  stories: InstaStory[];
  weddingHall: InstaWeddingHall;
};

const PreviewSection = ({
  templateCode,
  metadata,
  posts,
  stories,
  weddingHall,
}: Props) => {
  const [isOpenStories, setIsOpenStories] = useState(false);
  const [selectedStory, setSelectedStory] = useState<InstaStory>();

  const clickStoryCover = useCallback(
    (story: InstaStory) => () => {
      setIsOpenStories(!isOpenStories);
      setSelectedStory(story);
    },
    [isOpenStories],
  );

  const previewRef = useRef<HTMLDivElement>(null);

  if (isOpenStories) {
    return (
      <Stories
        stories={(selectedStory?.images ?? []) as Story[]}
        defaultInterval={2000}
        width={previewRef?.current?.offsetWidth}
        height={window.innerHeight}
        onAllStoriesEnd={() => {
          setIsOpenStories(false);
        }}
      />
    );
  }

  return (
    <section
      ref={previewRef}
      className="basis-96 max-w-96 flex-1 flex flex-col overflow-y-auto"
    >
      <PreviewInstaHeader metaTitle={metadata.title} />

      {/* Story */}
      <div className="flex-none flex py-2 px-4">
        <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
          {stories.map(story => (
            <StoryItem
              key={story.id}
              story={story}
              clickStoryCover={clickStoryCover}
            />
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
          <PostItem key={post.id} post={post} templateCode={templateCode} />
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
