import { FC } from "react";

import { useWindowSize } from "hooks";

type MainContentProps = {
  children?: React.ReactNode;
};

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "100px",
    padding: "50px",
    overflow: "auto"
  },
  contentMobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "100px",
    padding: "30px 0",
    overflow: "hidden"
  }
} as const;

const MainContent: FC<MainContentProps> = ({ children }) => {
  const { isTablet } = useWindowSize();

  return <div style={isTablet ? styles.contentMobile : styles.content}>{children}</div>;
};

export default MainContent;
