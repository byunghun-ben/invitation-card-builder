"use client";

import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import StoryForm from "./StoryForm";
import PostForm from "./PostForm";

const Page = () => {
  const [stories, setStories] = useState<
    {
      id: string;
      title: string;
      images: string[];
    }[]
  >([]);

  const addStory = () => {
    setStories(stories => [
      ...stories,
      {
        id: Math.random().toString(),
        title: "",
        images: [],
      },
    ]);
  };

  const onChangeStoryTitle = (id: string, title: string) => {
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
  };

  // POST
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      content: string;
      images: string[];
    }[]
  >([]);

  const addPost = () => {
    setPosts(posts => [
      ...posts,
      {
        id: Math.random().toString(),
        title: "",
        content: "",
        images: [],
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Tab.Group>
        <section className="basis-60 p-10">
          <Tab.List className="flex flex-col items-start gap-10">
            <Tab
              className={({ selected }) =>
                `py-2 px-3 ${
                  selected ? "font-bold text-slate-900" : "text-slate-400"
                }`
              }
            >
              일반
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-3 ${
                  selected ? "font-bold text-slate-900" : "text-slate-400"
                }`
              }
            >
              스토리
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-3 ${
                  selected ? "font-bold text-slate-900" : "text-slate-400"
                }`
              }
            >
              게시물
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-3 ${
                  selected ? "font-bold text-slate-900" : "text-slate-400"
                }`
              }
            >
              결혼식장
            </Tab>
          </Tab.List>
        </section>
        <section className="flex-1 flex flex-col">
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col p-10">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold">프로필 정보</h2>
                  <div className="flex flex-col gap-4 w-96">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500"
                        htmlFor="신랑이름"
                      >
                        신랑
                      </label>
                      <input
                        id="신랑이름"
                        type="text"
                        placeholder="이름을 입력하세요"
                        className="p-2 border rounded"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500"
                        htmlFor="신부이름"
                      >
                        신부
                      </label>
                      <input
                        id="신부이름"
                        type="text"
                        placeholder="이름을 입력하세요"
                        className="p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold">사이트 정보</h2>
                  <div className="flex flex-col gap-4 w-96">
                    <div className="flex flex-col gap-1">
                      <label
                        className="text-xs font-bold text-slate-500"
                        htmlFor="청첩장제목"
                      >
                        청첩장 제목
                      </label>
                      <input
                        id="청첩장제목"
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="py-2 px-3 border rounded"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-500">
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
                    id={story.id}
                    index={index}
                    onChangeTitle={onChangeStoryTitle}
                  />
                ))}

                {/* Action Button */}
                <button
                  type="button"
                  className="flex border border-slate-900 py-3 rounded justify-center"
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
                    id={post.id}
                    index={index}
                    onChangeTitle={onChangeStoryTitle}
                  />
                ))}

                {/* Action Button */}
                <button
                  type="button"
                  className="flex border border-slate-900 py-3 rounded justify-center"
                  onClick={addPost}
                >
                  게시물 추가하기
                </button>
                {/* Action Button */}
              </div>
            </Tab.Panel>
            <Tab.Panel className="flex-1">4</Tab.Panel>
          </Tab.Panels>
        </section>
      </Tab.Group>
      <section className="basis-96 flex flex-col">3</section>
    </div>
  );
};

export default Page;
