import { Button } from 'antd';

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px",
  padding: "0px",
};

const IconButton = ({children, type="primary", width="auto", height="auto", fontSize="24px", danger=false}) => {
  return (
    <Button type={type} danger={danger? true : false} style={{width, height, ...buttonStyle}}>
      <div style={{fontSize, ...iconStyle}}>{children}</div>
    </Button>
  );
}

export default IconButton;
