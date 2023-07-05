import { useWeb3React } from "@web3-react/core";
import { Divider } from "antd";

import { useWindowWidthAndHeight } from "hooks";
import { theme } from "styles/theme";

import { Infos, SignMessage, Status, TransferEth } from "./components";

const styles = {
  container: {
    background: theme.colors.background,
    width: "80%",
    minWidth: "330px",
    maxWidth: "900px",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "10px",
    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)"
  },
  title: {
    color: theme.colors.black,
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "17px"
  },
  action: {
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }
} as const;

const DisplayPane: React.FC = () => {
  const { chainId, isActivating, isActive } = useWeb3React();
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Display Info</div>
      <div style={styles.content}>
        <Status isActivating={isActivating} isActive={isActive} />
        <Infos chainId={chainId} />

        {isActive && (
          <>
            <Divider />
            <div style={styles.action}>
              <SignMessage />
              {!isMobile && <Divider type="vertical" style={{ fontSize: "120px !important" }} />}
              <TransferEth />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayPane;
