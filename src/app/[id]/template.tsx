"use client";

import useFullHeight from "@/hooks/useFullHeight";
import { ReactNode, useRef } from "react";
import { ContainerWidthProvider } from "./model/ContainerWidthContext/ContainerWidthContext";

const InstaViewTemplate = (props: { children: ReactNode }) => {
  const templateRef = useRef<HTMLDivElement>(null);
  useFullHeight({ divRef: templateRef });

  return (
    <div
      data-component="Container"
      ref={templateRef}
      className="relative border overflow-y-scroll no-scrollbar"
    >
      <ContainerWidthProvider>{props.children}</ContainerWidthProvider>
    </div>
  );
};

export default InstaViewTemplate;
