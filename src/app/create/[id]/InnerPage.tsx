"use client";

import { type InstaTemplate, type InstaWeddingHall } from "@/schemas/instagram";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { logout } from "../action";
import MetadataPanel from "./Panels/MetadataPanel";
import PostPanel from "./Panels/PostPanel";
import StoryPanel from "./Panels/StoryPanel";
import WeddingHallPanel from "./Panels/WeddingHallPanel";
import PreviewSection from "./PreviewSection/PreviewSection";
import SubmitButton from "./SubmitButton";

type InnerPageProps = {
  defaultValue: InstaTemplate;
};

const InnerPage = ({ defaultValue }: InnerPageProps) => {
  const [metadata, setMetadata] = useState<InstaTemplate["metadata"]>(
    defaultValue.metadata,
  );

  const [stories, setStories] = useState<InstaTemplate["stories"]>(
    defaultValue.stories,
  );

  const [posts, setPosts] = useState<InstaTemplate["posts"]>(
    defaultValue.posts,
  );

  // WEDDING HALL
  const [weddingHall, setWeddingHall] = useState<InstaWeddingHall>(
    defaultValue.wedding_hall,
  );

  return (
    <div className="flex h-screen">
      <Tab.Group>
        <section className="basis-48 flex-none border-r">
          <div className="w-full flex flex-col gap-10 py-10">
            <Tab.List className="flex flex-col gap-4 pl-4">
              <Tab
                className={({ selected }) =>
                  `flex text-left py-3 px-4 hover:bg-slate-50 ${
                    selected ? "font-bold text-slate-900" : "text-slate-400"
                  }`
                }
              >
                일반
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex text-left py-3 px-4 hover:bg-slate-50 ${
                    selected ? "font-bold text-slate-900" : "text-slate-400"
                  }`
                }
              >
                스토리
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex text-left py-3 px-4 hover:bg-slate-50 ${
                    selected ? "font-bold text-slate-900" : "text-slate-400"
                  }`
                }
              >
                게시물
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex text-left py-3 px-4 hover:bg-slate-50 ${
                    selected ? "font-bold text-slate-900" : "text-slate-400"
                  }`
                }
              >
                결혼식장
              </Tab>
            </Tab.List>

            <div className="px-4 flex flex-col gap-2">
              <SubmitButton
                meta={metadata}
                posts={posts}
                stories={stories}
                weddingHall={weddingHall}
              />
              <button
                onClick={() => {
                  logout();
                }}
                className="text-sm text-slate-700 self-center"
              >
                로그아웃
              </button>
            </div>
          </div>
        </section>
        <section className="basis-96 flex-1 flex flex-col border-r overflow-y-auto">
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <MetadataPanel metadata={metadata} setMetadata={setMetadata} />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <StoryPanel stories={stories} setStories={setStories} />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <PostPanel posts={posts} setPosts={setPosts} />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <WeddingHallPanel
                weddingHall={weddingHall}
                setWeddingHall={setWeddingHall}
              />
            </Tab.Panel>
          </Tab.Panels>
        </section>
      </Tab.Group>
      <PreviewSection
        metadata={metadata}
        stories={stories}
        posts={posts}
        weddingHall={weddingHall}
      />
    </div>
  );
};

export default InnerPage;
