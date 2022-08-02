import { useWeb3React } from "@web3-react/core";
import { Button, Input, message } from "antd";
import { MouseEvent, ReactElement, SetStateAction, useState } from "react";

const styles = {
  buttonSign: {
    margin: "15px auto"
  }
} as const;

export function SignMessage(): ReactElement {
  const { account, provider, chainId } = useWeb3React();
  const [messageAuth, setMessageAuth] = useState<string>("");

  const handleMessageChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMessageAuth(e.target.value);
  };

  function handleSignMessage(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!provider || !account) {
      window.alert("Wallet not connected");
      return;
    }

    const domain = {
      name: "Web3-Boilerplate",
      version: "1",
      chainId: chainId,
      verifyingContract: `${process.env.REACT_APP_VERIFYING_CONTRACT}`
    };

    const types = {
      Message: [{ name: "Title", type: "string" }]
    };

    async function signMessage(account: string): Promise<void> {
      const authMessage = messageAuth!.length > 0 ? { Title: `${messageAuth}` } : { Title: "Hello Web3!" };

      try {
        const signature = await provider!.getSigner(account)._signTypedData(domain, types, authMessage);
        message.info(`Success!\n\n${signature}`);
      } catch (error: any) {
        message.error("Error!" + (error && error.message ? `\n\n${error.message}` : ""));
      }
    }

    signMessage(account);
  }

  return (
    <div style={{ width: "80%" }}>
      <Input
        allowClear
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Input message to sign"
      />
      <Button type="primary" shape="round" style={styles.buttonSign} onClick={handleSignMessage}>
        Sign Message
      </Button>
    </div>
  );
}
