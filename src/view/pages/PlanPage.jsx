import { Layout, Splitter } from "antd";
import { Header } from "antd/es/layout/layout";
import PageLayout from "../../components/common/PageLayout";
import { FlexContainer } from "../../components/common/PLA_Containers";
import { useState } from "react";
import PlanTableContainer from "../../components/plan/PlanTableContainer";
import { FlexBox } from "../../components/common/PLA_FlexBox";
import { PlanTableContext } from "../../hooks/plan/PlanTableContext";
import PlanAreaContainer from "../../components/plan/PlanAreaContainer";
const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  height: "calc(100vh - 118px)",
  padding: "8px 48px",
};

const bookmarkListStyle = {
  backgroundColor: "rgba(128, 64, 64, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px",
  height: "255px",
};

const contentStyle = {
  backgroundColor: "rgba(128, 128, 128, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  display: "flex",
  margin: "8px 0px",
};

const areaListStyle = {
  backgroundColor: "rgba(128, 128, 0, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  width: "388px",
  // height: "720px",
  lineHeight: "120px",
};

const flexStyle = {
  backgroundColor: "rgba(128, 64, 128, 0.75)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  width: "100%",
  height: "100%",
};

const containerSetting = {
  isVertical: true,
  align: "",
  justify: "",
  flex: "",
};

const PlanPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCollapse = (collapsed, size) => {
    // console.log(collapsed, size);
    setIsExpanded(size[0] === 0);
    // 왼쪽 패널이 collapse되면 오른쪽이 전체를 차지
  };

  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* 북마크 리스트 영역 */}
        <Header style={bookmarkListStyle}>
          <FlexBox bg="none">
            <FlexContainer />
          </FlexBox>
        </Header>
        {/* 3분할 영역 - 장소 목록 / 지도 / 여행 계획표 */}
        <Layout style={contentStyle}>
          {/* 장소 목록 영역 */}
          <Sider width="388px" style={areaListStyle}>
            <PlanAreaContainer/>
          </Sider>
          {/* 지도 표시용 여백 영역 (공백) */}
          <Content>
            <FlexBox bg="none">
              <Splitter onCollapse={handleCollapse}>
                <Splitter.Panel
                  // flex={1}
                  collapsible
                  resizable={false}
                  size={isExpanded ? 0 : undefined}
                />
                <Splitter.Panel size={isExpanded ? "100%" : 752}>
                  <FlexBox style={{ overflowX: "hidden" }}>
                    <PlanTableContext.Provider value={{ isExpanded }}>
                      <PlanTableContainer />
                    </PlanTableContext.Provider>
                  </FlexBox>
                </Splitter.Panel>
              </Splitter>
            </FlexBox>
          </Content>
        </Layout>
      </Layout>
    </PageLayout>
  );
};

export default PlanPage;
