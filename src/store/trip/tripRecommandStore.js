import { create } from "zustand";

/** === 여행 추전 장소 정보 ==================================
 * tripInfoStore 구독 컴포넌트 목록
 =============================================== */

const tripRecommandStore = create((set) => ({
  // 추천 장소 팝업 활성화/비활성화
  isRecommend: true,
  setIsRecommend: (newData) =>
    set({ 
      isRecommend: newData 
    }),

  // 추천 장소 팝업 열기/닫기
  isRecommendPopup: false,
  setIsRecommendPopup: (newData) =>
    set({ 
      isRecommendPopup: newData 
    }),

  // 중심 여행지 정보
  focusPlace: null,
  setFocusPlace: (newData) =>
    set({
      focusPlace: newData
    }),

  // 연관 여행지 이름
  relatedPlaceKeyword: null,
  setRelatedPlaceKeyword: (newData) =>
    set({
      relatedPlace: newData
    }),

  }));

export default tripRecommandStore;