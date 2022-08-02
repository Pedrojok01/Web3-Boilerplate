import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSwitchChain } from "../hooks/useSwitchChain";
import { Menu, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ethereum_Logo from "../assets/images/ethereum_Logo.png";
import bsc_Logo from "../assets/svg/bsc_Logo.svg";

const styles = {
  item: {
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px"
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

type MenuItem = Required<MenuProps>["items"][number];

function ChainSelector() {
  const switchChain = useSwitchChain();
  const { chainId, isActive } = useWeb3React();
  const [selected, setSelected] = useState<MenuItem>();
  const [label, setLabel] = useState<JSX.Element>();

  function getItem(key: React.Key, title: string, label: React.ReactNode, icon?: React.ReactNode): MenuItem {
    return {
      key,
      title,
      label,
      icon
    } as MenuItem;
  }

  const labelToShow = (logo: string, alt: string) => {
    return (
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <img src={logo} alt={alt} style={{ width: "25px", height: "25px", borderRadius: "4px", marginRight: "5px" }} />
      </div>
    );
  };

  useEffect(() => {
    if (!chainId) return undefined;
    if (chainId === 1 || chainId === 5) {
      setLabel(labelToShow(ethereum_Logo, "Ethereum_logo"));
    } else setLabel(labelToShow(bsc_Logo, "BNB_logo"));
    return;
  }, [chainId]);

  const menuItems: MenuItem[] = [
    getItem("1", "Ethereum", "Ethereum", labelToShow(ethereum_Logo, "Ethereum_logo")),
    getItem("5", "Goerli Testnet", "Goerli Testnet", labelToShow(ethereum_Logo, "Ethereum_logo")),
    getItem("56", "BNB Chain", "BNB Chain", labelToShow(bsc_Logo, "BNB_logo")),
    getItem("97", "BNB Testnet", "BNB Testnet", labelToShow(bsc_Logo, "BNB_logo"))
  ];

  useEffect(() => {
    if (!chainId) return undefined;
    setSelected(menuItems.find((item) => item?.key === chainId.toString()));
    console.log("current chainId: ", chainId);
    return;
  }, [chainId]);

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    if (e?.key !== undefined && e?.key !== null) {
      await switchChain(parseInt(e.key));
      window.location.reload();
    }
  };

  const menu = <Menu onClick={handleMenuClick} items={menuItems} style={styles.item} />;

  if (!chainId || !isActive) return null;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button style={{ ...styles.button, ...styles.item }}>
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ paddingTop: "5px" }}>{label}</span>
              {/* @ts-expect-error title is a valid object*/}
              <span style={{ marginRight: "10px" }}>{selected?.title}</span>
            </div>
          )}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default ChainSelector;
