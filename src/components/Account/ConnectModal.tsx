import { useCallback } from "react";

import { Modal, Divider, message } from "antd";

import coinbase_Logo from "assets/images/coinbase_Logo.png";
import metamask_Logo from "assets/svg/metamask_Logo.svg";
import walletconnect_Logo from "assets/svg/walletconnect_Logo.svg";
import { hooks as coinbaseWallethooks, coinbaseWallet } from "connectors/coinbaseWallet";
import { getName } from "connectors/getConnectorName";
import { hooks as metaMaskhooks, metaMask } from "connectors/metaMask";
import { hooks as walletConnecthooks, walletConnect } from "connectors/walletConnect";

import ConnectButton from "./ConnectButton";

const styles = {
  modalTitle: {
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px"
  }
} as const;

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const { useIsActivating: useMMIsActivating } = metaMaskhooks;
const { useIsActivating: useWCIsActivating } = walletConnecthooks;
const { useIsActivating: useCBIsActivating } = coinbaseWallethooks;

const ConnectModal: React.FC<ConnectModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const isMMActivating = useMMIsActivating();
  const isWCActivating = useWCIsActivating();
  const isCBActivating = useCBIsActivating();

  const activateConnector = useCallback(async (label: string) => {
    try {
      switch (label) {
        case "MetaMask":
          await metaMask.activate();
          window.localStorage.setItem("connectorId", getName(metaMask));
          break;

        case "WalletConnect":
          await walletConnect.activate();
          window.localStorage.setItem("connectorId", getName(walletConnect));
          break;

        case "Coinbase Wallet":
          await coinbaseWallet.activate();
          window.localStorage.setItem("connectorId", getName(coinbaseWallet));
          break;

        default:
          break;
      }
    } catch (error) {
      message.error("Failed to connect wallet. Please try again.");
    }
  }, []);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
      bodyStyle={{
        width: "300px",
        margin: "auto",
        padding: "15px",
        fontSize: "17px",
        fontWeight: "500",
        zIndex: 50
      }}
    >
      <div style={styles.modalTitle}>Connect Your Wallet</div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <ConnectButton
          label="MetaMask"
          image={metamask_Logo}
          onClick={() => activateConnector("MetaMask")}
          loading={isMMActivating}
        />

        <ConnectButton
          label="WalletConnect"
          image={walletconnect_Logo}
          onClick={() => activateConnector("WalletConnect")}
          loading={isWCActivating}
        />

        <ConnectButton
          label="Coinbase Wallet"
          image={coinbase_Logo}
          onClick={() => activateConnector("Coinbase Wallet")}
          loading={isCBActivating}
        />
        <Divider />
        <div style={{ margin: "auto", fontSize: "15px", marginBottom: "15px" }}>
          Need help installing a wallet?{" "}
          <a
            href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
            target="_blank"
            rel="noopener"
          >
            Click here
          </a>
        </div>

        <div style={{ margin: "auto", fontSize: "10px" }}>
          Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your access
          to the wallet might be reliant on the External Provider being operational.
        </div>
      </div>
    </Modal>
  );
};

export default ConnectModal;
