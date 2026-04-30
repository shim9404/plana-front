import { Layout } from "antd";
import { useEffect } from "react";
import { FlexBox } from "../../components/common/PLA_FlexBox";
import { getRegionDataForCascader } from "../../services/regionDataParser";
import { useRegion } from "../../hooks/home/RegionContext";
import { usePlanEditing, useTripPlan } from "../../hooks/plan/PlanTripContext";
import PageLayout from "../../components/common/PageLayout";
import PlanTableContainer from "../../components/plan/PlanTableContainer";
import PlanAreaContainer from "../../components/plan/PlanAreaContainer";
import PlanBookmarkContainer from "../../components/plan/PlanBookmarkContainer";
import PlanHeader from "../../components/plan/PlanHeader";
import PlanMap from "../../components/plan/map/PlanMap";
import { useModal } from "../../hooks/ModalProvider";
import { oneBtnPreset } from "../../utils/alertModalPreset";
import { getRegionApi } from "../../services/regionApi";
import { SCHEDULE_CATEGORYS } from "../../constants/scheduleCategory";
import { DragDropProvider } from "@dnd-kit/react";
import { arrayMove } from "@dnd-kit/helpers";
import { DUMMY_BOOKMARKS } from "../../components/plan/table/PLAN_DUMMY";
import { useTripInfo } from "../../hooks/TripInfoContext";
import { editScheduleApi } from "../../services/tripApi";
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
  pointerEvents: "none",
  zIndex: 1
};

const areaListStyle = {
  backgroundColor: "rgba(128, 128, 0, 0)", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
  width: "388px",
  // height: "720px",
  lineHeight: "120px",
  pointerEvents: "auto",
};

const mapStyle = {
  position: "absolute",
  top: "0%",
}

