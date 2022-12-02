import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import GenericERC20Abi from "../abi/GenericERC20.json";
import { GenericERC20 } from "../abi/types";
import { parseBigNumberToFloat } from "../utils/formatters";
import { useContract } from "./useContract";

/**
 *
 * @param address
 * @description Typed convenience hook for interacting with ERC20 tokens.
 * @example
 * const { contract, useBalance, useAllowance} = useToken(address)
 * //
 * const {data: balance} = useBalance(account)
 * const {data: allowance} = useAllowance(account)
 * console.log(balance)
 */
export function useToken(address: string) {
  const contract = useContract<GenericERC20>(address, GenericERC20Abi);
  const { account } = useWeb3React();

  function useAllowance(spender: string, owner = account) {
    const decimals = useDecimals();

    // strictly speaking, the key in this case would need the contract as a dependency as well but it's implicitly taken from the useDecimals hook
    // if decimals isn't ready, allowance isn't fetched but decimals is only ready when contract is ready
    // also, having decimals as a dependency here and return null if not available prevents flickering
    return useSWR(decimals ? [`/token/${address}/allowance`, owner, spender] : null, async (_, owner, spender) => {
      if (owner && contract) {
        const allowance = await contract.allowance(owner, spender);
        return parseBigNumberToFloat(allowance, decimals);
      }
      return undefined;
    });
  }

  function useDecimals() {
    if (contract) {
      const { data } = useSWRImmutable(account ? `/token/${address}/decimals/` : null, () => contract.decimals());
      return data;
    }
    return undefined;
  }

  function useName() {
    if (contract) {
      const { data } = useSWRImmutable(account ? `/token/${address}/name/` : null, () => contract.name());
      return data;
    }
    return undefined;
  }

  // strictly speaking, the key in this case would need the contract as a dependency as well but it's implicitly taken from the useDecimals hook
  // if decimals isn't ready, allowance isn't fetched but decimals is only ready when contract is ready
  function useBalance(owner = account) {
    const decimals = useDecimals();

    return useSWR(
      // needs this decimal check to tell it to only conditionally fetch balance when decimals are ready, otherwise there will be flickering
      decimals ? [`/token/${address}/balance`, owner, decimals] : null,
      async (_, owner, decimals) => {
        if (owner && contract) {
          const bal = await contract.balanceOf(owner);
          return parseBigNumberToFloat(bal, decimals);
        }
        return undefined;
      }
    );
  }

  return {
    useAllowance,
    useBalance,
    useDecimals,
    useName,
    contract
  };
}

/**
 *
 * @param address
 * @returns SWRResponse<number, any>
 * @description Convenience wrapper around useToken that returns the balance of the token in the current account, if you only need to use the balance and don't care about the rest of the token, use this
 * @example
 * const { data: balance } = useBalance(address)
 */
export function useBalance(address: string) {
  const { useBalance } = useToken(address);
  return useBalance();
}

/**
 *
 * @param address
 * @returns SWRResponse<number, any>
 * @description Convenience wrapper around useToken that returns the allowance of a token, if you only need to use the allowance and don't care about the rest of the token, use this
 * @example
 * const { data: allowance } = useAllowance(address)
 */
export function useAllowance(address: string, spender: string, owner?: string) {
  const { useAllowance } = useToken(address);
  return useAllowance(spender, owner);
}

export function useNativeBalance() {
  const { account, provider } = useWeb3React();

  return useSWR(provider ? ["/native/balance/", account] : null, async (_, account) => {
    if (account && provider) {
      const bal = await provider.getBalance(account);
      return parseBigNumberToFloat(bal, 18);
    }
    return undefined;
  });
}
