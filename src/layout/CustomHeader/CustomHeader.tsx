import { FC } from "react";

import { Layout } from "antd";

import web3Boilerplate_logo from "assets/images/web3Boilerplate_logo.png";
import ConnectAccount from "components/Account/ConnectAccount";
import ChainSelector from "components/ChainSelector";
import { useWindowWidthAndHeight } from "hooks";

const { Header } = Layout;

const styles = {
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",
    paddingTop: "15px"
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: "10px",
    fontSize: "15px",
    fontWeight: "600"
  }
} as const;

const CustomHeader: FC = () => {
  return (
    <Header style={{ ...styles.header, justifyContent: "space-between" }}>
      <Logo />
      <div style={styles.headerRight}>
        <ChainSelector />
        <ConnectAccount />
      </div>
    </Header>
  );
};

export default CustomHeader;

export const Logo = () => {
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <>
      {isMobile ? (
        <div style={{ paddingTop: "30px" }}>
          <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width="80px" />;
        </div>
      ) : (
        <div style={{ paddingTop: "45px" }}>
          <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width="120px" />;
        </div>
      )}
    </>
  );
};
