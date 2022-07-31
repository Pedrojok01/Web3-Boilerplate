import { useEffect, useState } from "react";
import type { Web3ReactHooks } from "@web3-react/core";
import type { BigNumber } from "@ethersproject/bignumber";

export const useNativeBalance = (
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): BigNumber[] | undefined => {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
    return;
  }, [provider, accounts]);

  return balances;
};
