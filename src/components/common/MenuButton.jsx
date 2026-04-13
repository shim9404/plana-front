import { Button } from "antd";

const ButtonStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  width: "80px",
  minWidth: "64px",
  height: "64px",
  margin: "10px",
  padding: "8px",
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
};

const TextStyle = {
  margin: "0px",
  padding: "0px",
  width: "auto",
  maxWidth: "64px",
  height: "20px",
  fontSize: "12px",
  textAlign: "center",
};

const MenuButton = ({children, name, type="default"}) => {
  return (
    <Button type={type} style={ButtonStyle}>
      <div style={IconStyle}>{children}</div>
      <div style={TextStyle}>{name}</div>
    </Button>
  );
};

export default MenuButton;
