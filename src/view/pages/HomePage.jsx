import { Flex } from "antd";
import PageLayout from "../../components/common/PageLayout";
import Map from "../../components/home/Map";
import TripInfoSelector from "../../components/home/TripInfoSelector";
import { useCallback, useEffect, useRef } from "react";
import useRegionStore from "../../store/home/useRegionStore.js";
import { getRegionDataForCascader } from "../../services/regionDataParser";
import { getRegionApi } from "../../services/regionApi";
import { fetchWithRetry } from "../../utils/apiUtil.js";
import { oneBtnPreset } from "../../utils/alertModalPreset.js";
import useModalStore from "../../store/useModalStore.js";
import useTripDateStore from "../../store/trip/useTripDateStore.js";
import useTripInfoStore from "../../store/trip/useTripInfoStore.js";
import useTripRegionStore from "../../store/trip/useTripRegionStore.js";

const HomePage = () => {
  const setTripId = useTripInfoStore((state) => state.setTripId);
  const setActiveDayCount = useTripDateStore((state) => state.setActiveDayCount);

  const setSelectedZdo = useTripRegionStore((state) => state.setSelectedZdo);
  const setSelectedSigu = useTripRegionStore((state) => state.setSelectedSigu);
  const regionData = useRegionStore((state) => state.regionData);
  const updateRegionData = useRegionStore((state) => state.updateRegionData);

  const openOneBtnModal = useModalStore((state) => state.openOneBtnModal);
  
  const hoveredIdRef = useRef(null);

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


  // 컴포넌트 마운트 시 DB 데이터 불러오기 및 zustand 초기화
  useEffect(() => {
    setTripId(null);
    setActiveDayCount(null);
    setSelectedZdo(null);
    setSelectedSigu(null);

    // 데이터가 이미 있으면 요청 안함
    if (regionData && regionData.lenght > 0) return;

    async function fetchRegionData() {
      console.log("지역(REGION) 데이터 요청");
      try {
        // 3번 요청
        const response = await fetchWithRetry(() => getRegionApi());
        const regionData = getRegionDataForCascader(response.data.regions);
        if (regionData) updateRegionData(regionData);
      } catch (error) {
        openOneBtnModal(oneBtnPreset.retryOver);
        console.error("데이터 로드 실패:", error);
      }
    }
    fetchRegionData();
  }, []);

  return (
    <PageLayout isVisiableFooter>
      <div style={layoutStyle}>
        <Flex flex={1} justify="flex-end" align="flex-start" >
          <Map />
        </Flex>
        <TripInfoSelector setHoveredId={setHoveredId} />
      </div>
    </PageLayout>
  );
};

export default HomePage;
