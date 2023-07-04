import { useEffect, useState } from "react";

import { theme } from "styles/theme";

export const useWindowWidthAndHeight = () => {
  const windowInnerSize = [window.innerWidth, window.innerHeight];
  const [windowSize, setWidowSize] = useState<number[]>(windowInnerSize);

  useEffect(() => {
    const changeWindowSize = () => {
      setWidowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobile = windowSize[0] <= theme.breakpoints.medium;

  return { isMobile, windowSize };
};
