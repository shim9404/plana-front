import { createContext, useState, useContext, useCallback } from 'react';

const RegionContext = createContext(null);

export const RegionProvider = ({ children }) => {
  const [regionData, setRegionData] = useState({
    regionMap: {},
    cascaderOptions: []
  });
  // 지정 지역 정보(이름 + 좌표)
  const [ objRegions, setObjRegions ] = useState({});

  // 데이터를 업데이트하는 함수를 메모이제이션하여 제공
  const updateRegionData = useCallback((newData) => {
    setRegionData(newData);
  }, []);

  return (
    <RegionContext.Provider value={{
      regionData, updateRegionData,
      objRegions, setObjRegions
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