"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PostSection from "./PostSection";
import StorySection from "./StorySection";
import useFullHeight from "./useFullHeight";
import WeddingHallItem from "@/components/WeddingHallItem";
import { InstaWeddingHall } from "@/schemas/instagram";
import { uid } from "radash";
import { Switch } from "@headlessui/react";

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
  const divRef = useRef<HTMLDivElement>(null);
  useFullHeight({ divRef });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleColorScheme = useCallback((isDarkScheme: boolean) => {
    const body = document.querySelector("body");
    body?.classList.remove(isDarkScheme ? "light-mode" : "dark-mode");
    body?.classList.add(isDarkScheme ? "dark-mode" : "light-mode");
    setIsDarkMode(isDarkScheme);
  }, []);

  useEffect(() => {
    const isDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const body = document.querySelector("body");
    body?.classList.add(isDarkScheme ? "dark-mode" : "light-mode");
    setIsDarkMode(isDarkScheme);

    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  return (
    <div className="h-full flex-1 min-w-80 md:max-w-xl" ref={divRef}>
      <div className="h-full flex flex-col border overflow-y-auto">
        <div className="flex-none h-10 px-3 flex items-center">
          <span>청첩장 제목입니다</span>
          <div className="ml-auto flex items-center">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
            >
              🚀
            </button>
            <Switch
              checked={isDarkMode}
              onChange={handleToggleColorScheme}
              className={({ checked }) => {
                const base = "relative flex h-6 w-11 items-center rounded-full";

                if (checked) {
                  return `${base} bg-yellow-400`;
                }

                return `${base} bg-yellow-600`;
              }}
            >
              {({ checked }) => (
                <>
                  <span className="sr-only">Dark Mode</span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      checked ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </>
              )}
            </Switch>
          </div>
        </div>

        <StorySection />

        <PostSection />

        <WeddingHallItem weddingHall={WEDDING_HALL} />
      </div>
    </div>
  );
};

export default ViewSection;
