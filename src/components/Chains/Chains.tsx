import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { BSCLogo } from "./Logos";

const styles = {
  item: {
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    backgroundColor: "black",
    color: "white"
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    minWidth: "145px",
    border: "0",
    borderRadius: "7px"
  }
};

type Chain = {
  readonly key: number;
  readonly value: string;
  readonly icon: JSX.Element;
  readonly label: string;
};

export const menuItems = [
  // {
  //   key: 1,
  //   value: "Ethereum",
  //   icon: <ETHLogo />,
  //   label: "Ethereum"
  // },
  // {
  //   key: 3,
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  //   label: "Ropsten Testnet"
  // },
  // {
  //   key: 4,
  //   value: "Rinkeby Testnet",
  //   icon: <ETHLogo />,
  //   label: "Rinkeby Testnet"
  // },
  // {
  //   key: 5,
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  //   label: "Goerli Testnet"
  // },
  {
    key: 56,
    value: "Binance",
    icon: <BSCLogo />,
    label: "Binance"
  },
  {
    key: 97,
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
    label: "Smart Chain Testnet"
  }
  // {
  //   key: 137,
  //   value: "Polygon",
  //   icon: <PolygonLogo />,
  //   label: "Polygon"
  // },
  // {
  //   key: 80001,
  //   value: "Mumbai",
  //   icon: <PolygonLogo />,
  //   label: "Mumbai"
  // }
  // {
  //   key: 43114,
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  //   label: "Avalanche"
  // },
];

const Chains: React.FC = () => {
  const { chainId, switchNetwork } = useEthers();
  const [selected, setSelected] = useState<Chain>();

  useEffect(() => {
    if (chainId === undefined) return undefined;
    const newSelected = menuItems.find((item) => item.key === chainId);
    if (newSelected !== undefined) setSelected(newSelected);
    console.log("current chainId: ", chainId);
    return;
  }, [chainId]);

  // const handleMenuClick = async (e: Chain): Promise<void> => {
  //   console.log("switch to: ", e.key);
  //   await switchNetwork(e.key);
  // };

  const menu = <Menu onClick={(e) => switchNetwork(parseInt(e.key))} items={menuItems} style={styles.item} />;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button key={selected?.key} icon={selected?.icon} style={{ ...styles.button, ...styles.item }}>
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && <span style={{ marginLeft: "5px" }}>{selected.value}</span>}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Chains;
