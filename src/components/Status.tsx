import type { Web3ReactHooks } from "@web3-react/core";

const styles = {
  display: {
    paddingBlock: "15px"
  },
  statusText: {
    color: "rgb(46, 46, 46)",
    fontWeight: 800
  }
} as const;

export function Status({
  isActivating,
  error,
  isActive
}: {
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  error: ReturnType<Web3ReactHooks["useError"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
}) {
  return (
    <div style={styles.display}>
      {error ? (
        <>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
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
}
