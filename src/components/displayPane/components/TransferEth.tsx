import { ReactElement, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, InputNumber, message } from "antd";
import AddressInput from "../../AddressInput";
import { ethers } from "ethers";
import { useNativeBalance } from "../../../hooks/useNativeBalance";
import { parseBigNumberToFloat } from "../../../utils/formatters";

const styles = {
  buttonTransfer: {
    display: "flex",
    margin: "15px 0"
  }
} as const;

export function TransferEth(): ReactElement {
  const { account, provider } = useWeb3React();
  const balance = useNativeBalance(provider, account);
  const [amount, setAmount] = useState<number>();
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

      try {
        const receipt = await provider!.getSigner(account).sendTransaction(tx);
        console.log(receipt);
        message.info(`Success!\n\nTx Hash: ${receipt.hash}`);
      } catch (error: any) {
        message.error("Error!" + (error && error.message ? `\n\n${error.message}` : ""));
      }
    }

    if (amount) transfer(amount);
  }

  return (
    <div style={{ width: "80%" }}>
      <AddressInput onChange={setReceiver} />
      <div style={{ display: "inline-flex", gap: "10px", width: "100%" }}>
        <InputNumber
          value={amount}
          onChange={setAmount}
          placeholder="Amount to transfer"
          min={0}
          max={parseBigNumberToFloat(balance!)}
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
}
