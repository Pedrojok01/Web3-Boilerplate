import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

import { URLS } from "../constants/networks";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: URLS,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);
