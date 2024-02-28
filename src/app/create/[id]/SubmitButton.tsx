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
  meta: InstaTemplate["metadata"];
  stories: InstaStory[];
  posts: InstaPost[];
  weddingHall: InstaWeddingHall;
};

const SubmitButton = ({ meta, stories, posts, weddingHall }: Props) => {
  const pathname = usePathname();
  const templateCode = pathname.split("/").pop();

  const handleSubmit = useCallback(async () => {
    const data = {
      meta,
      stories,
      posts,
      weddingHall,
    };

    console.log("data", data);
    alert("저장되었습니다.");
  }, [meta, stories, posts, weddingHall, pathname]);

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
