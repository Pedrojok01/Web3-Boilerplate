import { CSSProperties, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Input, InputRef } from "antd";

import { getEllipsisTxt } from "../utils/formatters";
import Jazzicons from "./Jazzicons";

export interface AddressInputProps {
  address?: string;
  setAddress?: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  autoFocus?: boolean;
  style?: CSSProperties | undefined;
  onChange: Dispatch<SetStateAction<string | undefined>>;
}

const AddressInput: React.FC<AddressInputProps> = (props) => {
  const { connector } = useWeb3React();
  const input = useRef<InputRef>(null);
  const [address, setAddress] = useState<string>("");
  const [validatedAddress, setValidatedAddress] = useState("");
  const [isDomain, setIsDomain] = useState<boolean>(false);

  useEffect(() => {
    if (validatedAddress) props.onChange(isDomain ? validatedAddress : address);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, validatedAddress, isDomain, address]);

  const updateAddress = useCallback(
    async (value: string) => {
      setAddress(value);
      if (isSupportedDomain(value)) {
        // const processPromise = (promise: any) => {
        //   promise
        //     .then((addr: string) => {
        //       setValidatedAddress(addr);
        //       setIsDomain(true);
        //     })
        //     .catch(() => {
        //       setValidatedAddress("");
        //     });
        // };
        // if (value.endsWith(".eth")) {
        //   processPromise(connector.provider?. resolveName(value));
        // } else {
        //   processPromise(
        //     resolveDomain({
        //       domain: value
        //     }).then((r) => r?.address)
        //   );
        // }
      } else if (value.length === 42) {
        setValidatedAddress(getEllipsisTxt(value, 10));
        setIsDomain(false);
      } else {
        setValidatedAddress("");
        setIsDomain(false);
      }
    },
    [connector]
  );

  const Cross = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 22 22"
      strokeWidth="2"
      stroke="#E33132"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => {
        setValidatedAddress("");
        setIsDomain(false);
        setTimeout(function () {
          if (input.current !== null) {
            input.current.focus();
          }
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <Input
      ref={input}
      placeholder={props.placeholder ? props.placeholder : "Public address"}
      prefix={
        isDomain || address.length === 42 ? (
          <Jazzicons seed={(isDomain ? validatedAddress : address).toLowerCase()} />
        ) : (
          <SearchOutlined />
        )
      }
      suffix={validatedAddress && <Cross />}
      autoFocus={props.autoFocus}
      value={isDomain ? `${address} (${getEllipsisTxt(validatedAddress)})` : validatedAddress || address}
      onChange={(e) => {
        updateAddress(e.target.value);
      }}
      disabled={validatedAddress.length > 0 ? true : false}
      style={validatedAddress ? { ...props?.style, border: "1px solid rgb(33, 191, 150)" } : { ...props?.style }}
    />
  );
};

function isSupportedDomain(domain: string) {
  return [".eth", ".crypto", ".coin", ".wallet", ".bitcoin", ".x", ".888", ".nft", ".dao", ".blockchain"].some((tld) =>
    domain.endsWith(tld)
  );
}

export default AddressInput;
