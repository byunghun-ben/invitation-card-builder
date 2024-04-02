"use client";

import { InstaImage } from "@/schemas/instaTemplate";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import ReactInstaStories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import { useContainerWidth } from "../../model/ContainerWidthContext/ContainerWidthContext";

const DEFAULT_STORY_DURATION = 3000;

type Props = {
  images: InstaImage[];
  invitationId: string;
};

const InstaStories = ({ images, invitationId }: Props) => {
  const width = useContainerWidth();

  const router = useRouter();

  const stories = useMemo<Story[]>(() => {
    return images.map(image => ({
      ...image,
      duration: DEFAULT_STORY_DURATION,
    }));
  }, [images]);

  const handleStoryEnd = useCallback((index: number) => {}, []);

  const handleAllStoriesEnd = useCallback((lastIndex: number) => {
    const invitationDetailHref = `/${invitationId}`;

    router.push(invitationDetailHref);
  }, []);

  return (
    <ReactInstaStories
      stories={stories}
      onStoryEnd={handleStoryEnd}
      onAllStoriesEnd={handleAllStoriesEnd}
      width={width}
      height="100%"
    />
  );
};

export default InstaStories;
