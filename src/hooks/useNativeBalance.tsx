import { useEffect, useState } from "react";

import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";

export const useNativeBalance = (
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  account?: string
): BigNumber | undefined => {
  const [balance, setBalance] = useState<BigNumber | undefined>();

  const fetchBalance = async (account: string) => {
    const res: BigNumber | undefined = await provider?.getBalance(account);
    setBalance(res);
  };

  useEffect(() => {
    if (provider && account?.length) {
      let stale = false;

      if (!stale) {
        fetchBalance(account);
      } else {
        stale = true;
        setBalance(undefined);
      }
    }
    return;
  }, [provider, account]);

  return balance;
};

// export const useNativeBalance = (
//   provider?: ReturnType<Web3ReactHooks["useProvider"]>,
//   accounts?: string[]
// ): BigNumber[] | undefined => {
//   const [balances, setBalances] = useState<BigNumber[] | undefined>();

//   useEffect(() => {
//     if (provider && accounts?.length) {
//       let stale = false;

//       void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
//         if (!stale) {
//           setBalances(balances);
//         }
//       });

//       return () => {
//         stale = true;
//         setBalances(undefined);
//       };
//     }
//     return;
//   }, [provider, accounts]);

//   return balances;
// };
