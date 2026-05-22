import { create } from 'zustand';

/** === 여행 일자 테이블 =============================
 * usePlanDaysStore 구독 컴포넌트 목록
 * - PlanTableContent
 * - PlanTableFooter
 * SET
 * - TripInfoSelector
 * - PlanHeader
 * - SortableDayItem
 * - MyTripPage
 * - PlanPage
 * Store
 * - useEditScheduleStore
 =============================================== */

const usePlanDaysStore = create((set, get) => ({
  // 여행 계획 데이터
  planDays: [],
  setPlanDays: (value) => {
    // useState처럼 함수형 업데이트 지원
    // (prev) => prev.map(...) 함수 형식 적용하기 위해 필요
    if (typeof value === "function") {
      set((state) => ({
        planDays: value(state.planDays)
      }));
    } else {
      set({
        planDays: value
      });
    }
  },

  //#region DAY
  getScheduleDayId: (scheduleId) => {
    const { planDays } = get();

    const day = planDays.find((day) =>
      day.schedules.some(
        (s) => s.tripScheduleId === scheduleId
      )
    );

    return day?.tripDayId;
  },

  addPlanDays: (days) => {
    set((state) => ({
      planDays: [...state.planDays, ...days]
    }));
  },

  removePlanDay: (dayId) => {
    set((state) => ({
      planDays: state.planDays.filter((day) => day.tripDayId !== dayId)
    }));
  }
}));

export default usePlanDaysStore;