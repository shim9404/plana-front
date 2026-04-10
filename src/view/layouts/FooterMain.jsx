import { Footer } from "antd/es/layout/layout";

const footerStyle = {
  backgroundColor: "#565656",
  zIndex: "100",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "40px",
  padding: "0px",
  margin: "0px",
  lineHeight: 1.2,
  color: "#FFFFFF"
};

const FooterMain = () => {
  return (
    <Footer style={footerStyle}>
        PLAN A Copyright &copy; 2026. Team Allrounder All right reserved
    </Footer>
  );
};

export default FooterMain;
