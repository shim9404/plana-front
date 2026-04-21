import { Button, Flex } from "antd";
import { useEffect, useState } from "react";

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
  onClickEvent,
  type = "default",
  iconSize = "24px",
  fontSize = "12px",
  ...rest
}) => {

  const menuButtonStyle = {
    width: "80px",
    minWidth: "64px",
    height: "64px",
    marginRight: "20px",
    padding: "8px",
  };

  let handleOnClick = () => {
    onClickEvent && onClickEvent();
  };

  return (
    <Button
      type={type}
      style={{ ...buttonStyle, ...menuButtonStyle }}
      onClick={handleOnClick}
      {...rest}
    >
      <div style={{ fontSize: iconSize, ...iconStyle }}>{children}</div>
      <div style={{ fontSize, ...textStyle }}>{name}</div>
    </Button>
  );
};

export const TextButton = ({
  children,
  onClickEvent,
  type = "default",
  width = "auto",
  height = "auto",
  fontSize = "12px",
  fontWeight = 500,
  danger = false,
  disabled = false,
}) => {

  let handleOnClick = () => {
    onClickEvent && onClickEvent();
  };

  return (
    <Button
      type={type}
      danger={danger ? true : false}
      disabled={disabled ? true : false}
      style={{ width, height, fontWeight, ...buttonStyle }}
      onClick={handleOnClick}
    >
      <div style={{ fontSize, ...textStyle }}>{children}</div>
    </Button>
  );
};

export const IconButton = ({
  children,
  onClickEvent,
  type = "primary",
  width = "auto",
  height = "auto",
  fontSize = "24px",
  danger = false,
  disabled = false,
  ...rest
}) => {
  
  let handleOnClick = () => {
    onClickEvent && onClickEvent();
  };

  return (
    <Button
      type={type}
      danger={danger ? true : false}
      disabled={disabled ? true : false}
      style={{ width, height, ...buttonStyle }}
      onClick={handleOnClick}
      {...rest}
    >
      <div style={{ fontSize, ...iconStyle }}>{children}</div>
    </Button>
  );
};

export const ToggleButtonGroup = ({ toggles, isVertical, onChangedEvent, btnStyle }) => {
  let [selected, setSelected] = useState(toggles[0].type);

  const handleChangeToggle = (select) => {
    if (select === selected) return;
    onChangedEvent && onChangedEvent(select);
    setSelected(select);
  }

  const flexStyle = {
    width: "100%",
    height: "100%"
  }

  return(
    <Flex vertical={isVertical} align="center" justify="space-between" style={flexStyle}>
      {toggles.map((toggle, idx) => {
        return (
          <TextButton
            width={toggle.width}
            height={toggle.height}
            fontSize={toggle.fontSize}
            style={btnStyle}
            fontWeight={toggle.type === selected ? toggle.fontWeight + 200 : toggle.fontWeight}
            type={toggle.type === selected ? "primary" : "default"}
            // disabled={toggle.type === selected}
            onClickEvent={() => handleChangeToggle(toggle.type)}
          >
            {toggle.title}
          </TextButton>
        );
      })}
    </Flex>
  );
};