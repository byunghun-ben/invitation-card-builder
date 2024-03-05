"use client";

import {
  InstaPost,
  InstaStory,
  InstaTemplate,
  InstaWeddingHall,
} from "@/schemas/instagram";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  updateMetadata,
  updatePosts,
  updateStories,
  updateWeddingHall,
  updateWeddingHallImages,
} from "../action";

type Props = {
  templateId: string;
  metadata: InstaTemplate["metadata"];
  stories: InstaStory[];
  posts: InstaPost[];
  weddingHall: InstaWeddingHall;
};

const SubmitButton = ({
  templateId,
  metadata,
  stories,
  posts,
  weddingHall,
}: Props) => {
  const pathname = usePathname();

  const handleSubmit = useCallback(async () => {
    const data = {
      metadata,
      stories,
      posts,
      weddingHall,
    };

    console.log("data", data);

    await updateStories(templateId, stories);

    await updatePosts(templateId, posts);

    await updateMetadata(templateId, metadata);

    await updateWeddingHall(templateId, weddingHall);

    await updateWeddingHallImages(templateId, weddingHall.images);

    alert("저장되었습니다.");
  }, [metadata, stories, posts, weddingHall, pathname]);

  return (
    <button
      type="button"
      className="border py-2 px-4 rounded-full hover:bg-slate-100"
      onClick={handleSubmit}
    >
      <span className="font-bold">저장하기</span>
    </button>
  );
};

export default SubmitButton;
