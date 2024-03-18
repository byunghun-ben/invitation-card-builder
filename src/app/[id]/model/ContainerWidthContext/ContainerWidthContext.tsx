"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ContainerWidthContext = createContext<number>(0);

export const ContainerWidthProvider = (props: { children: ReactNode }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const containerWidth =
        document.querySelector("[data-component=Container]")?.clientWidth || 0;
      setContainerWidth(containerWidth);

      console.log("updateWidth", containerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <ContainerWidthContext.Provider value={containerWidth}>
      {props.children}
    </ContainerWidthContext.Provider>
  );
};

export const useContainerWidth = () => {
  return useContext(ContainerWidthContext);
};
