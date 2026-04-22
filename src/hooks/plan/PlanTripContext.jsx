import { createContext, useContext, useState } from "react";

const TripPlanContext = createContext(null);

export const TripPlanProvider = ({ children }) => {
  // === UI 조작 관련 ====================================
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);

  // === 데이터 ====================================
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);
  // 장소 데이터
  const [areas, setAreas] = useState([]);
  // 여행 계획 데이터
  const [planData, setPlanData] = useState([]);

  return(
    <TripPlanContext.Provider value={{ 
      isExpanded, setIsExpanded,
      bookmarks, setBookmarks,
      areas, setAreas,
      planData, setPlanData
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