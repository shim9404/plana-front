import { Flex } from "antd";
import PageLayout from "../../components/common/PageLayout";
import Map from "../../components/home/Map";
import TripInfoSelector from "../../components/home/TripInfoSelector";
import { useCallback, useEffect, useRef } from "react";
import { useRegion } from "../../hooks/home/RegionContext";
import { getRegionDataForCascader } from "../../services/regionDataParser";

const MainContents = () => {
  const hoveredIdRef = useRef(null);
  const { updateRegionData } = useRegion();
  const layoutStyle = {
    position: "relative",
    backgroundColor: "#D0DBEB",
    width: "100%",
    height: "100%"
  };

  // 직접 돔에 접근
  const setHoveredId = useCallback((id) => {
    // 이전 path 클래스 제거
    if (hoveredIdRef.current) {
      const prev = document.getElementById(String(hoveredIdRef.current));
      if (prev) prev.classList.remove('hovered');
    }
    // 새 path 클래스 추가
    if (id) {
      const next = document.getElementById(String(id));
      if (next) next.classList.add('hovered');
    }
    hoveredIdRef.current = id;
  }, []);


  // 컴포넌트 마운트 시 DB 데이터 불러오기
  useEffect(() => {
    try {
      // const response = await axios.get('/api/regions'); 
      const regionData = getRegionDataForCascader(null);
      if (regionData) updateRegionData(regionData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, []);

  return (
    <div style={layoutStyle}>
      <Flex flex={1} justify="flex-end" align="flex-start" >
        <Map />
      </Flex>
      <TripInfoSelector setHoveredId={setHoveredId} />
    </div>
  )
};

const HomePage = () => {
  return (
    <PageLayout isVisiableFooter>
      <MainContents />
    </PageLayout>
  );
};

export default HomePage;
