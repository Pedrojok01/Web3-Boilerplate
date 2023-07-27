import { FC } from "react";

import { Button, Typography } from "antd";
const { Text } = Typography;

const styles = {
  connectButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBlock: "20px",
    marginBottom: "12px",
    boxShadow: "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #fff",
    border: "none",
    borderRadius: "10px"
  },
  connectButtonText: {
    fontWeight: "600",
    paddingLeft: "30px"
  }
} as const;

interface ConnectButtonProps {
  label: string;
  image: string;
  onClick: () => void;
  loading: boolean;
}

const ConnectButton: FC<ConnectButtonProps> = ({ label, image, onClick, loading }) => {
  return (
    <Button
      ghost
      className="connector-button"
      style={styles.connectButton}
      key={label}
      onClick={onClick}
      loading={loading}
    >
      <Text style={styles.connectButtonText}>{label}</Text>
      <img src={image} width={32} height={32} alt="web3-wallet" />
    </Button>
  );
};

export default ConnectButton;
