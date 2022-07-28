import AddressInput from "./AddressInput";
import { Button, Divider, Input } from "antd";

const styles = {
  container: {
    background: "#f5f4f4",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    borderRadius: "20px"
  },
  title: {
    color: "black",
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  text: {
    color: "black",
    fontSize: "20px",
    marginTop: "10px"
  }
} as const;

const AdminPane = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Panel</div>
      <p style={{ color: "black", fontSize: "15px", paddingBottom: "10px" }}>Edit staking yields APR</p>
      <div style={{ width: "70%", margin: "auto" }}>
        <Input
          type="number"
          autoFocus
          placeholder={`Enter the new APR`}
          style={{ marginBottom: "5px" }}
          onChange={(e) => console.log(e.target.value)}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set NO_LOCK APR
        </Button>
        <Input
          type="number"
          placeholder={`Enter the new APR`}
          style={{ marginBottom: "5px" }}
          onChange={(e) => console.log(e.target.value)}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set 3_MONTHS_LOCK APR
        </Button>

        <Divider />
        <p style={{ color: "black", fontSize: "15px", paddingBottom: "10px" }}>
          Edit the staking contract's addresses: Admin / Owner / Token
        </p>
        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new admin address (the back-end server)"
          onChange={() => console.log("change")}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set admin address
        </Button>
        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new token address (token used for staking)"
          onChange={() => console.log("change")}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set token address
        </Button>
        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new owner address (smart-contract owner)"
          onChange={() => console.log("change")}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set owner address
        </Button>
        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new payment address (for yield reward)"
          onChange={() => console.log("change")}
        />
        <Button type="primary" onClick={() => console.log("click")} style={{ marginBottom: "20px" }}>
          Set payment address
        </Button>
      </div>
    </div>
  );
};

export default AdminPane;
