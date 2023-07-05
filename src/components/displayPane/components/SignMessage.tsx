import { FC, MouseEvent, ReactElement, SetStateAction, useState } from "react";

import { Button, Input } from "antd";

import { useWriteContract } from "hooks";

const styles = {
  buttonSign: {
    margin: "15px auto"
  }
} as const;

const SignMessage: FC = (): ReactElement => {
  const { loading, signMessage } = useWriteContract();
  const [messageAuth, setMessageAuth] = useState<string>("");

  const handleMessageChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMessageAuth(e.target.value);
  };

  function handleSignMessage(event: MouseEvent): void {
    event.preventDefault();

    signMessage(messageAuth);
  }

  return (
    <div style={{ width: "40%", minWidth: "250px" }}>
      <Input
        allowClear
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Input message to sign"
      />
      <Button type="primary" shape="round" style={styles.buttonSign} onClick={handleSignMessage} loading={loading}>
        Sign Message
      </Button>
    </div>
  );
};

export default SignMessage;