const PlanPage = () => {
  const { isExpanded, setPlanDays, setScheduleCategorys, getBookmark, getScheduleDayId, setBookmarkInSchedule } = useTripPlan();
  const { tripId } = useTripInfo();
  const { regionData, updateRegionData } = useRegion();
  const { cascaderOptions } = regionData;
  const { openOneBtnModal } = useModal();

  // 컴포넌트 마운트 시 Region 데이터 검증
  useEffect(() => {
    // TODO: 여행 계획 데이터 전체 요청
    setScheduleCategorys(SCHEDULE_CATEGORYS);
    // 기본 값에 없는 구분이 데이터에 있을 경우 scheduleCategorys에 추가

    // Region 데이터가 유효하지 않은 경우 재요청 (홈을 통해 접근하지 않았을 경우 등)
    if (regionData && cascaderOptions.length > 0) return;

    async function fetchRegionData() {
      console.log("지역(REGION) 데이터 재요청");
      try {
        const response = await getRegionApi();
        const regionData = getRegionDataForCascader(response.data.regions);
        if (regionData) updateRegionData(regionData);
      } catch (error) {
        openOneBtnModal(oneBtnPreset.retryOver);
        console.error("데이터 로드 실패:", error);
      }
    }
    fetchRegionData();
  }, []);

  const handleDragEnd = (event) => {
    const { source, target } = event.operation;
    if (!source || !target) return;

    // 북마크 → 스케줄 드롭
    if (source.type === "bookmark") {
      if (!target || target.type !== "item") return;
      handleBookmarkDrop(event);
      return;
    }

    // 일자/스케줄 정렬
    handlePlanMove(event);
  };

  const handleDragOver = (event) => {
    const { source, target } = event.operation;
    if (!source || !target) return;

    // 북마크 드래그 중에는 정렬 미리보기 실행 안 함
    if (source.type === "bookmark") return;

    handlePlanMove(event);
  };

  /**
   * 북마크를 스케줄에 드롭
   * @param {*} event 
   * @returns 
   */
  const handleBookmarkDrop = (event) => {
    const { source, target } = event.operation;
    const bookmarkId = source.id;
    const scheduleId = target.id;
    // 북마크 저장 API
    requestLinkBookmark(scheduleId, bookmarkId, setBookmarkInSchedule);
  };

  /**
   * 일자 및 스케줄 순서 변경
   * @param {*} event 
   * @returns 
   */
  const handlePlanMove  = (event) => {
    const { source, target } = event.operation;
    if (!source || !target) return;
    // console.log("source id:", source.id);
    // console.log("source type:", source.type);
    // console.log("target id:", target.id);
    // console.log("target type:", target.type);

    const sourceId = source.id;
    const targetId = target.id;
    const sourceType = source.type;

    setPlanDays((prev) => {
      // 리스트 재정렬
      if (sourceType === "list") {
        const oldIndex = prev.findIndex((d) => d.tripDayId === sourceId);
        const newIndex = prev.findIndex((d) => d.tripDayId === targetId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
          return prev;
        return arrayMove(prev, oldIndex, newIndex);
      }

      // 아이템 재정렬
      if (sourceType === "item") {
        const sourceDayIndex = prev.findIndex((d) =>
          d.schedules.some((s) => s.tripScheduleId === sourceId),
        );
        const targetDayIndex = prev.findIndex((d) =>
          d.schedules.some((s) => s.tripScheduleId === targetId),
        );
        if (sourceDayIndex === -1 || targetDayIndex === -1) return prev;

        const newDays = prev.map((d) => ({
          ...d,
          schedules: [...d.schedules],
        }));
        const sourceSchedules = newDays[sourceDayIndex].schedules;
        const targetSchedules = newDays[targetDayIndex].schedules;

        const oldIndex = sourceSchedules.findIndex(
          (s) => s.tripScheduleId === sourceId,
        );
        const newIndex = targetSchedules.findIndex(
          (s) => s.tripScheduleId === targetId,
        );
        if (oldIndex === -1 || newIndex === -1) return prev;

        // 같은 리스트 내 이동
        if (sourceDayIndex === targetDayIndex) {
          newDays[sourceDayIndex].schedules = arrayMove(
            sourceSchedules,
            oldIndex,
            newIndex,
          );
        } else {
          // 다른 리스트로 이동
          const [removed] = sourceSchedules.splice(oldIndex, 1);
          targetSchedules.splice(newIndex, 0, removed);
        }
        return newDays;
      }

      return prev;
    });
  };


  /**
   * 북마크 등록 API 요청
   * @param {*} scheduleId 
   * @param {*} bookmarkId 
   * @param {*} successCallback 
   */
  const requestLinkBookmark = async(scheduleId, bookmarkId, successCallback) => {
    try {
      const context = getBookmark(bookmarkId)?.areaInfo?.name;
      const request = { bookmarkId: bookmarkId, context: context };
      const dayId = getScheduleDayId(scheduleId); // 스케줄이 속한 day id 반환
      const isSuccess = await editScheduleApi(tripId, dayId, scheduleId, request);
      if (isSuccess) {
        successCallback?.(scheduleId, bookmarkId, context);
      }
    } catch (e) {
      console.log(e);
    } 
  }

  return (
    <PageLayout>
      {/* 헤더 영역의 추가 콘텐츠 - absolute */}
      <PlanHeader />
      <DragDropProvider
        onDragOver={handleDragOver} // 드래그 중 실시간 미리보기
        onDragEnd={handleDragEnd} // 드롭 시 최종 반영
      >
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
            {/* 계획표(확장 영역 포함) */}
            <Content>
              <FlexBox bg="none" settings={{ justify: "flex-end" }}>
                <FlexBox w={isExpanded ? "1392px" : "752px"} style={{ overflowX: "hidden", pointerEvents: "auto" }}>
                  <PlanTableContainer/>
                </FlexBox>
              </FlexBox>
            </Content>
          </Layout>
        </Layout>
      </DragDropProvider>
      {/* 지도 영역 : absolut */}
      <FlexBox style={mapStyle} bg="#E4EAD7">
        <PlanMap />
      </FlexBox>
    </PageLayout>
  );
};

export default PlanPage;
