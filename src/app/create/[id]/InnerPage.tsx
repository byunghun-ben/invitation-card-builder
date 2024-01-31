"use client";

import {
  InstaImage,
  InstaMetadata,
  InstaPost,
  InstaStory,
  InstaWeddingHall,
} from "@/schemas/instagram";
import { Tab } from "@headlessui/react";
import { useCallback, useState } from "react";
import MetadataPanel from "./MetadataPanel";
import PostForm from "./PostForm";
import StoryForm from "./StoryForm";
import SubmitButton from "./SubmitButton";
import WeddingHallForm from "./WeddingHallForm";
import PreviewSection from "./PreviewSection/PreviewSection";

type InnerPageProps = {
  defaultValue: {
    metadata: InstaMetadata;
    stories: InstaStory[];
    posts: InstaPost[];
    weddingHall: InstaWeddingHall;
  };
};

const InnerPage = ({ defaultValue }: InnerPageProps) => {
  // METADATA
  const [metadata, setMetadata] = useState<InstaMetadata>(
    defaultValue.metadata,
  );

  const handleGroomNameChange = useCallback((name: string) => {
    setMetadata(prev => ({
      ...prev,
      groomName: name,
    }));
  }, []);

  const handleBrideNameChange = useCallback((name: string) => {
    setMetadata(prev => ({
      ...prev,
      brideName: name,
    }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setMetadata(prev => ({
      ...prev,
      title,
    }));
  }, []);

  // STORY
  const [stories, setStories] = useState<InstaStory[]>(defaultValue.stories);

  const addStory = useCallback(() => {
    setStories(stories => [
      ...stories,
      {
        id: Math.random().toString(36).slice(2),
        title: "",
        images: [],
      },
    ]);
  }, []);

  const onRemoveStory = useCallback((storyId: string) => {
    setStories(stories => stories.filter(story => story.id !== storyId));
  }, []);

  const onChangeStoryTitle = useCallback((id: string, title: string) => {
    setStories(stories =>
      stories.map(story =>
        story.id === id
          ? {
              ...story,
              title,
            }
          : story,
      ),
    );
  }, []);

  const onChangeStoryImage = useCallback((id: string, images: InstaImage[]) => {
    setStories(stories =>
      stories.map(story =>
        story.id === id
          ? {
              ...story,
              images,
            }
          : story,
      ),
    );
  }, []);

  // POST
  const [posts, setPosts] = useState<InstaPost[]>(defaultValue.posts);

  const addPost = useCallback(() => {
    setPosts(posts => [
      ...posts,
      {
        id: Math.random().toString(36).slice(2),
        title: "",
        content: "",
        images: [],
      },
    ]);
  }, []);

  const onRemovePost = useCallback((postId: string) => {
    setPosts(posts => posts.filter(post => post.id !== postId));
  }, []);

  const onChangePostTitle = useCallback((id: string, title: string) => {
    setPosts(posts =>
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              title,
            }
          : post,
      ),
    );
  }, []);

  const onChangePostContent = useCallback((id: string, content: string) => {
    setPosts(posts =>
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              content,
            }
          : post,
      ),
    );
  }, []);

  const onChangePostImage = useCallback((id: string, images: InstaImage[]) => {
    setPosts(posts =>
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              images,
            }
          : post,
      ),
    );
  }, []);
  // POST

  // WEDDING HALL
  const [weddingHall, setWeddingHall] = useState<InstaWeddingHall>(
    defaultValue.weddingHall,
  );

  const handleWeddingHallNameChange = useCallback((weddingHallName: string) => {
    setWeddingHall(prev => ({
      ...prev,
      name: weddingHallName,
    }));
  }, []);

  const handleWeddingHallAddressChange = useCallback(
    (weddingHallAddress: string) => {
      setWeddingHall(prev => ({
        ...prev,
        address: weddingHallAddress,
      }));
    },
    [],
  );

  const handleWeddingHallImageChange = useCallback(
    (weddingHallImages: InstaImage[]) => {
      setWeddingHall(prev => ({
        ...prev,
        images: weddingHallImages,
      }));
    },
    [],
  );

  const handleWeddingHallContentChange = useCallback(
    (weddingHallContent: string) => {
      setWeddingHall(prev => ({
        ...prev,
        content: weddingHallContent,
      }));
    },
    [],
  );
  // WEDDING HALL

  return (
    <div className="flex h-screen">
      <Tab.Group>
        <section className="basis-48 shrink-0 border-r">
          <div className="w-full flex flex-col gap-4">
            <Tab.List className="flex flex-col items-start gap-10 py-10 pl-10">
              <Tab
                className={({ selected }) =>
                  `py-2 px-3 ${
                    selected
                      ? "font-bold text-slate-900 dark:text-white"
                      : "text-slate-400"
                  }`
                }
              >
                일반
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-2 px-3 ${
                    selected
                      ? "font-bold text-slate-900 dark:text-white"
                      : "text-slate-400"
                  }`
                }
              >
                스토리
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-2 px-3 ${
                    selected
                      ? "font-bold text-slate-900 dark:text-white"
                      : "text-slate-400"
                  }`
                }
              >
                게시물
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-2 px-3 ${
                    selected
                      ? "font-bold text-slate-900 dark:text-white"
                      : "text-slate-400"
                  }`
                }
              >
                결혼식장
              </Tab>
            </Tab.List>

            <div className="h-px bg-slate-700" />

            <div className="px-10 py-10 flex flex-col">
              <SubmitButton
                meta={metadata}
                posts={posts}
                stories={stories}
                weddingHall={weddingHall}
              />
            </div>
          </div>
        </section>
        <section className="basis-96 flex-1 flex flex-col border-r overflow-y-auto">
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <MetadataPanel
                metadata={metadata}
                onGroomNameChange={handleGroomNameChange}
                onBrideNameChange={handleBrideNameChange}
                onTitleChange={handleTitleChange}
              />
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <div className="flex flex-col gap-4">
                <h2>스토리</h2>

                {stories.length === 0 && (
                  <>
                    {/* Empty */}
                    <div className="flex flex-col items-center py-6 border">
                      <span className="text-slate-500">
                        아직 스토리가 없어요.
                      </span>
                      <span className="text-slate-500">
                        둘만의 이야기가 담긴 스토리를 추가해보세요!
                      </span>
                    </div>
                    {/* Empty */}
                  </>
                )}

                {stories.map((story, index) => (
                  <StoryForm
                    key={story.id}
                    index={index}
                    story={story}
                    onRemove={onRemoveStory}
                    onChangeTitle={onChangeStoryTitle}
                    onChangeImages={onChangeStoryImage}
                  />
                ))}

                {/* Action Button */}
                <button
                  type="button"
                  className="flex border border-slate-500 py-3 rounded justify-center"
                  onClick={addStory}
                >
                  스토리 추가하기
                </button>
                {/* Action Button */}
              </div>
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <div className="flex flex-col gap-4">
                <h2>게시물</h2>

                {posts.length === 0 && (
                  <>
                    {/* Empty */}
                    <div className="flex flex-col items-center py-6 border">
                      <span className="text-slate-500">
                        아직 게시물이 없어요.
                      </span>
                      <span className="text-slate-500">
                        둘만의 이야기가 담긴 게시물을 추가해보세요!
                      </span>
                    </div>
                    {/* Empty */}
                  </>
                )}

                {posts.map((post, index) => (
                  <PostForm
                    key={post.id}
                    post={post}
                    index={index}
                    onRemove={onRemovePost}
                    onChangeTitle={onChangePostTitle}
                    onChangeContent={onChangePostContent}
                    onChangeImages={onChangePostImage}
                  />
                ))}

                {/* Action Button */}
                <button
                  type="button"
                  className="flex border border-slate-500 py-3 rounded justify-center"
                  onClick={addPost}
                >
                  게시물 추가하기
                </button>
                {/* Action Button */}
              </div>
            </Tab.Panel>
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <WeddingHallForm
                weddingHall={weddingHall}
                onChangeName={handleWeddingHallNameChange}
                onChangeAddress={handleWeddingHallAddressChange}
                onChangeContent={handleWeddingHallContentChange}
                onChangeImages={handleWeddingHallImageChange}
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
