"use client";

import { ReactNode, SVGProps, useEffect, useRef, useState } from "react";

const LeftArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-2 -translate-y-1/2 h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

type Props = {
  children: ReactNode;
};

const HomeBannerList = ({ children }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) {
      return;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = listElement;

      const scrollRight = scrollLeft + clientWidth;

      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollRight < scrollWidth);
    };

    listElement.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[640px] border-b flex items-center justify-center bg-pink-200">
      {/* 왼쪽으로 스크롤하는 버튼 */}
      {showLeftButton && (
        <button
          type="button"
          className="absolute inset-y-0 left-0 z-10 w-1/12 bg-gradient-to-r from-black to-transparent"
          aria-label="scroll left"
          onClick={() => {
            const listElement = listRef.current;

            if (!listElement) {
              return;
            }

            const { clientWidth } = listElement;

            listElement.scrollBy({
              left: -clientWidth,
              behavior: "smooth",
            });
          }}
        >
          <LeftArrowIcon />
        </button>
      )}
      {/* 오른쪽으로 스크롤하는 버튼 */}
      {showRightButton && (
        <button
          type="button"
          className="absolute top-0 right-0 z-10 h-full w-1/12 bg-gradient-to-l from-black to-transparent"
          aria-label="scroll right"
          onClick={() => {
            const listElement = listRef.current;

            if (!listElement) {
              return;
            }

            const { clientWidth } = listElement;

            listElement.scrollBy({
              left: clientWidth,
              behavior: "smooth",
            });
          }}
        >
          <LeftArrowIcon className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 text-white rotate-180" />
        </button>
      )}
      <ul
        className="relative flex h-full w-full overflow-x-scroll snap-x snap-mandatory no-scrollbar scrolling-touch"
        ref={listRef}
      >
        {children}
      </ul>
    </section>
  );
};

export default HomeBannerList;
