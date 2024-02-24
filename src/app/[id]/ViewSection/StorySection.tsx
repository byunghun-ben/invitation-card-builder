import { InstaStory } from "@/schemas/instagram";
import Image from "next/image";
import { uid } from "radash";

const stories: InstaStory[] = [
  {
    id: uid(10, "story-id"),
    title: "봄",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/111/200",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/112/200",
      },
    ],
  },
  {
    id: uid(10, "story-id"),
    title: "여름",
    images: [
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/222/200",
      },
      {
        id: uid(10, "image-id"),
        url: "https://picsum.photos/id/223/200",
      },
    ],
  },
];

const StorySection = () => {
  return (
    <div className="flex-none flex py-2 px-4">
      <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
        {stories.map(story => (
          <div
            key={story.id}
            className="flex-none basis-16 flex flex-col gap-1 items-center"
          >
            <Image
              src={story.images?.[0]?.url}
              alt="스토리 썸네일 이미지"
              className="w-16 h-16 rounded-full border object-cover"
              width={64}
              height={64}
            />
            <span className="text-xxs line-clamp-1">
              {story.title || "스토리"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorySection;
