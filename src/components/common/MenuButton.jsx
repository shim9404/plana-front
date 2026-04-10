import { Button, ConfigProvider } from "antd";

const ButtonStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  width: "80px",
  minWidth: "64px",
  height: "64px",
  margin: "10px",
  padding: "10px",
  filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))",
};

const IconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px",
  padding: "0px",
  width: "28px",
  height: "28px",
  fontSize: "24px",
  // backgroundColor: "yellow",
};

const TextStyle = {
  margin: "0px",
  padding: "0px",
  width: "auto",
  maxWidth: "64px",
  height: "20px",
  fontSize: "12px",
  // backgroundColor: "green",
  textAlign: "center",
};

const MenuButton = (props) => {
  return (
    <Button style={ButtonStyle}>
      <div style={IconStyle}>{props.children}</div>
      <div style={TextStyle}>{props.name}</div>
    </Button>
  );
};

export default MenuButton;
