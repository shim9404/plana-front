import { Layout, Flex, Splitter } from "antd";
import { Header } from "antd/es/layout/layout";
import PageLayout from "../../components/common/PageLayout";
import { FlexContainer } from "../../components/common/PLA_Containers";
import { useState } from "react";
const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  margin: "8px 48px",
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
  height: "720px",
  lineHeight: "120px",
};

const planTableStyle = {
  backgroundColor: "rgba(0, 128, 128, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  textAlign: "center",
  lineHeight: "120px",
};

const flexStyle = {
  // backgroundColor: "rgba(128, 64, 128, 0.75)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = (collapsed, size) => {
    console.log(collapsed, size);
    setIsCollapsed(size[0] === 0);
  };

  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* 북마크 리스트 영역 */}
        <Header style={bookmarkListStyle}>
          <Flex style={flexStyle}>
            <FlexContainer />
          </Flex>
        </Header>
        {/* 3분할 영역 - 장소 목록 / 지도 / 여행 계획표 */}
        <Layout style={contentStyle}>
          {/* 장소 목록 영역 */}
          <Sider width="388px" style={areaListStyle}>
            <FlexContainer settings={containerSetting}>
              <Flex>

              </Flex>
            </FlexContainer>
          </Sider>
          {/* 지도 표시용 여백 영역 (공백) */}
          <Content>
            <Flex style={flexStyle}>
              <Splitter onCollapse={handleCollapse}>
                <Splitter.Panel
                  // flex={1}
                  collapsible
                  resizable={false}
                  size={isCollapsed ? 0 : undefined}
                />
                <Splitter.Panel size={isCollapsed ? "100%" : 752}>
                  <Flex style={flexStyle}>
                    <FlexContainer settings={containerSetting}>
                    </FlexContainer>
                  </Flex>
                </Splitter.Panel>
              </Splitter>
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </PageLayout>
  );
};

export default PlanPage;
