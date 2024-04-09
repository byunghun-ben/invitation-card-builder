import { InstaStory } from "@/schemas/instaTemplate";
import Image from "next/image";
import Link from "next/link";
import { first } from "radash";

type Props = {
  story: InstaStory;
  templateCode: string;
};

const StoryItem = ({ story, templateCode }: Props) => {
  const storyDetailUrl = `/${templateCode}/stories/${story.id}`;
  const thumbnail = first(story.images)?.url || "";
  const title = story.title || "스토리";

  if (!thumbnail) {
    return null;
  }

  return (
    <Link
      href={storyDetailUrl}
      className="flex-none basis-16 flex flex-col gap-1 items-center hover:bg-slate-100"
    >
      <Image
        src={thumbnail}
        alt="스토리 썸네일 이미지"
        className="w-16 h-16 rounded-full border object-cover"
        width={64}
        height={64}
      />
      <span className="text-xs text-slate-700 line-clamp-1">{title}</span>
    </Link>
  );
};

export default StoryItem;
