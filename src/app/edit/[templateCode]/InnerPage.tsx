"use client";

import {
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaTemplate,
  InstaWeddingHall,
} from "@/schemas/instaTemplate";
import logger from "@/utils/logger";
import { Tab } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateTemplate } from "../action";
import MetadataPanel from "./Panels/MetadataPanel";
import PostPanel from "./Panels/PostPanel";
import StoryPanel from "./Panels/StoryPanel";
import WeddingHallPanel from "./Panels/WeddingHallPanel";
import PreviewSection from "./PreviewSection/PreviewSection";
import TabSection from "./TabSection";

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

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsPending(true);

    const data = {
      metadata,
      stories,
      posts,
      weddingHall,
    };

    try {
      await updateTemplate(template.code, data);
      toast.success("저장 완료!", {
        position: "bottom-left",
        duration: 2000,
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsPending(false);
    }
  }, [template.code, metadata, stories, posts, weddingHall]);

  return (
    <div className="flex h-screen">
      <Tab.Group>
        <TabSection onSubmit={handleSubmit} isPending={isPending} />
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
        templateCode={template.code}
        metadata={metadata}
        stories={stories}
        posts={posts}
        weddingHall={weddingHall}
      />
    </div>
  );
};

export default InnerPage;
