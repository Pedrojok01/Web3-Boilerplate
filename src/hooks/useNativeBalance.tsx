import { useEffect, useState } from "react";

import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";

export const useNativeBalance = (
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  account?: string
): BigNumber | undefined => {
  const [balance, setBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (provider && account?.length) {
      const fetchBalance = async (account: string) => {
        const res: BigNumber | undefined = await provider?.getBalance(account);
        setBalance(res);
      };

      fetchBalance(account);
    }
  }, [provider, account]);

  return balance;
};
