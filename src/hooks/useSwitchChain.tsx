import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";

import { getAddChainParameters } from "../constants/networks";

export function useSwitchChain() {
  const { connector } = useWeb3React();

  const switchChain = async (desiredChain: number) => {
    if (connector instanceof WalletConnect || connector instanceof Network) {
      await connector.activate(desiredChain === -1 ? undefined : desiredChain);
    } else {
      await connector.activate(desiredChain === -1 ? undefined : getAddChainParameters(desiredChain));
    }
  };

  return switchChain;
}
