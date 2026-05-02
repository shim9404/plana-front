import { createContext, useContext, useMemo, useState } from "react";

/** === 여행 지역 ==================================
 * TripRegionContext 구독 컴포넌트 목록
 * - TripPlanComponent
 * - PlanTableFooter
 * SET
 * - Map
 * - TripInfoSelector
 * - PlanHeader
 =============================================== */

const TripRegionContext = createContext(null);

export const TripRegionProvider = ({ children }) => {
  // 현재 선택된 시도 (예: "32")
  const [selectedZdo, setSelectedZdo] = useState(null);
  // 현재 선택된 시군구 (예: "32000")
  const [selectedSigu, setSelectedSigu] = useState(null);

  const tripRegionValue = useMemo(() => ({
      selectedZdo, setSelectedZdo,
      selectedSigu, setSelectedSigu,
  }), [selectedZdo, selectedSigu]);

  return (
    <TripRegionContext.Provider value={tripRegionValue}>
      {children}
    </TripRegionContext.Provider>
  )
}

export const useTripRegion= () => {
  const context = useContext(TripRegionContext);
  if (!context) throw new Error("useTripRegion must be used within TripRegionContext");
  return context;
}