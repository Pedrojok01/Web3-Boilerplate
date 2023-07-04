import { Layout } from "antd";

import background from "assets/images/background.jpg";
import DisplayPane from "components/displayPane/DisplayPane";
import { CustomHeader, MainContent, CustomFooter } from "layout";
import "styles/App.css";

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
  }
} as const;

function App() {
  return (
    <Layout style={styles.layout}>
      <CustomHeader />

      <MainContent>
        <DisplayPane />
      </MainContent>

      <CustomFooter />
    </Layout>
  );
}

export default App;
