"use client";

import logger from "@/utils/logger";
import { ReactNode, useEffect, useRef, useState } from "react";

const INTERSECTION_OPTION: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: [0, 0.4, 0.5, 0.6, 0.75, 0.8, 0.85, 1.0],
};

type Props = {
  sectionName: string;
  children: ReactNode;
};

const ViewableSection = ({ sectionName, children }: Props) => {
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const isIntersecting = entries.some(entry => {
        logger.log("isIntersecting", sectionName, entry.intersectionRatio);
        return entry.intersectionRatio > 0;
      });
      setIsInView(isIntersecting);
    }, INTERSECTION_OPTION);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionName]);

  return (
    <div
      ref={sectionRef}
      className={`shrink-0 flex flex-col items-center transition bg-white ${isInView ? "opacity-100 translate-y-0" : "opacity-0"}`}
      aria-label={sectionName}
    >
      <div className="flex flex-col items-center justify-center px-10">
        {children}
      </div>
    </div>
  );
};

export default ViewableSection;
