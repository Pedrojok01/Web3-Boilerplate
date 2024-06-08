import { FC, useCallback, useEffect, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

import { chainData } from "data/chainData";
import { useSwitchChain, useWindowSize } from "hooks";

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
    border: "0",
    borderRadius: "10px"
  }
};

type MenuItem = Required<MenuProps>["items"][number];

const createLabel = (logo: string, alt: string) => (
  <div style={{ display: "inline-flex", alignItems: "center" }}>
    <img src={logo} alt={alt} style={{ width: 25, height: 25, borderRadius: 10, marginRight: 5 }} />
  </div>
);

const items: MenuProps["items"] = chainData.map((chain) => ({
  label: chain.label,
  key: chain.id,
  icon: createLabel(chain.logo, `${chain.label}_logo`)
}));

const ChainSelector: FC = () => {
  const switchChain = useSwitchChain();
  const { chainId, isActive } = useWeb3React();
  const { isTablet } = useWindowSize();
  const [selected, setSelected] = useState<{ item: MenuItem | null; label: JSX.Element | null }>({
    item: null,
    label: null
  });

  const handleChainChange = useCallback((chainId: string) => {
    const chain = chainData.find((chain) => chain.id === chainId);
    const selectedLabel = chain ? createLabel(chain.logo, `${chain.label}_logo`) : null;
    const selectedItem = items.find((item) => item?.key === chainId) || null;
    setSelected({ item: selectedItem, label: selectedLabel });
  }, []);

  useEffect(() => {
    if (chainId) {
      handleChainChange(chainId.toString());
    }
  }, [chainId, handleChainChange]);

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    try {
      await switchChain(Number(key));
    } catch (error) {
      console.error(`Failed to switch chains: ${error}`);
    }
  };

  if (!chainId || !isActive) return null;

  return (
    <div>
      <Dropdown menu={{ items, onClick }}>
        <Button style={{ ...styles.button, ...styles.item }}>
          {!selected.item && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected.item && isTablet ? (
            <div style={{ display: "flex", alignItems: "center", minWidth: "25px" }}>
              <span style={{ paddingTop: "5px" }}>{selected.label}</span>
            </div>
          ) : (
            selected.label && (
              <div style={{ display: "flex", alignItems: "center", minWidth: "100px" }}>
                <span style={{ paddingTop: "5px" }}>{selected.label}</span>
                {/*  @ts-expect-error title is a valid object */}
                <span style={{ marginRight: "10px" }}>{selected.item?.label}</span>
              </div>
            )
          )}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ChainSelector;
