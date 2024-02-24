"use client";

import { InstaStory } from "@/schemas/instagram";
import Image from "next/image";
import { first } from "radash";
import { CSSProperties, useMemo, useState } from "react";
import ReactInstaStories from "react-insta-stories";
import { useContainerWidth } from "../ContainerWidthContext/ContainerWidthContext";
import { Story } from "react-insta-stories/dist/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  story: InstaStory;
};

const ContainerStyles: CSSProperties = {
  border: "1px solid red",
  position: "absolute",
  inset: 0,
  zIndex: 9999,
};

const StoryItem = ({ story }: Props) => {
  const pathname = usePathname();
  const thumbnail = first(story.images)?.url || "";
  const containerWidth = useContainerWidth();

  const instaStories = useMemo<Story[]>(() => {
    return story.images.map(image => ({
      url: image.url,
      duration: 30000000,
    }));
  }, [story.images]);

  console.log("containerWidth", containerWidth);

  const [isOpenStory, setIsOpenStory] = useState(false);

  return (
    <>
      <Link
        // type="button"
        href={`${pathname}/stories/${story.id}`}
        className="flex-none basis-16 flex flex-col gap-1 items-center"
        // onClick={() => {
        //   setIsOpenStory(true);
        // }}
      >
        <Image
          src={thumbnail}
          alt="스토리 썸네일 이미지"
          className="w-16 h-16 rounded-full border object-cover"
          width={64}
          height={64}
        />
        <span className="text-xxs line-clamp-1">{story.title || "스토리"}</span>
      </Link>
      {isOpenStory && (
        <ReactInstaStories
          storyContainerStyles={ContainerStyles}
          stories={instaStories}
          width={containerWidth}
          height={window.innerHeight}
          onAllStoriesEnd={() => {
            setIsOpenStory(false);
          }}
        />
      )}
    </>
  );
};

export default StoryItem;
