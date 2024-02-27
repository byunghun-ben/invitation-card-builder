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
  updateStory,
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
  const templateCode = pathname.split("/").pop() as string;

  const handleSubmit = useCallback(async () => {
    const data = {
      metadata,
      stories,
      posts,
      weddingHall,
    };

    console.log("data", data);

    // upload story
    await updateStory({
      templateId,
      dto: stories,
    });

    // upload post

    await updateMetadata({
      templateId,
      dto: {
        title: metadata.title,
        description: metadata.description,
        brideName: metadata.brideName,
        groomName: metadata.groomName,
      },
    });

    await updateWeddingHall({
      templateId,
      dto: {
        name: weddingHall.name,
        address: weddingHall.address,
        content: weddingHall.content,
      },
    });

    await updateWeddingHallImages(
      templateId,
      weddingHall.images.map(image => image.id),
    );

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
