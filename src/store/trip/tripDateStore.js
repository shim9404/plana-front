import { create } from "zustand";

/** === 여행 일정 ==================================
 * tripDateStore 구독 컴포넌트 목록
 * - TripDatePicker
 * - TripInfoSelector
 * - PlanTableFooter
 =============================================== */

const tripDateStore = create((set) => ({
  // 현재 선택된 여행일자
  confirmedDates: null,
  setConfirmedDates: (newData) =>
    set({
      confirmedDates: newData
    }),

  // 여행 기간(활성화 된 일자 수)
  activeDayCount: 0,
  setActiveDayCount: (newData) =>
    set({
      activeDayCount: newData
    })
}));

export default tripDateStore;