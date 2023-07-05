import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import type { Connector } from "@web3-react/types";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnectV2) return "WalletConnect";
  if (connector instanceof CoinbaseWallet) return "Coinbase Wallet";
  if (connector instanceof Network) return "Network";
  return "Unknown";
}
