import { createContext, useContext, useEffect, useState } from "react";

const TripPlanContext = createContext(null);

export const TripPlanProvider = ({ children }) => {
  // === UI 조작 관련 ====================================
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);
  // 검색 버튼 상태
  const [isSearched, setIsSearched] = useState(false);
  // 필터링 결과 데이터
  const [searchResults, setSearchResults] = useState([]);
  // === 데이터 ====================================
  const [planData, setPlanData] = useState([]);
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

  return (
    <TripPlanContext.Provider value={{
      isExpanded, setIsExpanded,
      bookmarks, setBookmarks,
      areas, setAreas,
      places, setPlaces,
      planData, setPlanData,
      isSearched, setIsSearched,
      searchResults, setSearchResults,
      planDays, setPlanDays,
      scheduleCategorys, setScheduleCategorys,
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