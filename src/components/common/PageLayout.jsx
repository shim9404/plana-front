import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import FooterMain from "../../view/layouts/FooterMain";

const PageLayout = (props) => {

  const headerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
    height: "98px",
  };

  const contentStyle = {
    backgroundColor: "rgba(128, 128, 0, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
    width: "100%",
    height: props.isVisiableFooter ? "calc(100vh - 138px)" : "calc(100vh - 98px)"
  }

  return (
    <Layout>
      <Header style={headerStyle} />
      <Content style={contentStyle}>{props.children}</Content>
      {props.isVisiableFooter ? <FooterMain /> : null}
    </Layout>
  );
};

export default PageLayout;