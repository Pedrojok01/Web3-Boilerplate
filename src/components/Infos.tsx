import { useWeb3React, Web3ReactHooks } from "@web3-react/core";
import { CHAINS } from "../constants/networks";

const styles = {
  display: {
    paddingBlock: "15px"
  },
  statusText: {
    color: "rgb(46, 46, 46)",
    fontWeight: 800
  }
} as const;

export function Infos({ chainId }: { chainId: ReturnType<Web3ReactHooks["useChainId"]> }) {
  const { account } = useWeb3React();
  if (chainId === undefined) return null;

  const name = chainId ? CHAINS[chainId]?.name : undefined;

  return (
    <div style={styles.display}>
      Address: <span style={styles.statusText}>{account}</span>
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
    </div>
  );
}
