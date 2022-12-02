const styles = {
  connectButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBlock: "5px",
    marginBottom: "12px",
    boxShadow: "0 4px 4px rgba(0,0,0,.25),0 0 5px rgba(0,0,0,.25),inset 0 0 10px #fff"
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
      <img src={image} width={32} height={32} alt="MetaMask" />
    </button>
  );
}

export default ConnectButton;
