import { useMemo } from "react";
import { AddressZero } from "@ethersproject/constants";
import { Provider } from "@ethersproject/providers";
import { Contract, ContractInterface, Signer } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useSignerOrProvider } from "./useSignerOrProvider";

function getContract<T = Contract>(address: string, abi: ContractInterface, provider: Signer | Provider) {
  return <T>(<unknown>new Contract(address, abi, provider));
}

// heavily inspired by uniswaps interface, thanks Noah, great work!
export function useContract<Contract = any>(address: string, abi: ContractInterface) {
  const signerOrProvider = useSignerOrProvider();

  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  const contract = useMemo(
    () => getContract<Contract>(address, abi, signerOrProvider!),
    [address, abi, signerOrProvider]
  );

  return contract;
}
