import { Layout, Splitter } from "antd";
import { useEffect } from "react";
import { FlexBox } from "../../components/common/PLA_FlexBox";
import { getRegionDataForCascader } from "../../services/regionDataParser";
import { useRegion } from "../../hooks/home/RegionContext";
import { useTripPlan } from "../../hooks/plan/PlanTripContext";
import PageLayout from "../../components/common/PageLayout";
import PlanTableContainer from "../../components/plan/PlanTableContainer";
import PlanAreaContainer from "../../components/plan/PlanAreaContainer";
import PlanBookmarkContainer from "../../components/plan/PlanBookmarkContainer";
import PlanHeader from "../../components/plan/PlanHeader";
import PlanMap from "../../components/plan/map/PlanMap";
const { Header, Sider, Content } = Layout;

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
  zIndex: 1
};

const contentStyle = {
  backgroundColor: "rgba(128, 128, 128, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  display: "flex",
  margin: "8px 0px",
  zIndex: 1
};

const areaListStyle = {
  backgroundColor: "rgba(128, 128, 0, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  width: "388px",
  // height: "720px",
  lineHeight: "120px",
};

const mapStyle = {
  position: "absolute",
  top: "0%",
}

const PlanPage = () => {
  const { isExpanded, setIsExpanded } = useTripPlan();
  const { regionData, updateRegionData } = useRegion();
  const { cascaderOptions } = regionData;

  const handleCollapse = (collapsed, size) => {
    // console.log(collapsed, size);
    setIsExpanded(size[0] === 0);
    // 왼쪽 패널이 collapse되면 오른쪽이 전체를 차지
  };

  // 컴포넌트 마운트 시 Region 데이터 검증
  useEffect(() => {
    // Region 데이터가 유효하지 않은 경우 재요청 (홈을 통해 접근하지 않았을 경우 등)
    if (regionData && cascaderOptions.length > 0) return;
    console.log("지역(REGION) 데이터 재요청");
    try {
      // const response = await axios.get('/api/regions');
      const regionData = getRegionDataForCascader(null);
      if (regionData) updateRegionData(regionData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, []);

  return (
    <PageLayout>
      {/* 헤더 영역의 추가 콘텐츠 - absolute */}
      <PlanHeader />
      <Layout style={layoutStyle}>
        {/* 북마크 리스트 영역 */}
        <Header style={bookmarkListStyle}>
          <FlexBox bg="none">
            <PlanBookmarkContainer />
          </FlexBox>
        </Header>
        {/* 3분할 영역 - 장소 목록 / 지도 / 여행 계획표 */}
        <Layout style={contentStyle}>
          {/* 장소 목록 영역 */}
          <Sider width="388px" style={areaListStyle}>
            <PlanAreaContainer />
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
                      <PlanTableContainer />
                  </FlexBox>
                </Splitter.Panel>
              </Splitter>
            </FlexBox>
          </Content>
        </Layout>
      </Layout>
      {/* 지도 영역 : absolut */}
      <FlexBox style={mapStyle} bg="#E4EAD7">
        <PlanMap/>
      </FlexBox>
    </PageLayout>
  );
};

export default PlanPage;
