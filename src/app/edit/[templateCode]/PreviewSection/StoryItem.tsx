import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaStory } from "@/schemas/instaTemplate";
import Image from "next/image";

function StoryItem({
  story,
  clickStoryCover,
}: {
  story: InstaStory;
  clickStoryCover: (story: InstaStory) => () => void;
}) {
  return (
    <div className="flex-none basis-16 flex flex-col gap-1 items-center">
      <div>
        <Image
          src={story.images?.[0]?.url || DEFAULT_IMAGE}
          alt="스토리 썸네일 이미지"
          className="w-16 h-16 rounded-full border object-cover"
          width={64}
          height={64}
          onClick={clickStoryCover(story)}
        />
      </div>
      <span className="text-xxs line-clamp-1">{story.title || "스토리"}</span>
    </div>
  );
}

export default StoryItem;
