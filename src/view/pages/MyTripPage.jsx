import PageLayout from "../../components/common/PageLayout";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  minHeight: '100%'
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '24px',
  padding: '48px',
  background: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.5)',
  height: 'calc(100vh - 150px)',
  overflowY: 'auto'
}

const MyTripPage = () => {
  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* == 사이드 영역 == */}
        <Sider width={'300px'} theme="light">
        </Sider>
        {/* == 콘텐츠 영역 == */}
        <Content style={contentStyle} >
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default MyTripPage;
