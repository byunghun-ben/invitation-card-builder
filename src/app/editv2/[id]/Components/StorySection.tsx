"use client";

import DEFAULT_IMAGE from "@/foundation/images/img_default_image.webp";
import { InstaStory } from "@/schemas/instaTemplate";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

type Props = {
  stories: InstaStory[];
};

const StorySection = ({ stories }: Props) => {
  return (
    <div className="flex-none flex py-2 px-4 bg-white">
      <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
        {stories.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
        <StoryAddButton />
      </div>
    </div>
  );
};

function StoryItem({ story }: { story: InstaStory }) {
  return (
    <div className="flex-none basis-16 flex flex-col gap-1 items-center">
      <Image
        src={story.images?.[0]?.url || DEFAULT_IMAGE}
        alt="스토리 썸네일 이미지"
        className="w-16 h-16 rounded-full border object-cover border-slate-200 cursor-pointer"
        width={64}
        height={64}
        // onClick={clickStoryCover(story)}
      />
      <span className="text-xxs font-bold line-clamp-1 text-slate-700">
        {story.title || "스토리"}
      </span>
    </div>
  );
}

// 스토리 추가 버튼
function StoryAddButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex-none basis-16 flex flex-col gap-1 items-center"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex-center w-16 h-16 rounded-full border object-cover border-slate-200 cursor-pointer">
          <PlusIcon className="w-6 h-6" />
        </div>
        <span className="text-xxs font-bold line-clamp-1 text-slate-700">
          스토리 추가
        </span>
      </button>
      <StoryAddModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// 스토리 추가 모달
type StoryAddModalProps = {
  open: boolean;
  onClose: () => void;
};

function StoryAddModal({ open, onClose }: StoryAddModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-96 flex bg-white rounded h-96">
          <Dialog.Title>스토리 추가</Dialog.Title>
          <Dialog.Description>스토리를 추가해주세요.</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default StorySection;
