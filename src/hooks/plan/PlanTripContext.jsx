import { createContext, useContext, useEffect, useState } from "react";

const TripPlanContext = createContext(null);

export const TripPlanProvider = ({ children }) => {
  // === UI 조작 관련 ====================================
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);

  // === 데이터 =========================================
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);
  // 장소 데이터
  const [areas, setAreas] = useState([]);
  // 여행 계획 데이터
  const [planDays, setPlanDays] = useState([]);
  // 여행 스케줄 카테고리(구분)
  const [scheduleCategorys, setScheduleCategorys] = useState([]);

  // === 스케줄 편집기 ===================================
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    console.log("스케줄데이터변화", editingSchedule);
  }, [editingSchedule])

  return(
    <TripPlanContext.Provider value={{ 
      isExpanded, setIsExpanded,
      bookmarks, setBookmarks,
      areas, setAreas,
      planDays, setPlanDays,
      scheduleCategorys, setScheduleCategorys,
      editingSchedule, setEditingSchedule,
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