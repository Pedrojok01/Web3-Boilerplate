import { useMemo } from "react";

import { AddressZero } from "@ethersproject/constants";
import { Provider } from "@ethersproject/providers";
import { Contract, ContractInterface, Signer } from "ethers";
import { isAddress } from "ethers/lib/utils";

import { useSignerOrProvider } from "./useSignerOrProvider";

function getContract<T = Contract>(address: string, abi: ContractInterface, provider: Signer | Provider) {
  return <T>(<unknown>new Contract(address, abi, provider));
}

export function useContract<Contract>(address: string, abi: ContractInterface) {
  const { provider, signer } = useSignerOrProvider();
  const signerOrProvider = signer ?? provider;

  const contract = useMemo(() => {
    if (!isAddress(address) || address === AddressZero || !signerOrProvider) {
      console.error(`Invalid 'address' parameter '${address}'.`);
      return undefined;
    }
    return getContract<Contract>(address, abi, signerOrProvider);
  }, [address, abi, signerOrProvider]);

  return contract;
}
