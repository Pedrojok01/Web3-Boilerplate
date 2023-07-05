import { message } from "antd";
import { ethers } from "ethers";

import { useSignerOrProvider } from "./useSignerOrProvider";

export const useWriteContract = () => {
  const { signer } = useSignerOrProvider();

  // Sign Message
  const signMessage = async (messageAuth: string): Promise<void> => {
    const authMessage = messageAuth.length > 0 ? { Title: `${messageAuth}` } : { Title: "Hello Web3!" };

    try {
      const transactionHash = await signer?.signMessage(authMessage.Title);
      message.info(`Success!\n\n${transactionHash}`);
    } catch (error: any) {
      const message = error.reason ?? error.message ?? error;
      message.error(`An error occured: ${message}`);
    }
  };

  // Transfer Native Currency
  const transferNative = async (receiver: string, amount: number): Promise<void> => {
    const amountToString = amount.toString();
    const tx = {
      to: receiver,
      value: ethers.utils.parseEther(amountToString)
    };

    try {
      const transaction = await signer?.sendTransaction(tx);
      const receipt = await transaction?.wait(2);
      console.log(receipt);
      message.info(`Success!\n\nTx Hash: ${receipt?.transactionHash}`);
    } catch (error: any) {
      const message = error.reason ?? error.message ?? error;
      message.error(`An error occured: ${message}`);
    }
  };

  return {
    signMessage,
    transferNative
  };
};
