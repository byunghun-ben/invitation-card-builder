"use client";

import WeddingHallItem from "@/components/WeddingHallItem";
import { InstaWeddingHall } from "@/schemas/instagram";
import { uid } from "radash";
import InstaHeader from "../InstaHeader";
import PostSection from "./PostSection";
import StorySection from "./StorySection";

const WEDDING_HALL: InstaWeddingHall = {
  name: "보타닉파크웨딩",
  address: "서울 강서구 마곡중앙5로 6 보타닉푸르지오시티 L층(로비층)",
  content: `마곡나루역 1번 2번 사이 내부연결통로로 연결되어 있어, 대중교통 이용 시 편하게 방문 가능합니다. 주차는 보타닉 푸르지오 시티에 주차 가능합니다.`,
  images: [
    {
      id: uid(10, "image-id"),
      url: "https://picsum.photos/id/111/600",
    },
    {
      id: uid(10, "image-id"),
      url: "https://picsum.photos/id/111/600",
    },
    {
      id: uid(10, "image-id"),
      url: "https://picsum.photos/id/111/600",
    },
  ],
};

const ViewSection = () => {
  return (
    <div className="h-full w-full flex-1 flex flex-col">
      <InstaHeader />

      <StorySection />

      <PostSection />

      <WeddingHallItem weddingHall={WEDDING_HALL} />
    </div>
  );
};

export default ViewSection;
