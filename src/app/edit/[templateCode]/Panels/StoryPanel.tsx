"use client";

import { InstaImage, InstaStory } from "@/schemas/instaTemplate";
import { uid } from "radash";
import { Dispatch, SetStateAction, useCallback } from "react";
import StoryForm from "./StoryForm";

type Props = {
  templateId: string;
  stories: InstaStory[];
  setStories: Dispatch<SetStateAction<InstaStory[]>>;
};

function getStoryDisplayOrder(stories: InstaStory[]) {
  return Math.max(...stories.map(story => story.displayOrder), 0) + 1;
}

const StoryPanel = ({ templateId, stories, setStories }: Props) => {
  const isEmpty = stories.length === 0;

  const addStory = useCallback(() => {
    setStories(prev => [
      ...prev,
      {
        id: uid(10, "story-id"),
        title: "",
        images: [],
        templateId,
        displayOrder: getStoryDisplayOrder(prev),
      },
    ]);
  }, [templateId, setStories]);

  const onRemoveStory = useCallback(
    (storyId: string) => {
      setStories(prev => prev.filter(story => story.id !== storyId));
    },
    [setStories],
  );

  const onChangeStoryTitle = useCallback(
    (id: string, title: string) => {
      setStories(prev =>
        prev.map(story => {
          if (story.id !== id) {
            return story;
          }

          return {
            ...story,
            title,
          };
        }),
      );
    },
    [setStories],
  );

  const onChangeStoryImage = useCallback(
    (id: string, images: InstaImage[]) => {
      setStories(prev =>
        prev.map(story => {
          if (story.id !== id) {
            return story;
          }

          return {
            ...story,
            images,
          };
        }),
      );
    },
    [setStories],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">스토리</h2>

      {isEmpty && (
        <>
          {/* Empty */}
          <div className="flex flex-col items-center py-6 border">
            <span className="text-slate-500">아직 스토리가 없어요.</span>
            <span className="text-slate-500">
              둘만의 이야기가 담긴 스토리를 추가해보세요!
            </span>
          </div>
          {/* Empty */}
        </>
      )}

      {stories.map((story, index) => (
        <StoryForm
          key={story.id}
          index={index}
          story={story}
          onRemove={onRemoveStory}
          onChangeTitle={onChangeStoryTitle}
          onChangeImages={onChangeStoryImage}
        />
      ))}

      <button
        type="button"
        className="flex border border-slate-500 py-2 rounded justify-center hover:bg-slate-50"
        onClick={addStory}
      >
        스토리 추가하기
      </button>
    </div>
  );
};

export default StoryPanel;
