import { SelectOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Button, Card, Modal } from "antd";

import { getExplorer } from "data/networks";

import Address from "./Address";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disconnect: () => Promise<void>;
}

const DisconnectModal: React.FC<ConnectModalProps> = ({ isModalOpen, setIsModalOpen, disconnect }) => {
  const { account, chainId } = useWeb3React();

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
      bodyStyle={{
        width: "350px",
        padding: "15px",
        fontSize: "17px",
        fontWeight: "500"
      }}
    >
      Account
      <Card
        style={{
          marginTop: "10px",
          borderRadius: "10px"
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
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "500"
        }}
        onClick={() => disconnect()}
      >
        Disconnect Wallet
      </Button>
    </Modal>
  );
};

export default DisconnectModal;
