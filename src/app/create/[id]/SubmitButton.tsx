"use client";

type Props = {
  title: string;
  stories: InstaStory[];
  posts: InstaPost[];
  weddingHall: InstaWeddingHall;
};

const SubmitButton = ({ title, stories, posts, weddingHall }: Props) => {
  return (
    <button
      type="button"
      className="border py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
      onClick={() => {
        console.log("data", {
          title,
          stories,
          posts,
          weddingHall,
        });
      }}
    >
      <span className="font-bold">저장하기</span>
    </button>
  );
};

export default SubmitButton;
