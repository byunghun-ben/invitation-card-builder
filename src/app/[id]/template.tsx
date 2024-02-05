"use client";

import { ReactNode, useRef } from "react";
import useFullHeight from "./ViewSection/useFullHeight";

const InstaViewTemplate = (props: { children: ReactNode }) => {
  const templateRef = useRef<HTMLDivElement>(null);
  useFullHeight({ divRef: templateRef });

  return (
    <div
      data-component="InstaViewTemplate"
      ref={templateRef}
      className="border overflow-y-scroll"
    >
      {props.children}
    </div>
  );
};

export default InstaViewTemplate;
