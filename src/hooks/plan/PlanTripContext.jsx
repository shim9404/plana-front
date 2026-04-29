import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const TripPlanContext = createContext(null);

export const TripPlanProvider = ({ children }) => {
  // === UI 조작 관련 ====================================
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);
  // 스케줄 삭제
  const isDeleteRef = useRef(false);
  // 북마크 삭제
  const isDeleteBookmarkRef = useRef(false);

  // === 데이터 =========================================
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);
  // 장소 데이터
  const [areas, setAreas] = useState([]);
  // 여행 계획 데이터
  const [planDays, setPlanDays] = useState([]);
  // 여행 스케줄 카테고리(구분)
  const [scheduleCategorys, setScheduleCategorys] = useState([]);

  const getBookmark = (id) => {
    return bookmarks.find(bookmark => bookmark.bookmarkId === id);
  };

  const setBookmarkInSchedule = (scheduleId, bookmarkId) => {
    const bookmark = bookmarks.find(bookmark => bookmark.bookmarkId === bookmarkId);
    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.map((s) =>
          s.tripScheduleId === scheduleId ? { ...s, bookmarkId: bookmark?.bookmarkId, context: bookmark?.areaInfo?.name } : s
        ),
      }))
    );
  }

  return(
    <TripPlanContext.Provider value={{ 
      isExpanded, setIsExpanded,
      bookmarks, setBookmarks,
      areas, setAreas,
      planDays, setPlanDays,
      scheduleCategorys, setScheduleCategorys,
      isDeleteRef, isDeleteBookmarkRef,
      getBookmark, setBookmarkInSchedule,
    }}>
      {children}
    </TripPlanContext.Provider>
  )
}

export const useTripPlan = () => {
  const context = useContext(TripPlanContext);
  if (!context) throw new Error("useTripPlan must be used within TripPlanProvider");
  return context;
};