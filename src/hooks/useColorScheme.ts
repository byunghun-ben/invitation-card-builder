import { useCallback, useEffect, useState } from "react";

export const useToggleColorScheme = () => {
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

  return { isDarkMode, handleToggleColorScheme };
};
