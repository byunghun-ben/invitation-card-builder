"use client";

import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import StoryForm from "./StoryForm";
import PostForm from "./PostForm";
import DEFAULT_IMAGE from "@/foundation/images/img_unicorn.png";
import Image from "next/image";
import PostItem from "./PostItem";
import WeddingHallForm from "./WeddingHallForm";
import WeddingHallItem from "./WeddingHallItem";

export type FileImage = {
  id: string;
  url: string;
};

type WeddingHall = {
  name: string;
  address: string;
  images: FileImage[];
  content: string;
};

const Page = () => {
  const [title, setTitle] = useState("");

  // STORY
  const [stories, setStories] = useState<
    {
      id: string;
      title: string;
      images: {
        id: string;
        url: string;
      }[];
    }[]
  >([
    {
      id: Math.random().toString(),
      title: "",
      images: [],
    },
  ]);

  const addStory = useCallback(() => {
    setStories(stories => [
      ...stories,
      {
        id: Math.random().toString(),
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

  const onChangeStoryImage = useCallback(
    (
      id: string,
      images: {
        id: string;
        url: string;
      }[],
    ) => {
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
    },
    [],
  );

  // POST
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      content: string;
      images: {
        id: string;
        url: string;
      }[];
    }[]
  >([
    {
      id: Math.random().toString(),
      title: "",
      content: "",
      images: [],
    },
  ]);

  const addPost = useCallback(() => {
    setPosts(posts => [
      ...posts,
      {
        id: Math.random().toString(),
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

  const onChangePostImage = useCallback(
    (
      id: string,
      images: {
        id: string;
        url: string;
      }[],
    ) => {
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
    },
    [],
  );
  // POST

  // WEDDING HALL
  const [weddingHall, setWeddingHall] = useState<WeddingHall>({
    name: "",
    address: "",
    images: [],
    content: "",
  });

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
    (weddingHallImages: FileImage[]) => {
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
        <section className="basis-48 shrink-0 py-10 pl-10 border-r">
          <Tab.List className="flex flex-col items-start gap-10">
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
        </section>
        <section className="basis-96 flex-1 flex flex-col border-r overflow-y-auto">
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold">프로필 정보</h2>
                  <div className="flex flex-col gap-4 w-96">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500 dark:text-white"
                        htmlFor="신랑이름"
                      >
                        신랑
                      </label>
                      <input
                        id="신랑이름"
                        type="text"
                        placeholder="이름을 입력하세요"
                        className="p-2 border rounded dark:bg-slate-900"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500 dark:text-white"
                        htmlFor="신부이름"
                      >
                        신부
                      </label>
                      <input
                        id="신부이름"
                        type="text"
                        placeholder="이름을 입력하세요"
                        className="p-2 border rounded dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold">사이트 정보</h2>
                  <div className="flex flex-col gap-4 w-96">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500 dark:text-white"
                        htmlFor="청첩장제목"
                      >
                        청첩장 제목
                      </label>
                      <input
                        id="청첩장제목"
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="py-2 px-3 border rounded dark:bg-slate-900"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-500 dark:text-white">
                        모바일 청첩장 주소
                      </span>
                      <Link
                        href="https://boran-maria.com/json_karina"
                        className="underline"
                      >
                        https://boran-maria.com/json_karina
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
      <section className="basis-96 max-w-96 flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex-none h-10 px-3 flex items-center">
          <span>{title || "청첩장 제목을 입력하세요"}</span>
          <div className="ml-auto flex items-center">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Header */}

        {/* Story */}
        <div className="flex-none flex py-2 px-4">
          <div className="flex gap-3 overflow-x-auto overscroll-contain no-scrollbar">
            {stories.map(story => (
              <div
                key={story.id}
                className="flex-none basis-16 flex flex-col gap-1 items-center"
              >
                <div>
                  <Image
                    src={story.images?.[0]?.url || DEFAULT_IMAGE}
                    alt="스토리 썸네일 이미지"
                    className="w-16 h-16 rounded-full border object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <span className="text-xxs line-clamp-1">
                  {story.title || "스토리"}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Story */}

        {/* Posts */}
        <div className="flex-none flex flex-col">
          {/* Empty */}
          {posts.length === 0 && (
            <div className="flex flex-col">
              <div className="flex flex-col items-center py-6 border">
                <span className="text-slate-500">아직 게시물이 없어요.</span>
                <p className="text-slate-500">
                  둘만의 이야기가 담긴 게시물을 추가해보세요!
                </p>
              </div>
            </div>
          )}
          {/* Empty */}
          {/* Post */}
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
          {/* Post */}
        </div>
        {/* Posts */}

        {/* WeddingHall */}
        <WeddingHallItem weddingHall={weddingHall} />
        {/* WeddingHall */}
      </section>
    </div>
  );
};

export default Page;
