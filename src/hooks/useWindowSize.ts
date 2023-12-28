import { useEffect, useState } from "react";

import { theme } from "styles/theme";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobile = windowSize.width <= theme.breakpoints.small;
  const isTablet = windowSize.width <= theme.breakpoints.medium;
  const isSmallScreen = windowSize.width <= theme.breakpoints.large;

  return { ...windowSize, isMobile, isTablet, isSmallScreen };
};
