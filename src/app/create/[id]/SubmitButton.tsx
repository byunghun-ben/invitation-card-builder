"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Props = {
  meta: InstaMeta;
  stories: InstaStory[];
  posts: InstaPost[];
  weddingHall: InstaWeddingHall;
};

const SubmitButton = ({ meta, stories, posts, weddingHall }: Props) => {
  const pathname = usePathname();
  const id = pathname.replace("/create/", "");

  const handleSubmit = useCallback(() => {
    const data = {
      meta,
      stories,
      posts,
      weddingHall,
    };

    const stringifiedData = JSON.stringify(data);
    const key = `data-${id}`;
    localStorage.setItem(key, stringifiedData);

    console.log("data", data);
    alert("저장되었습니다.");
  }, [meta, stories, posts, weddingHall, pathname]);

  return (
    <button
      type="button"
      className="border py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
      onClick={handleSubmit}
    >
      <span className="font-bold">저장하기</span>
    </button>
  );
};

export default SubmitButton;
