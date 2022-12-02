import { useWeb3React, Web3ReactHooks } from "@web3-react/core";

import { CHAINS } from "../../../constants/networks";
import { useNativeBalance } from "../../../hooks/useNativeBalance";
import { useWindowWidthAndHeight } from "../../../hooks/useWindowWidthAndHeight";
import { getEllipsisTxt, parseBigNumberToFloat } from "../../../utils/formatters";

const styles = {
  display: {
    paddingBlock: "15px"
  },
  statusText: {
    color: "rgb(46, 46, 46)",
    fontWeight: 800
  }
} as const;

const Infos = ({ chainId }: { chainId: ReturnType<Web3ReactHooks["useChainId"]> }) => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const [width] = useWindowWidthAndHeight();
  const isMobile = width <= 768;

  if (chainId === undefined) return null;
  const name = chainId ? CHAINS[chainId]?.name : undefined;

  return (
    <div style={styles.display}>
      Address:
      {!isMobile ? (
        <span style={styles.statusText}>{account}</span>
      ) : (
        <span style={styles.statusText}>{account && getEllipsisTxt(account, 4)}</span>
      )}
      <br></br>
      <br></br>
      {name ? (
        <>
          Chain:{" "}
          <span style={styles.statusText}>
            {name} ({chainId})
          </span>
        </>
      ) : (
        <>
          Chain Id: <b>{chainId}</b>
        </>
      )}
      <br></br>
      <br></br>
      Balance:
      <span style={styles.statusText}>
        {balance
          ? `
          Ξ ${parseBigNumberToFloat(balance).toFixed(4)}`
          : 0}
      </span>
    </div>
  );
};

export default Infos;
