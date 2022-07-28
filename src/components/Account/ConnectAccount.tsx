import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { connectors } from "./config";
import Blockie from "../Blockie";
import Address from "../Address/Address";
import { Button, Card, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "black",
    cursor: "pointer"
  },
  button: {
    height: "40px",
    padding: "0 20px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.2px",
    fontSize: "15px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white"
  },
  text: {
    color: "white"
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px"
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px"
  }
} as const;

const ConnectAccount: React.FC = () => {
  const { account, chainId, activateBrowserWallet, deactivate, switchNetwork } = useEthers();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState<boolean>(false);

  console.log("chainId", chainId);

  const showModal = () => {
    setIsAuthModalVisible(true);
  };

  const handleCancel = () => {
    setIsAuthModalVisible(false);
  };

  const connect = async (connectorId: string): Promise<void> => {
    try {
      if (chainId !== 56) {
        await switchNetwork(56);
      }
      activateBrowserWallet();
      setIsAuthModalVisible(false);
      localStorage.setItem("connectorId", connectorId);
    } catch (e) {
      console.error(e);
    }
  };

  const disconnect = () => {
    deactivate();
    setIsModalVisible(false);
    localStorage.removeItem("connectorId");
  };

  return (
    <>
      {account === undefined ? (
        <div>
          <Button shape="round" type="primary" style={styles.button} onClick={showModal}>
            Connect Wallet
          </Button>

          <Modal
            visible={isAuthModalVisible}
            footer={null}
            onCancel={handleCancel}
            bodyStyle={{
              width: "350px",
              margin: "auto",
              padding: "15px",
              fontSize: "17px",
              fontWeight: "500"
            }}
            style={{ fontSize: "16px", fontWeight: "500" }}
            width="340px"
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "20px"
              }}
            >
              Connect Wallet
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {connectors.map(({ title, icon, connectorId }, key) => (
                <div style={styles.connector} key={key} onClick={() => connect(connectorId)}>
                  <img src={icon} alt={title} style={styles.icon} />
                  <Text style={{ fontSize: "14px" }}>{title}</Text>
                </div>
              ))}
            </div>
          </Modal>

          <br />
        </div>
      ) : (
        <>
          <div style={styles.account} onClick={() => setIsModalVisible(true)}>
            {account && typeof account === "string" && (
              <p style={{ marginRight: "5px", paddingTop: "17px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>
            )}

            <Blockie currentWallet scale={3} />
          </div>
          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
            bodyStyle={{
              width: "400px",
              padding: "15px",
              fontSize: "17px",
              fontWeight: "500"
            }}
            style={{ fontSize: "16px", fontWeight: "500" }}
            width="400px"
          >
            Account
            <Card
              style={{
                marginTop: "10px",
                borderRadius: "1rem"
              }}
              bodyStyle={{ padding: "15px" }}
            >
              <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
              <div style={{ marginTop: "10px", padding: "0 10px" }}>
                {chainId !== undefined && (
                  <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
                    <SelectOutlined style={{ marginRight: "5px" }} />
                    View on Explorer
                  </a>
                )}
              </div>
            </Card>
            <Button
              size="large"
              type="primary"
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "0.5rem",
                fontSize: "16px",
                fontWeight: "500"
              }}
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </Button>
          </Modal>
        </>
      )}
    </>
  );
};

export default ConnectAccount;
