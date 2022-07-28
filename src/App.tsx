import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import ConnectAccount from "./components/Account/ConnectAccount";
import { Chains } from "./components/Chains";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import background from "./assets/background.jpg";
import ultranova_logo from "./assets/ultranova_logo.png";
import AdminPane from "./components/AdminPane";

const { Header } = Layout;

const styles = {
  layout: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    fontFamily: "Sora, sans-serif"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#041836",
    marginTop: "100px",
    padding: "10px",
    overflow: "auto"
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: "10px",
    fontSize: "15px",
    fontWeight: "600"
  },
  adminButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
    borderRadius: "25px",
    width: "100px",
    height: "40px"
  }
} as const;

function App() {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  console.log(etherBalance);

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          <Chains />
          <ConnectAccount />
        </div>
      </Header>

      <div style={styles.content}>
        <AdminPane />
        {etherBalance && (
          <div className="balance">
            <br />
            Balance:
            <p className="bold">{formatEther(etherBalance)}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const Logo = () => <img src={ultranova_logo} alt="ultranova_logo" width="180px" />;

export default App;
