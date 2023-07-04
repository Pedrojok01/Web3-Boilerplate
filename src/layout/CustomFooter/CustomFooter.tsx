import { FC } from "react";

import { Layout } from "antd";

import { theme } from "styles/theme";

const { Footer } = Layout;

const styles = {
  footer: {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    color: theme.colors.white,
    backgroundColor: "transparent"
  }
} as const;

const CustomFooter: FC = () => {
  return (
    <Footer style={styles.footer}>
      Please, leave a ⭐️ on this{" "}
      <a href="https://github.com/Pedrojok01/Web3-Boilerplate" target="_blank" rel="noopener noreferrer">
        boilerplate
      </a>{" "}
      if you like it!
    </Footer>
  );
};

export default CustomFooter;
