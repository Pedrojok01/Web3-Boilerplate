import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Blockie from "../Blockie";
import Address from "../Address/Address";
import { getEllipsisTxt } from "../../utils/formatters";
import { getExplorer } from "../../utils/networks";
import { metaMask } from "../../connectors/metaMask";
import { walletConnect } from "../../connectors/walletConnect";
import { getAddChainParameters } from "../../constants/chains";
import { Button, Card, Divider, Image, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import metamask_Logo from "../../assets/svg/metamask_Logo.svg";
import walletconnect_Logo from "../../assets/svg/walletconnect_Logo.svg";
import coinbase_Logo from "../../assets/images/coinbase_Logo.png";
import { coinbaseWallet } from "../../connectors/coinbaseWallet";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "black",
    cursor: "pointer"
  },
  button: {
    height: "40px",
    padding: "0 20px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.2px",
    fontSize: "15px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white"
  },
  text: {
    color: "white"
  },
  modalTitle: {
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px"
  },
  connectButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBlock: "5px",
    marginBottom: "10px"
  },
  connectButtonText: {
    fontWeight: "600",
    paddingLeft: "30px"
  }
} as const;

const ConnectAccount = ({ desiredChain }: { desiredChain: number }) => {
  const { account, chainId } = useWeb3React();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const disconnect = async () => {
    const connector = metaMask || walletConnect;
    setIsModalVisible(false);
    setIsAuthModalOpen(false);
    localStorage.removeItem("connectorId");
    if (connector.deactivate) {
      connector.deactivate();
    } else {
      // @ts-expect-error close can be returned by wallet
      connector.resetState();
    }
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      await connector.close();
    }
  };

  return (
    <>
      {account === undefined ? (
        <div>
          <Button shape="round" type="primary" style={styles.button} onClick={() => setIsAuthModalOpen(true)}>
            Connect Wallet
          </Button>

          <Modal
            visible={isAuthModalOpen}
            footer={null}
            onCancel={() => setIsAuthModalOpen(false)}
            bodyStyle={{
              width: "350px",
              margin: "auto",
              padding: "15px",
              fontSize: "17px",
              fontWeight: "500"
            }}
          >
            <div style={styles.modalTitle}>Connect Your Wallet</div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <ConnectButton
                label="MetaMask"
                image={metamask_Logo}
                onClick={async () => {
                  await metaMask.activate(getAddChainParameters(desiredChain));
                  window.localStorage.setItem("connectorId", "injected");
                }}
              />

              <ConnectButton
                label="WalletConnect"
                image={walletconnect_Logo}
                onClick={async () => {
                  await walletConnect.activate();
                  window.localStorage.setItem("connectorId", "wallet_connect");
                }}
              />

              <ConnectButton
                label="Coinbase Wallet"
                image={coinbase_Logo}
                onClick={async () => {
                  await coinbaseWallet.activate(getAddChainParameters(desiredChain));
                  window.localStorage.setItem("connectorId", "injected");
                }}
              />
              <Divider />
              <div style={{ margin: "auto", fontSize: "15px", marginBottom: "15px" }}>
                Need help connecting a wallet?{" "}
                <a href="https://docs.aave.com/faq/troubleshooting" target="_blank" rel="noopener">
                  Read our FAQ
                </a>
              </div>

              <div style={{ margin: "auto", fontSize: "10px" }}>
                Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
                access to the wallet might be reliant on the External Provider being operational.
              </div>
            </div>
          </Modal>

          <br />
        </div>
      ) : (
        <>
          <div style={styles.account} onClick={() => setIsModalVisible(true)}>
            {account && typeof account === "string" && (
              <p style={{ marginRight: "5px", paddingTop: "17px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>
            )}
            <Blockie seed={account} scale={3} />
          </div>

          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
            bodyStyle={{
              width: "400px",
              padding: "15px",
              fontSize: "17px",
              fontWeight: "500"
            }}
            // style={{ fontSize: "16px", fontWeight: "500" }}
            // width="400px"
          >
            Account
            <Card
              style={{
                marginTop: "10px",
                borderRadius: "1rem"
              }}
              bodyStyle={{ padding: "15px" }}
            >
              <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
              <div style={{ marginTop: "10px", padding: "0 10px" }}>
                {chainId !== undefined && (
                  <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
                    <SelectOutlined style={{ marginRight: "5px" }} />
                    View on Explorer
                  </a>
                )}
              </div>
            </Card>
            <Button
              size="large"
              type="primary"
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "0.5rem",
                fontSize: "16px",
                fontWeight: "500"
              }}
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </Button>
          </Modal>
        </>
      )}
    </>
  );
};

function ConnectButton({ label, image, onClick }: { label: string; image: string; onClick: () => void }) {
  return (
    <button style={styles.connectButton} key={label} onClick={onClick}>
      <span style={styles.connectButtonText}>{label}</span>
      <Image src={image} width={32} height={32} alt="MetaMask" />
    </button>
  );
}

export default ConnectAccount;
