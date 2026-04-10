import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import FooterMain from "../../view/layouts/FooterMain";

const headerStyle = {
  backgroundColor: "rgba(0, 0, 0, 0)",
  width: "100%",
  height: "98px",
};

const contentStyle = {
  backgroundColor: "rgba(128, 128, 0, 0.5)",  // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  width: "100%",
}

const PageLayout = (props) => {
  return (
    <Layout>
      <Header style={headerStyle} />
      <Content style={contentStyle}>{props.children}</Content>
      {props.isVisiableFooter ? <FooterMain /> : null}
    </Layout>
  );
};

export default PageLayout;
