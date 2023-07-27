import { FC } from "react";

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
  }
} as const;

const MainContent: FC<MainContentProps> = ({ children }) => {
  return <div style={styles.content}>{children}</div>;
};

export default MainContent;
