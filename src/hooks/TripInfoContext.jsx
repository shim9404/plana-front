import { createContext, useContext, useState } from "react";


const TripInfoContext = createContext(null);
// TripInfoContext.jsx - 사용자 선택값만
export const TripInfoProvider = ({ children }) => {

  const [selectedZdo, setSelectedZdo] = useState(null); // 현재 선택된 시도 (예: "32")
  const [selectedSigu, setSelectedSigu] = useState(null); // 현재 선택된 시군구 (예: "32000")
  const [confirmedDates, setConfirmedDates] = useState(null);

  return (
    <TripInfoContext.Provider value={{
      selectedZdo, setSelectedZdo,
      selectedSigu, setSelectedSigu,
      confirmedDates, setConfirmedDates
    }}>
      {children}
    </TripInfoContext.Provider>
  );
};

export const useTripInfo = () => {
  const context = useContext(TripInfoContext);
  if (!context) throw new Error("useTripInfo must be used within TripInfoProvider");
  return context;
};