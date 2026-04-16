import react, { createContext, useState, useContext, useCallback } from 'react';

const RegionContext = createContext(null);

export const RegionProvider = ({ children }) => {
  const [regionData, setRegionData] = useState({
    regionMap: {},
    cascaderOptions: []
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedZdo, setSelectedZdo] = useState(null); // 현재 선택된 시도 (예: "32")
  const [selectedSigu, setSelectedSigu] = useState(null); // 현재 선택된 시군구 (예: "32000")
  const [hoveredId, setHoveredId] = useState(null);     // 마우스 호버 중인 ID

  // 데이터를 업데이트하는 함수를 메모이제이션하여 제공
  const updateRegionData = useCallback((newData) => {
    setRegionData(newData);
    setIsLoaded(true);
  }, []);

  return (
    <RegionContext.Provider value={{
      regionData, isLoaded, updateRegionData,
      selectedZdo, setSelectedZdo, // 선택 기능용
      selectedSigu, setSelectedSigu,
      hoveredId, setHoveredId       // 호버 기능용
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) throw new Error("useRegion must be used within RegionProvider");
  return context;
};