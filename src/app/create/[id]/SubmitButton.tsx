"use client";

import {
  InstaPost,
  InstaStory,
  InstaTemplate,
  InstaWeddingHall,
} from "@/schemas/instagram";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Props = {
  templateId: string;
  templateCode: string;
  metadata: InstaTemplate["metadata"];
  stories: InstaStory[];
  posts: InstaPost[];
  weddingHall: InstaWeddingHall;
};

const SubmitButton = ({
  templateId,
  templateCode,
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

    await fetch(`/api/insta-templates/${templateCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
