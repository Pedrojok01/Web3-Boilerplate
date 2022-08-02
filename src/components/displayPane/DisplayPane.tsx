import { useWeb3React } from "@web3-react/core";
import { Divider } from "antd";
import { Infos } from "./components/Infos";
import { SignMessage } from "./components/SignMessage";
import { Status } from "./components/Status";
import { TransferEth } from "./components/TransferEth";

const styles = {
  container: {
    background: "#f5f4f4",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "20px"
  },
  title: {
    color: "black",
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "17px"
  }
} as const;

const DisplayPane = () => {
  const { chainId, isActivating, error, isActive } = useWeb3React();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Display Info</div>
      <div style={styles.content}>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <Infos chainId={chainId} />

        {isActive && (
          <>
            <Divider />
            <div style={{ display: "inline-flex", gap: "20px" }}>
              <SignMessage />
              <Divider type="vertical" style={{ fontSize: "120px !important" }} />
              <TransferEth />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayPane;
