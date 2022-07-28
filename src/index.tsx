import React from "react";
import ReactDOM from "react-dom/client";
import { DAppProvider, BSC, BSCTestnet } from "@usedapp/core";
// import { getDefaultProvider } from "ethers";
import "./index.css";
import App from "./App";

// const config = {
//   readOnlyChainId: Mainnet.chainId,
//   readOnlyUrls: {
//     [Mainnet.chainId]: getDefaultProvider("mainnet")
//   }
// };

const config = {
  networks: [BSC, BSCTestnet],
  // readOnlyUrls: { [BSC.chainId]: getDefaultProvider("bsc"), [BSCTestnet.chainId]: getDefaultProvider("bsctestnet") };
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000
  }
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);
