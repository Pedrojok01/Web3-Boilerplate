import { BigNumber } from "ethers";
import useSWR from "swr";

import GenericERC20Abi from "data/abi/GenericERC20.json";
import { GenericERC20 } from "data/abi/types";
import { parseBigNumberToFloat } from "utils/formatters";

import { useContract } from "./useContract";

export const useToken = (address: string) => {
  const contract = useContract<GenericERC20>(address, GenericERC20Abi);

  const fetcher = async (args: string[]) => {
    const [, method, ...rest] = args;
    if (!contract) throw new Error("Contract not initialized");
    const contractMethod = (contract as any)[method];
    if (!contractMethod || typeof contractMethod !== "function")
      throw new Error(`Method ${method} not found on contract`);
    try {
      return await contractMethod(...rest);
    } catch (error) {
      console.error(`Error fetching ${method}:`, error);
      throw error;
    }
  };

  const { data: decimals } = useSWR(contract ? ["decimals", "decimals"] : null, fetcher);
  const { data: name } = useSWR(contract ? ["name", "name"] : null, fetcher);

  const useAllowance = (spender: string, owner: string) => {
    const key = `allowance/${spender}/${owner}`;
    const { data } = useSWR(contract ? [key, "allowance", owner, spender] : null, async () => {
      const allowance: BigNumber = await fetcher([key, "allowance", owner, spender]);
      return parseBigNumberToFloat(allowance, Number(decimals));
    });

    return data;
  };

  const useBalance = (owner: string) => {
    const key = `balance/${owner}`;
    const { data } = useSWR(contract ? [key, "balanceOf", owner] : null, async () => {
      const bal: BigNumber = await fetcher([key, "balanceOf", owner]);
      return parseBigNumberToFloat(bal, Number(decimals));
    });

    return data;
  };

  return {
    useAllowance,
    useBalance,
    decimals,
    name,
    contract
  };
};
