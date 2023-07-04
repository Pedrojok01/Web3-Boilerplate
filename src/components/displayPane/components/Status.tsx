import type { Web3ReactHooks } from "@web3-react/core";

import { theme } from "styles/theme";

const styles = {
  display: {
    paddingBlock: "15px"
  },
  statusText: {
    color: theme.colors.text,
    fontWeight: 800
  }
} as const;

const Status = ({
  isActivating,
  isActive
}: {
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) => {
  return (
    <div style={styles.display}>
      {isActivating ? (
        <>
          Account status: <span style={styles.statusText}>🟡 Connecting</span>
        </>
      ) : isActive ? (
        <>
          Account status: <span style={styles.statusText}>🟢 Connected</span>
        </>
      ) : (
        <>
          Account status: <span style={styles.statusText}>⚪️ Disconnected</span>
        </>
      )}
    </div>
  );
};

export default Status;
