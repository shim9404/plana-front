import { create } from "zustand";

/** === 여행 주변 장소(고캠핑, 웰니스) 정보 ==================================
 * tripAroundStore 구독 컴포넌트 목록
 =============================================== */

const tripAroundStore = create((set) => ({
  // 고캠핑 활성화/비활성화
  isFilterCamp: false,
  setIsFilterCamp: (newData) =>
    set({ 
      isFilterCamp: newData 
    }),

  // 웰니스 활성화/비활성화
  isFilterWellness: false,
  setIsFilterWellness: (newData) =>
    set({ 
      isFilterWellness: newData 
    }),

  }));

export default tripAroundStore;