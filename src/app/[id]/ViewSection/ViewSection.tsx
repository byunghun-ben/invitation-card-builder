"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PostSection from "./PostSection";
import StorySection from "./StorySection";
import useFullHeight from "./useFullHeight";
import WeddingHallItem from "@/components/WeddingHallItem";
import { InstaWeddingHall } from "@/schemas/instagram";
import { uid } from "radash";
import { Switch } from "@headlessui/react";
import InstaHeader from "../InstaHeader";

const WEDDING_HALL: InstaWeddingHall = {
  name: "웨딩홀 이름",
  address: "웨딩홀 주소",
  content: "웨딩홀 설명",
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
