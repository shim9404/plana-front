import { createContext, useContext, useMemo, useState } from "react";

/** === 여행 일정 ==================================
 * TripDateContext 구독 컴포넌트 목록
 * - TripDatePicker
 * - TripInfoSelector
 * - PlanTableFooter
 =============================================== */

const TripDateContext = createContext(null);

export const TripDateProvider = ({ children }) => {
  // 현재 선택된 여행일자
  const [confirmedDates, setConfirmedDates] = useState(null);
  // 여행 기간(활성화 된 일자 수)
  const [activeDayCount, setActiveDayCount] = useState(0);

  const tripDateValue = useMemo(() => ({
    confirmedDates, setConfirmedDates,
    activeDayCount, setActiveDayCount,
  }), [confirmedDates, activeDayCount]);

  return (
    <TripDateContext.Provider value={tripDateValue}>
      {children}
    </TripDateContext.Provider>
  )
}

export const useTripDate= () => {
  const context = useContext(TripDateContext);
  if (!context) throw new Error("useTripDate must be used within TripDateContext");
  return context;
}