import { useCallback, useState } from "react";

import { ethers } from "ethers";

import { useSignerOrProvider } from "./useSignerOrProvider";

export const useWriteContract = () => {
  const { signer } = useSignerOrProvider();
  const [loading, setLoading] = useState<boolean>(false);

  // Sign Message
  const signMessage = useCallback(
    async (messageAuth: string): Promise<{ success: boolean; data: string }> => {
      setLoading(true);
      const authMessage = messageAuth.length > 0 ? { Title: `${messageAuth}` } : { Title: "Hello Web3!" };

      try {
        const transactionHash = await signer?.signMessage(authMessage.Title);
        return { success: true, data: transactionHash ?? "" };
      } catch (error: any) {
        const message = error.reason ?? error.message ?? error;
        return { success: false, data: message };
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  // Transfer Native Currency
  const transferNative = useCallback(
    async (
      receiver: string,
      amount: number
    ): Promise<{ success: boolean; data: ethers.providers.TransactionReceipt | undefined }> => {
      setLoading(true);
      try {
        if (!ethers.utils.isAddress(receiver)) {
          throw new Error("Invalid address");
        }
        if (!amount || amount <= 0) {
          throw new Error("Invalid amount");
        }

        const amountToString = amount.toString();
        const tx = {
          to: receiver,
          value: ethers.utils.parseEther(amountToString)
        };

        const transaction = await signer?.sendTransaction(tx);
        const receipt = await transaction?.wait(2);
        return { success: true, data: receipt };
      } catch (error: any) {
        const message = error.reason ?? error.message ?? error;
        return { success: false, data: message };
      } finally {
        setLoading(false);
      }
    },
    [signer]
  );

  return {
    loading,
    signMessage,
    transferNative
  };
};
