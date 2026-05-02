import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** === 여행 일자 테이블 =============================
 * PlanDaysContext 구독 컴포넌트 목록
 * - PlanTableContent
 * - PlanTableFooter
 * SET
 * - TripInfoSelector
 * - PlanHeader
 * - SortableDayItem
 * - MyTripPage
 * - PlanPage
 * CONTEXT
 * - EditScheduleContext
 =============================================== */

const PlanDaysContext = createContext(null);

export const PlanDaysProvider = ({ children }) => {
  // 여행 계획 데이터
  const [planDays, setPlanDays] = useState([]);

  //#region DAY
  const getScheduleDayId = (scheduleId) => {
    return planDays.find((day) => ( day.schedules.filter((s) => s.tripScheduleId === scheduleId))).tripDayId;
  }

  const addPlanDays = (days) => {
    setPlanDays(prev => {
      const newDays = [...prev, ...days];
      return newDays;
    });
  }

  const removePlanDay = (dayId) => {
    setPlanDays((prev) => {
      return prev.filter((day) => (day.tripDayId !== dayId));
    })
  }

  //#endregion

  //#region SCHEDULE

  //#endregion

  const planDaysValue = useMemo(() => ({
    planDays, setPlanDays,
    getScheduleDayId, addPlanDays, removePlanDay,
  }), [planDays]);

  return (
    <PlanDaysContext.Provider value={planDaysValue}>
      {children}
    </PlanDaysContext.Provider>
  )
}

export const usePlanDays = () => {
  const context = useContext(PlanDaysContext);
  if (!context) throw new Error("useBookmark must be used within PlanDaysContext");
  return context;
}