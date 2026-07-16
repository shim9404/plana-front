import { create } from "zustand";

/** === 여행 정보 ==================================
 * tripInfoStore 구독 컴포넌트 목록
 =============================================== */

const tripInfoStore = create((set) => ({
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
    }),

  // 여행 공유 토큰
  shareToken: "",
  setShareToken: (newData) =>
    set({
      shareToken: newData
    })
}));

export default tripInfoStore;