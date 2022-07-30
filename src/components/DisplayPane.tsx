import { useWeb3React } from "@web3-react/core";
import { Chain } from "./Chain";

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
  text: {
    color: "black",
    fontSize: "20px",
    marginTop: "10px"
  }
} as const;

const DisplayPane = () => {
  const { chainId } = useWeb3React();

  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Panel</div>
      <div style={{ width: "70%", margin: "auto" }}>
        <Chain chainId={chainId} />
      </div>
    </div>
  );
};

export default DisplayPane;
