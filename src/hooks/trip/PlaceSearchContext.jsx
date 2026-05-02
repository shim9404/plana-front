import { createContext, useContext, useMemo, useState } from "react";

/** === 근처 장소 검색 ==============================
 * PlaceSearchContext 구독 컴포넌트 목록
 * - PlanAreaContainer
 * - PlanMap
 =============================================== */

const PlaceSearchContext = createContext(null);

export const PlaceSearchProvider = ({ children }) => {
  // 검색 버튼 상태
  const [isSearched, setIsSearched] = useState(false);
  // 필터링 결과 데이터
  const [searchResults, setSearchResults] = useState([]);

  const planSearchValue = useMemo(() => ({
    isSearched, setIsSearched,
    searchResults, setSearchResults,
  }), [isSearched, searchResults]);

  return (
    <PlaceSearchContext.Provider value={planSearchValue}>
      {children}
    </PlaceSearchContext.Provider>
  )
}

export const usePlaceSearch = () => {
  const context = useContext(PlaceSearchContext);
  if (!context) throw new Error("usePlaceSearch must be used within PlaceSearchContext");
  return context;
}