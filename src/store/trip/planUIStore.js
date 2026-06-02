import { create } from "zustand";

/** === UI 조작 =================================== 
 * planUIStore 구독 컴포넌트 목록
 * - PlanPage
 * - PlanTableContainer
 * - PlanTableHeader
 * - SortableSchedule
 =============================================== */

const planUIStore = create((set) => ({
  // 여행 계획표 확장 및 접기
  isExpandTable: false,
  setIsExpandTable: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        isExpandTable: value(state.isExpandTable)
      }));
    } else {
      set({
        isExpandTable: value
      });
    }
  },

  canExpandTable: false,
  setCanExpandTable: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        canExpandTable: value(state.canExpandTable)
      }));
    } else {
      set({
        canExpandTable: value
      });
    }
  },

  isFoldTable: false,
  setIsFoldTable: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        isFoldTable: value(state.isFoldTable)
      }));
    } else {
      set({
        isFoldTable: value
      });
    }
  },

  // 북마크 리스트 확장
  isExpandBookmark: false,
  setIsExpandBookmark: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        isExpandBookmark: value(state.isExpandBookmark)
      }));
    } else {
      set({
        isExpandBookmark: value
      });
    }
  },

  canExpandBookmark: false,
  setCanExpandBookmark: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        canExpandBookmark: value(state.canExpandBookmark)
      }));
    } else {
      set({
        canExpandBookmark: value
      });
    }
  }
}));

export default planUIStore;