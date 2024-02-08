"use client";

import WeddingHallItem from "@/components/WeddingHallItem";
import { InstaTemplate } from "@/schemas/instagram";
import InstaHeader from "../InstaHeader";
import PostSection from "./PostSection";
import StorySection from "./StorySection";

type Props = {
  instaTemplate: InstaTemplate;
};

const ViewSection = ({ instaTemplate }: Props) => {
  return (
    <div className="h-full w-full flex-1 flex flex-col">
      <InstaHeader instaTemplate={instaTemplate} />

      <StorySection stories={instaTemplate.stories} />

      <PostSection posts={instaTemplate.posts} />

      <WeddingHallItem weddingHall={instaTemplate.weddingHall} />
    </div>
  );
};

export default ViewSection;
