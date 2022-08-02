import { Buffer } from "buffer";
import ConnectAccount from "./components/Account/ConnectAccount";
import DisplayPane from "./components/displayPane/DisplayPane";
import background from "./assets/images/background.jpg";
import web3Boilerplate_logo from "./assets/images/web3Boilerplate_logo.png";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import ChainSelector from "./components/ChainSelector";

const { Header, Footer } = Layout;

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
    padding: "0px 20px",
    paddingTop: "15px"
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
  },
  footer: {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    color: "white",
    backgroundColor: "transparent"
  }
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          <ChainSelector />
          <ConnectAccount />
        </div>
      </Header>
      <div style={styles.content}>
        <DisplayPane />
      </div>

      <Footer style={styles.footer}>
        <div style={{ display: "block" }}>
          Please leave a ⭐️ on this{" "}
          <a href="https://github.com/Pedrojok01/Web3-Boilerplate" target="_blank" rel="noopener noreferrer">
            boilerplate
          </a>
          , if you like it!
        </div>
      </Footer>
    </Layout>
  );
}

export const Logo = () => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <img src={web3Boilerplate_logo} alt="web3Boilerplate_logo" width="120px" />;
    </div>
  );
};

export default App;
