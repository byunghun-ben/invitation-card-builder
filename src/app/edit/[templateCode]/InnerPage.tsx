"use client";

import {
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaTemplate,
  InstaWeddingHall,
} from "@/schemas/instaTemplate";
import { Tab } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import MetadataPanel from "./Panels/MetadataPanel";
import PostPanel from "./Panels/PostPanel";
import StoryPanel from "./Panels/StoryPanel";
import WeddingHallPanel from "./Panels/WeddingHallPanel";
import PreviewSection from "./PreviewSection/PreviewSection";
import TabSection from "./TabSection";
import { updateTemplate } from "../action";

type InnerPageProps = {
  template: InstaTemplate;
};

const InnerPage = ({ template }: InnerPageProps) => {
  const [metadata, setMetadata] = useState<InstaMetadata>(template.metadata);

  useEffect(() => {
    setMetadata(template.metadata);
  }, [template.metadata]);

  const [stories, setStories] = useState<InstaStory[]>(template.stories);

  useEffect(() => {
    setStories(template.stories);
  }, [template.stories]);

  const [posts, setPosts] = useState<InstaPost[]>(template.posts);

  useEffect(() => {
    setPosts(template.posts);
  }, [template.posts]);

  const [weddingHall, setWeddingHall] = useState<InstaWeddingHall>(
    template.weddingHall,
  );

  useEffect(() => {
    setWeddingHall(template.weddingHall);
  }, [template.weddingHall]);

  const handleSubmit = useCallback(async () => {
    const data = {
      metadata,
      stories,
      posts,
      weddingHall,
    };

    await updateTemplate(template.code, data);

    alert("저장되었습니다.");
  }, [template.code, metadata, stories, posts, weddingHall]);

  return (
    <div className="flex h-screen">
      <Tab.Group>
        <TabSection onSubmit={handleSubmit} />
        <section className="basis-96 flex-1 flex flex-col border-r overflow-y-auto">
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <MetadataPanel
                templateCode={template.code}
                metadata={metadata}
                setMetadata={setMetadata}
              />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <StoryPanel
                templateId={template.id}
                stories={stories}
                setStories={setStories}
              />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <PostPanel
                templateId={template.id}
                posts={posts}
                setPosts={setPosts}
              />
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
