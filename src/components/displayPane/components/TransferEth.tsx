import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Button, InputNumber, message } from "antd";
import { ethers } from "ethers";

import { useNativeBalance } from "../../../hooks/useNativeBalance";
import { parseBigNumberToFloat } from "../../../utils/formatters";
import AddressInput from "../../AddressInput";

const styles = {
  buttonTransfer: {
    display: "flex",
    margin: "15px 0"
  }
} as const;

const TransferEth: React.FC = () => {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const [amount, setAmount] = useState<number | null>();
  const [receiver, setReceiver] = useState<string>();

  function handleSignMessage(event: { preventDefault: () => void }): void {
    event.preventDefault();

    if (!provider || !account) {
      window.alert("Wallet not connected");
      return;
    }

    async function transfer(amt: number): Promise<void> {
      const amtStrg = amt.toString();
      const tx = {
        to: receiver,
        value: ethers.utils.parseEther(amtStrg)
      };

      if (provider) {
        try {
          const receipt = await provider.getSigner(account).sendTransaction(tx);
          message.info(`Success!\n\nTx Hash: ${receipt.hash}`);
        } catch (error) {
          if (typeof error === "string") {
            message.error("Error!" + `\n\n${error}`);
          } else if (error instanceof Error) {
            message.error("Error!" + `\n\n${error.message}`);
          }
        }
      }
    }

    if (amount) transfer(amount);
  }

  return (
    <div style={{ width: "40%", minWidth: "250px" }}>
      <AddressInput onChange={setReceiver} address={receiver} />
      <div style={{ display: "inline-flex", gap: "10px", width: "100%" }}>
        <InputNumber
          value={amount}
          onChange={setAmount}
          placeholder="Amount to transfer"
          min={0}
          max={balance ? parseBigNumberToFloat(balance) : 0}
          style={{ width: "100%", height: "80%", marginBlock: "auto" }}
        />

        <div style={styles.buttonTransfer}>
          <Button type="primary" shape="round" onClick={handleSignMessage}>
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferEth;
