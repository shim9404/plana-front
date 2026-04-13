import { Layout, Menu } from "antd";
import PageLayout from "../../components/common/PageLayout";

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  minHeight: '100vh',
  margin: '8px 48px'
};

const sideStyle = {
  backgroundColor: 'yellow', // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
};

const contentStyle = {
  margin: '8px 0px',
  padding: 24,
  minHeight: 280,
  backgroundColor: 'green', // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
}

const Mypage = () => {
  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        <Sider width={300} style={sideStyle} theme="light">
          사이드 영역
          <Menu theme="light">
            메뉴
          </Menu>
        </Sider>
        <Content style={contentStyle}>
          콘텐트 영역
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default Mypage;