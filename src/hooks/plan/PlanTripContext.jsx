import { createContext, useContext, useRef, useState } from "react";

const TripPlanContext = createContext(null);
const PlanEditingContext = createContext(null);

export const TripPlanProvider = ({ children }) => {
  // === UI 조작 관련 ====================================
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);
  // 검색 버튼 상태
  const [isSearched, setIsSearched] = useState(false);

  // === 데이터 ====================================
  // 필터링 결과 데이터
  const [searchResults, setSearchResults] = useState([]);
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);
  // 장소 데이터(DB)
  const [areas, setAreas] = useState([]);
  // 장소 데이터(API)
  const [places, setPlaces] = useState([]);
  // 여행 계획 데이터
  const [planDays, setPlanDays] = useState([]);
  // 여행 스케줄 카테고리(구분)
  const [scheduleCategorys, setScheduleCategorys] = useState([]);

//#region functions
  const getBookmark = (id) => {
    return bookmarks.find(bookmark => bookmark.bookmarkId === id);
  };
    
  const setBookmarkInSchedule = (scheduleId, bookmarkId, context) => {
    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.map((s) =>
          s.tripScheduleId === scheduleId ? { ...s, bookmarkId: bookmarkId, context: context || s.context } : s
      )}))
    );
  }

  const getScheduleDayId = (scheduleId) => {
    return planDays.find((day) => ( day.schedules.filter((s) => s.tripScheduleId === scheduleId))).tripDayId;
  }

  const addPlanDays = (days) => {
    setPlanDays(prev => {
      const newDays = [...prev, ...days];
      return newDays;
    });
  }
//#endregion

  // === Editing Context ====================================
  // 변수
  // 스케줄 삭제
  const isDeleteRef = useRef(false);
  // 북마크 삭제
  const isDeleteBookmarkRef = useRef(false);
  // 편집 포커스 스케줄
  const focusRef = useRef(null);
  // === 데이터
  // 편집 중인 스케줄
  const [editingSchedule, setEditingSchedule] = useState(null);

//#region functions

  /**
   * 스케줄 추가
   * @param {String} dayId 스케줄을 추가할 일자 ID
   * @param {{  }} addData 스케줄 추가 API 호출 후 반환된 데이터
   */
  const addSchedule = (dayId, addData) => {
    const schedules = planDays.find((d) => d.tripDayId === dayId).schedules;
    const newSchedules = [...schedules, addData];
    setPlanDays((prev) =>
      prev.map((d) =>
        d.tripDayId === dayId ? { ...d, schedules: newSchedules } : d,
      ),
    );

    // 신규 스케줄 편집 모드
    setEditingSchedule(addData);
  };

  /**
   * 스케줄 삭제
   * @param {String} scheduleId 삭제할 스케줄 ID
   */
  const deleteSchedule = (scheduleId) => {
    setPlanDays((prev) =>
      prev.map((day) => ({
          ...day,
          schedules: day.schedules.filter((s) => s.tripScheduleId !== scheduleId)
      }))
    );
        
    // 편집 중이던 스케줄 삭제 시 처리
    if (editingSchedule && editingSchedule.tripScheduleId === scheduleId) {
      setEditingSchedule(null);
      focusRef.current = null;
    }
  };

  /**
   * 스케줄 편집 사항 반영
   */
  const saveSchedule = () => {
    const dayId = planDays.find((item) =>
      item.schedules.find(
        (sItem) => sItem.tripScheduleId === editingSchedule.tripScheduleId,
      ),
    ).tripDayId;
    const schedules = planDays.find((d) => d.tripDayId === dayId).schedules;
    const newSchedules = schedules.map((item) =>
      item.tripScheduleId === editingSchedule.tripScheduleId
        ? editingSchedule
        : item,
    );
    setPlanDays((prev) =>
      prev.map((d) =>
        d.tripDayId === dayId ? { ...d, schedules: newSchedules } : d,
      ),
    );

    // 편집 저장 완료 후 선택된 편집 스케줄 비우기
    setEditingSchedule(null);
    focusRef.current = null;
  };
//#endregion
  
  return(
    <TripPlanContext.Provider value={{ 
      isExpanded, setIsExpanded,
      bookmarks, setBookmarks,
      areas, setAreas,
      places, setPlaces,
      isSearched, setIsSearched,
      searchResults, setSearchResults,
      planDays, setPlanDays,
      scheduleCategorys, setScheduleCategorys,
      getBookmark, setBookmarkInSchedule,
      getScheduleDayId, addPlanDays,
    }}>
      <PlanEditingContext.Provider value={{
        isDeleteRef, isDeleteBookmarkRef, focusRef, 
        editingSchedule, setEditingSchedule,
        addSchedule,
        deleteSchedule,
        saveSchedule,
      }}>
        {children}
      </PlanEditingContext.Provider>
    </TripPlanContext.Provider>
  )
}

export const useTripPlan = () => {
  const context = useContext(TripPlanContext);
  if (!context) throw new Error("useTripPlan must be used within TripPlanProvider");
  return context;
};

export const usePlanEditing = () => {
  const context = useContext(PlanEditingContext);
  if (!context) throw new Error("usePlanEditing must be used within PlanEditingContext");
  return context;
}