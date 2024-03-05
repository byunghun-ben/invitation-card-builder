"use client";

import { type InstaImage, type InstaStory } from "@/schemas/instagram";
import { uid } from "radash";
import { Dispatch, SetStateAction, useCallback } from "react";
import StoryForm from "./StoryForm";

type Props = {
  templateId: string;
  stories: InstaStory[];
  setStories: Dispatch<SetStateAction<InstaStory[]>>;
};

const StoryPanel = ({ templateId, stories, setStories }: Props) => {
  const addStory = useCallback(() => {
    setStories(stories => [
      ...stories,
      {
        id: uid(10, "story-id"),
        title: "",
        images: [],
        template_id: templateId,
      },
    ]);
  }, [templateId, setStories]);

  const onRemoveStory = useCallback(
    (storyId: string) => {
      setStories(stories => stories.filter(story => story.id !== storyId));
    },
    [setStories],
  );

  const onChangeStoryTitle = useCallback(
    (id: string, title: string) => {
      setStories(stories =>
        stories.map(story =>
          story.id === id
            ? {
                ...story,
                title,
              }
            : story,
        ),
      );
    },
    [setStories],
  );

  const onChangeStoryImage = useCallback(
    (id: string, images: InstaImage[]) => {
      setStories(stories =>
        stories.map(story =>
          story.id === id
            ? {
                ...story,
                images,
              }
            : story,
        ),
      );
    },
    [setStories],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">스토리</h2>

      {stories.length === 0 && (
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
        className="flex border border-slate-500 py-3 rounded justify-center"
        onClick={addStory}
      >
        스토리 추가하기
      </button>
    </div>
  );
};

export default StoryPanel;
