import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { CHAINS } from "data/networks";

const [mainnet, ...optionalChains] = Object.keys(CHAINS).map(Number);

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? "",
        chains: [mainnet],
        optionalChains,
        showQrModal: true,
        metadata: {
          name: "Web3 Boilerplate",
          description:
            "Clean Web3 Boilerplate using the latest stack out there: Typescript ^5, react ^18 (including react-scrits ^5), and @web3-react/core v8. Enjoy!",
          url: "https://web3-boilerplate.netlify.app/",
          icons: ["favicon.ico"]
        }
      }
    })
);
