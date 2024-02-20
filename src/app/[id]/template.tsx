"use client";

import useFullHeight from "@/hooks/useFullHeight";
import { ReactNode, useRef } from "react";

const InstaViewTemplate = (props: { children: ReactNode }) => {
  const templateRef = useRef<HTMLDivElement>(null);
  useFullHeight({ divRef: templateRef });

  return (
    <div
      data-component="InstaViewTemplate"
      ref={templateRef}
      className="border overflow-y-scroll no-scrollbar"
    >
      {props.children}
    </div>
  );
};

export default InstaViewTemplate;
