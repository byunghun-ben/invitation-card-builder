import { InstaStory } from "@/schemas/instagram";
import StoryItem from "./StoryItem";

type Props = {
  stories: InstaStory[];
};

const StorySection = ({ stories }: Props) => {
  return (
    <div className="flex-none flex py-2 px-4">
      <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
        {stories.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StorySection;
