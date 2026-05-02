import { createContext, useContext, useMemo, useState } from "react";

/** === UI 조작 =================================== 
 * PlanUIProvider 구독 컴포넌트 목록
 * - PlanPage
 * - PlanTableContainer
 * - PlanTableHeader
 * - SortableSchedule
 =============================================== */

const PlanUIContext = createContext(null);

export const PlanUIProvider = ({ children }) => {
  // 여행 계획표 확장
  const [isExpanded, setIsExpanded] = useState(false);

  const planUIValue = useMemo(() => ({
    isExpanded, setIsExpanded
  }), [isExpanded]);

  return (
    <PlanUIContext.Provider value={planUIValue}>
      {children}
    </PlanUIContext.Provider>
  )
}

export const usePlanUI = () => {
  const context = useContext(PlanUIContext);
  if (!context) throw new Error("usePlanUI must be used within PlanUIContext");
  return context;
}