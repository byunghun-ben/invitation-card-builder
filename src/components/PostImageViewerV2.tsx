/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

"use client";

import { InstaImage } from "@/schemas/instaTemplate";
import Image from "next/image";
import { MouseEvent, useCallback, useRef, useState } from "react";

type Props = {
  images: InstaImage[];
};

const PostImageViewerV2 = ({ images }: Props) => {
  const imageContainerRef = useRef<HTMLUListElement>(null);

  // MouseDrag Scroll
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) {
      return;
    }

    setIsMouseDown(true);
    setStartX(e.pageX - imageContainer.offsetLeft);
    setScrollLeft(imageContainer.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault(); // Prevent text selection

      const imageContainer = imageContainerRef.current;

      if (!isMouseDown || !imageContainer) {
        return;
      }

      const endX = e.pageX - imageContainer.offsetLeft;
      const SCROLL_SPEED = 3;
      const distance = (endX - startX) * SCROLL_SPEED;

      imageContainer.scrollLeft = scrollLeft - distance;
    },
    [isMouseDown, scrollLeft, startX],
  );
  // MouseDrag Scroll

  return (
    <div className="relative">
      <div className="w-full" style={{ paddingBottom: "100%" }} />
      <div className="absolute inset-0">
        <div className="w-full h-full relative overflow-hidden">
          <ul
            className="flex bg-yellow-50 h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar scrolling-touch"
            ref={imageContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {images.map(image => (
              <li
                key={image.id}
                className="relative flex-none h-full w-full snap-start"
              >
                <Image
                  src={image.url}
                  alt="이미지"
                  className="object-cover h-full w-full"
                  fill
                  sizes="573px"
                  draggable
                  priority
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostImageViewerV2;
