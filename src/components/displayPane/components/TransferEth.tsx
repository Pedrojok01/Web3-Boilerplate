import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Button, InputNumber } from "antd";

import { useNativeBalance, useWriteContract } from "hooks";
import { parseBigNumberToFloat } from "utils/formatters";

import AddressInput from "../../AddressInput";

const styles = {
  buttonTransfer: {
    display: "flex",
    margin: "15px 0"
  }
} as const;

const TransferEth: React.FC = () => {
  const { account, provider } = useWeb3React();
  const { loading, transferNative } = useWriteContract();
  const balance = useNativeBalance(provider, account);
  const [amount, setAmount] = useState<number | null>();
  const [receiver, setReceiver] = useState<string>();

  function handleTransfer(event: { preventDefault: () => void }): void {
    event.preventDefault();

    if (amount && receiver) {
      transferNative(receiver, amount);
    }
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
          <Button type="primary" shape="round" onClick={handleTransfer} loading={loading}>
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferEth;
