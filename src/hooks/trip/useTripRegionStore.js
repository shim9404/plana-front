import { create } from "zustand";

/** === 여행 지역 ==================================
 * useTripRegionStore 구독 컴포넌트 목록
 * - TripPlanComponent
 * - PlanTableFooter
 * SET
 * - Map
 * - TripInfoSelector
 * - PlanHeader
 =============================================== */

const useTripRegionStore = create((set) => ({
  // 현재 선택된 시도 (예: "32")
  selectedZdo: null,
  setSelectedZdo: (newData) =>
    set({
      selectedZdo: newData
    }),

  // 현재 선택된 시군구 (예: "32000")
  selectedSigu: null,
  setSelectedSigu: (newData) =>
    set({
      selectedSigu: newData
    })
}));

export default useTripRegionStore;