import { FC, MouseEvent, ReactElement, SetStateAction, useState } from "react";

import { Button, Input, message } from "antd";

import { useWriteContract } from "hooks";
import { getEllipsisTxt } from "utils/formatters";

const styles = {
  buttonSign: {
    margin: "15px auto"
  }
} as const;

const SignMessage: FC = (): ReactElement => {
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, signMessage } = useWriteContract();
  const [messageAuth, setMessageAuth] = useState<string>("");

  const handleMessageChange = (e: { target: { value: SetStateAction<string> } }) => {
    setMessageAuth(e.target.value);
  };

  const handleSignMessage = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();

    const { success, data } = await signMessage(messageAuth);

    if (success) {
      messageApi.success(`Success! Transaction Hash: ${getEllipsisTxt(data, 8)}`);
    } else {
      messageApi.error(`An error occurred: ${data}`);
    }
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default SignMessage;
