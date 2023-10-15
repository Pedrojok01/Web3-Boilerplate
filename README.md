<div align="center">
<h1><strong> Web3 Boilerplate </strong></h1>

[![Stargazers](https://img.shields.io/github/stars/Pedrojok01/Web3-Boilerplate)](https://github.com/Pedrojok01/Web3-Boilerplate/stargazers)
[![Forks](https://img.shields.io/github/forks/Pedrojok01/Web3-Boilerplate)](https://github.com/Pedrojok01/Web3-Boilerplate/issues)
[![Issues](https://img.shields.io/github/issues/Pedrojok01/Web3-Boilerplate)](https://github.com/Pedrojok01/Web3-Boilerplate/issues)
[![MIT License](https://img.shields.io/github/license/Pedrojok01/Web3-Boilerplate)](https://github.com/Pedrojok01/Web3-Boilerplate/blob/main/License)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue)](https://www.linkedin.com/in/pierre-e/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3c3b76de-6191-4ab2-b2c6-a5d824f6fe2f/deploy-status)](https://app.netlify.com/sites/web3-boilerplate/deploys)

<br></br>

![Preview](./src/assets/images/preview.gif)

</div>

## Update:

2023-10:

- Upgrade all packages dependencies (except ethers);
- Improve useToken hook to fetch any ERC20 token balance/allowance/decimals/symbol;
- Fix minor responsive issues;

2023-07:

- Upgrade all packages dependencies;
- Add support for Wallet-Connect v2;
- Clean code & folders structure;
- Improve code readability.
- Add dark mode support
- Add support for: Optimism, Arbitrum, zkSync & Fantom networks

## Disclaimer

1. Work in progress...
2. No Typescript expert and no React expert either, so any contribution/improvement pull-request is welcomed!

## Description

Simple and minimalist Web3 boilerplate to boost your Dapp development. Don't waste time setting up CRA, Typescript, react-script v5 polyfill, and connecting metamask and other wallets any longer. Instead, get this web3-boilerplate and start coding right away with the latest stack available out there!

Try it yourself: [https://web3-boilerplate.netlify.app/](https://web3-boilerplate.netlify.app/)

## Built With

- [![React][react.js]][react-url]
- [![typescript]][typescript-url]
- [![AntDesign]][antdesign-url]
- [![web3react]][web3react-url]
- [![prettier]][prettier-url]
- [![ESLint]][eslint-url]

## Installation

### Make sure you have the following ready:

- [node.js](https://nodejs.org/) installed (developped on LTS v18)
- [typescript](https://www.typescriptlang.org/) installed (developped on v5.2.2)
- [yarn](https://yarnpkg.com/) installed
- [MetaMask](https://metamask.io/) (or any web3 compatible wallet) installed in your browser

### Once your config is ready, create a new repo, open your favorite code editor, and clone the repo with the following cmd:

```bash
git clone https://github.com/Pedrojok01/Web3-Boilerplate.git .
```

### Install all package dependancies by running:

```bash
yarn install
```

<b>IMPORTANT: Double check your package.json to make sure you've installed the exact same version for all @web3-react packages. Since the version 8+ is still in beta, it may not be automatically installed.</b>

### Add your API keys in the .env file:

Create a .env file at the root of your project and copy the content of the .env.example file into it. Then, fill in the following variables:

```js
REACT_APP_INFURA_KEY = "your API key here";
...
REACT_APP_WALLETCONNECT_PROJECT_ID = "Project id needed for WalletConnect v2";
```

### start the web3-boilerplate:

```bash
yarn start
```

## Features:

- [x] Web3 Wallet (Metamask / Wallet connect / Coinbase)
- [x] Chain selector
- [x] Wallet balance
- [x] Sign Messages & Transfer Native
- [x] Dark mode support
- [x] Hook to query user's Token Balances
- [ ] Hook to query user's NFTs

<br></br>

<div align="center">
<h2> Enjoy!!!</h2>

### ⭐️ ... and don't forget to leave a star if you like it! ⭐️

</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React_v18.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/typescript_v5.2.2-375BD2?style=for-the-badge&logo=typescript&logoColor=61DAFB
[typescript-url]: https://www.typescriptlang.org/
[web3react]: https://img.shields.io/badge/@web3react_v8.2-006600?style=for-the-badge&logo=web3-react&logoColor=4FC08D
[web3react-url]: https://github.com/Uniswap/web3react#readme
[antdesign]: https://img.shields.io/badge/AntDesign_v5.10.0-FF0000?style=for-the-badge&logo=AntDesign&logoColor=61DAFB
[antdesign-url]: https://ant.design/
[prettier]: https://img.shields.io/badge/Prettier-360D3A?style=for-the-badge&logo=Prettier&logoColor=61DAFB
[prettier-url]: https://prettier.io/
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=61DAFB
[eslint-url]: https://eslint.org/
