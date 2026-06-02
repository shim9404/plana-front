import { create } from "zustand";

/** === 근처 장소 검색 ==============================
 * placeSearchStore 구독 컴포넌트 목록
 * - PlanAreaContainer
 * - PlanMap
 =============================================== */

const placeSearchStore = create((set) => ({
  // 검색 버튼 상태
  isSearched: false,
  setIsSearched: (newData) =>
    set({
      isSearched: newData
    }),

  // 필터링 결과 데이터
  searchResults: [],
  setSearchResults: (newData) =>
    set({
      searchResults: newData
    })
}));

export default placeSearchStore;