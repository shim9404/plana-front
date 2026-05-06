import { createContext, useContext, useMemo, useState } from "react";

const TripInfoContext = createContext(null);
// TripInfoContext.jsx - 사용자 선택값만

export const TripInfoProvider = ({ children }) => {

  const [tripName, setTripName] = useState("");               // 여행명
  const [entryCount, setEntryCount] = useState(1);            // 여행 참여 인원
  const [tripId, setTripId] = useState("");                   // 여행 ID

  const tripInfoValue = useMemo(() => ({
    tripName, setTripName,
    entryCount, setEntryCount,
    tripId, setTripId,
  }), [tripName, entryCount, tripId]);

  return (
    <TripInfoContext.Provider value={tripInfoValue}>
      {children}
    </TripInfoContext.Provider>
  );
};

export const useTripInfo = () => {
  const context = useContext(TripInfoContext);
  if (!context) throw new Error("useTripInfo must be used within TripInfoProvider");
  return context;
};