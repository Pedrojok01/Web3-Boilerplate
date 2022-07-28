// type Network = {
//   chainId: number,
//   chainName?: string,
//   currencyName?: string,
//   currencySymbol: string,
//   rpcUrl?: string,
//   blockExplorerUrl: string,
//   wrapped?: string
// };

export const networkConfigs = {
  1: {
    chainId: 1,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  },
  3: {
    chainId: 3,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://ropsten.etherscan.io/"
  },
  4: {
    chainId: 4,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://rinkeby.etherscan.io/"
  },
  5: {
    chainId: 5,
    chainName: "Goerli Test Network",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "https://goerli.infura.io/v3/",
    blockExplorerUrl: "https://goerli.etherscan.io"
  },
  43114: {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/"
  },
  56: {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  },
  97: {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/"
  },
  137: {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://polygonscan.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
  },
  80001: {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/"
  },
  49777: {
    chainId: 49777,
    chainName: "Leprichain",
    currencyName: "L3P",
    currencySymbol: "L3P",
    rpcUrl: "https://node.leprichain.blockwell.ai/",
    blockExplorerUrl: "https://explorer.leprichain.blockwell.ai/"
  },
  49778: {
    chainId: 49778,
    chainName: "Leprichain_testnet",
    currencyName: "TL3P",
    currencySymbol: "TL3P",
    rpcUrl: "https://node.lepritest.blockwell.ai",
    blockExplorerUrl: "https://explorer.leprichain.blockwell.ai/"
  }
};

export const getNativeByChain = (chain) => networkConfigs[chain].currencySymbol || "NATIVE";

// export const getNativeByChain = (chain: number) => {
//   const network: Network[] = networkConfigs.filter((network) => network.chainId === chain);
//   console.log("network", network);
//   //return networkConfigs[parseInt(network)].blockExplorerUrl;
// };

export const getChainById = (chain) => networkConfigs[chain].chainId;

//export const getWrappedNative = (chain: number) => networkConfigs[chain].wrapped || null;

export const getExplorer = (chain) => networkConfigs[chain].blockExplorerUrl;

// function returnExplorer(item: Network): string {
//   return item.blockExplorerUrl;
// }
