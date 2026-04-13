import { Button } from 'antd';

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

const TextButton = ({children, type="default", width="auto", height="auto", fontSize="12px"}) => {
  return (
    <Button type={type} style={{width, height, ...buttonStyle}}>
      <div style={{fontSize, ...textStyle}}>{children}</div>
    </Button>
  );
}

export default TextButton;
