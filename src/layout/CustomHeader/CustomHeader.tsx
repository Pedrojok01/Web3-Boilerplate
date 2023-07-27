import { FC } from "react";

import { Button, Layout } from "antd";

import dark_mode from "assets/images/dark_mode.png";
import light_mode from "assets/images/light_mode.png";
import web3Boilerplate_logo from "assets/images/web3Boilerplate_logo.png";
import web3Boilerplate_logo_dark from "assets/images/web3Boilerplate_logo_dark.png";
import ConnectAccount from "components/Account/ConnectAccount";
import ChainSelector from "components/ChainSelector";
import { useWindowWidthAndHeight } from "hooks";

const { Header } = Layout;

const styles = {
  header: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: "15px",
    zIndex: 1
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

type CustomHeaderProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomHeader: FC<CustomHeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { isMobile } = useWindowWidthAndHeight();

  const toggleColorMode = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <Header style={{ ...styles.header, padding: isMobile ? "15px 5px 0 5px" : "15px 20px 0 20px" }}>
      <Logo isDarkMode={isDarkMode} />
      <div style={styles.headerRight}>
        <ChainSelector />
        <ConnectAccount />
        <Button
          shape="round"
          ghost
          onClick={toggleColorMode}
          style={{ height: "42px", padding: "5px 7px 0 10px", border: "none" }}
        >
          <img src={isDarkMode ? light_mode : dark_mode} alt="color mode" width="25px" />
        </Button>
      </div>
    </Header>
  );
};

export default CustomHeader;

type LogoProps = {
  isDarkMode: boolean;
};

export const Logo: FC<LogoProps> = ({ isDarkMode }) => {
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <div style={{ paddingTop: isMobile ? "25px" : "40px" }}>
      <img
        src={isDarkMode ? web3Boilerplate_logo_dark : web3Boilerplate_logo}
        alt="web3Boilerplate_logo"
        width={isMobile ? "70px" : "90px"}
      />
    </div>
  );
};
