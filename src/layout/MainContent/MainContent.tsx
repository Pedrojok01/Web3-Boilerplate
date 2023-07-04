import { FC } from "react";

import { theme } from "styles/theme";

type MainContentProps = {
  children?: React.ReactNode;
};

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: theme.colors.text,
    marginTop: "100px",
    padding: "10px",
    overflow: "auto"
  }
} as const;

const MainContent: FC<MainContentProps> = ({ children }) => {
  return <div style={styles.content}>{children}</div>;
};

export default MainContent;
