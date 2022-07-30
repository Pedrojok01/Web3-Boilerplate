import { useWeb3React } from "@web3-react/core";
import { Buffer } from "buffer";
import ConnectAccount from "./components/Account/ConnectAccount";
import { Chain } from "./components/Chain";
import AdminPane from "./components/AdminPane";
import background from "./assets/images/background.jpg";
import ultranova_logo from "./assets/images/ultranova_logo.png";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";

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
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#041836",
    marginTop: "100px",
    padding: "10px",
    overflow: "auto"
  }
} as const;

function App() {
  const { chainId } = useWeb3React();

  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          <ConnectAccount desiredChain={1} />
        </div>
      </Header>

      <div style={styles.content}>
        <Chain chainId={chainId} />
        <AdminPane />
      </div>
    </Layout>
  );
}

export const Logo = () => <img src={ultranova_logo} alt="ultranova_logo" width="180px" />;

export default App;
