import { create } from "zustand";

/** === 여행 정보 ==================================
 * useTripInfoStore 구독 컴포넌트 목록
 =============================================== */

const useTripInfoStore = create((set) => ({
  // 여행명
  tripName: "",
  setTripName: (newData) =>
    set({
      tripName: newData
    }),

  // 여행 참여 인원
  entryCount: 1,
  setEntryCount: (newData) =>
    set({
      entryCount: newData
    }),

  // 여행 ID
  tripId: "",
  setTripId: (newData) =>
    set({
      tripId: newData
    })
}));

export default useTripInfoStore;