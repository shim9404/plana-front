import { Layout } from "antd";
// import PlanTable from "../../components/plan/PlanTable";
import { Header } from "antd/es/layout/layout";
import PageLayout from "../../components/common/PageLayout";
const { Sider, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100%",
};
const contentStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};
const leftSiderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
const rightSiderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const PlanPage = () => {
  return (
    <PageLayout>
      <Layout>
        {/* 북마크 리스트 영역 */}
        <Header>

        </Header>
        {/* 3분할 영역 - 장소 목록 / 지도 / 여행 계획표 */}
        <Layout style={layoutStyle}>
          {/* 장소 목록 영역 */}
          <Sider width="340px" style={leftSiderStyle}>
            Sider
          </Sider>
          {/* 지도 표시용 여백 영역 (공백) */}
          <Content style={contentStyle}>MAP</Content>
          {/* 여행 계획표 영역 */}
          <Sider width="704px" height="100%" style={rightSiderStyle}>
            <PlanTable />
          </Sider>
        </Layout>
      </Layout>
    </PageLayout>
  );
};

export default PlanPage;
