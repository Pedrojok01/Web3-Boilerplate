import React from "react";
import ReactDOM from "react-dom/client";
import { Web3ReactProvider } from "@web3-react/core";
import connectors from "./connectors";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
