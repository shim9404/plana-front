import { Button } from "antd";
import { icons } from "antd/es/image/PreviewGroup";

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const textStyle = {
  margin: "0px",
  padding: "0px",
  width: "100%",
  textAlign: "center",
};

const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px",
  padding: "0px",
};

export const MenuButton = ({
  children,
  name,
  type = "default",
  iconSize = "24px",
  fontSize = "12px",
}) => {
  const menuButtonStyle = {
    width: "80px",
    minWidth: "64px",
    height: "64px",
    marginRight: "20px",
    padding: "8px",
  };
  return (
    <Button type={type} style={{ ...buttonStyle, ...menuButtonStyle }}>
      <div style={{ fontSize: iconSize, ...iconStyle }}>{children}</div>
      <div style={{ fontSize, ...textStyle }}>{name}</div>
    </Button>
  );
};

export const TextButton = ({
  children,
  type = "default",
  width = "auto",
  height = "auto",
  fontSize = "12px",
  danger = false,
  onClick
}) => {
  return (
    <Button
      type={type}
      danger={danger ? true : false}
      style={{ width, height, ...buttonStyle }}
      onClick = {onClick}
    >
      <div style={{ fontSize, ...textStyle }}>{children}</div>
    </Button>
  );
};

export const IconButton = ({
  children,
  type = "primary",
  width = "auto",
  height = "auto",
  fontSize = "24px",
  danger = false,
}) => {
  return (
    <Button
      type={type}
      danger={danger ? true : false}
      style={{ width, height, ...buttonStyle }}
    >
      <div style={{ fontSize, ...iconStyle }}>{children}</div>
    </Button>
  );
};
