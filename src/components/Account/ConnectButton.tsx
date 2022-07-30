import { Image } from "antd";

const styles = {
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

function ConnectButton({ label, image, onClick }: { label: string; image: string; onClick: () => void }) {
  return (
    <button style={styles.connectButton} key={label} onClick={onClick}>
      <span style={styles.connectButtonText}>{label}</span>
      <Image src={image} width={32} height={32} alt="MetaMask" />
    </button>
  );
}

export default ConnectButton;
