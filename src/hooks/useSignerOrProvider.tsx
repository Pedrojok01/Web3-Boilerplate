import { useMemo } from "react";

import { useWeb3React } from "@web3-react/core";

export function useSignerOrProvider() {
  const { provider } = useWeb3React();

  return useMemo(() => {
    if (provider?.["getSigner"]) {
      return provider.getSigner();
    } else {
      return provider;
    }
  }, [provider]);
}
