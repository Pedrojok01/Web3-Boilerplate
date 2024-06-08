// chainData.ts
import arbitrum_Logo from "assets/images/arbitrum_Logo.png";
import ethereum_Logo from "assets/images/ethereum_Logo.png";
import fantom_Logo from "assets/images/fantom_Logo.png";
import polygon_logo from "assets/images/polygon_logo.png";
import zksync_Logo from "assets/images/zksync_Logo.png";
import bsc_Logo from "assets/svg/bsc_Logo.svg";
import optimistim_Logo from "assets/svg/optimistim_Logo.svg";

export const chainData = [
  { label: "Ethereum", id: "1", logo: ethereum_Logo },
  { label: "Sepolia Testnet", id: "11155111", logo: ethereum_Logo },
  { label: "Optimism", id: "10", logo: optimistim_Logo },
  { label: "Optimism Goerli", id: "420", logo: optimistim_Logo },
  { label: "Arbitrum", id: "42161", logo: arbitrum_Logo },
  { label: "Arbitrum Testnet", id: "421614", logo: arbitrum_Logo },
  { label: "zkSync Era", id: "324", logo: zksync_Logo },
  { label: "zkSync Testnet", id: "280", logo: zksync_Logo },
  { label: "Polygon", id: "137", logo: polygon_logo },
  { label: "Mumbai", id: "80001", logo: polygon_logo },
  { label: "Fantom", id: "250", logo: fantom_Logo },
  { label: "Fantom Testnet", id: "4002", logo: fantom_Logo },
  { label: "BNB Chain", id: "56", logo: bsc_Logo },
  { label: "BNB Testnet", id: "97", logo: bsc_Logo }
];
