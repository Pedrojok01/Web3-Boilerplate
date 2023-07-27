import { useWeb3React, Web3ReactHooks } from "@web3-react/core";
import { Typography } from "antd";
const { Paragraph } = Typography;

import { CHAINS } from "data/networks";
import { useNativeBalance, useWindowWidthAndHeight } from "hooks";
import { getEllipsisTxt, parseBigNumberToFloat } from "utils/formatters";

const styles = {
  display: {
    paddingBlock: "0 15px",
    display: "flex",
    flexDirection: "column"
  },
  statusText: {
    fontSize: "17px"
  },
  statusValue: {
    fontWeight: 800
  }
} as const;

const Infos = ({ chainId }: { chainId: ReturnType<Web3ReactHooks["useChainId"]> }) => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const { isMobile } = useWindowWidthAndHeight();

  if (chainId === undefined) return null;
  const name = chainId ? CHAINS[chainId]?.name : undefined;

  return (
    <Typography style={styles.display}>
      <Paragraph style={styles.statusText}>
        Address:{" "}
        {!isMobile ? (
          <span style={styles.statusValue}>{account}</span>
        ) : (
          <span style={styles.statusValue}>{account && getEllipsisTxt(account, 4)}</span>
        )}
      </Paragraph>

      <Paragraph style={styles.statusText}>
        {name ? (
          <>
            Chain:{" "}
            <span style={styles.statusValue}>
              {name} ({chainId})
            </span>
          </>
        ) : (
          <>
            Chain Id: <b>{chainId}</b>
          </>
        )}
      </Paragraph>

      <Paragraph style={styles.statusText}>
        Balance:
        <span style={styles.statusValue}>
          {balance
            ? `
          Ξ ${parseBigNumberToFloat(balance).toFixed(4)}`
            : 0}
        </span>
      </Paragraph>
    </Typography>
  );
};

export default Infos;
