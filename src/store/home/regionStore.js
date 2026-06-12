import { create } from 'zustand';

const regionStore = create((set) => ({
  regionData: {
    regionMap: {},
    cascaderOptions: []
  },
  setRegionData: (newData) =>
    set({
      regionData: newData
    }),
  
  // 지정 지역 정보(이름 + 좌표)
  objRegions: {},
  setObjRegions: (newData) =>
    set({
      objRegions: newData
    }),

  // 데이터를 업데이트하는 함수를 메모이제이션하여 제공
  updateRegionData: (newData) =>
    set({
      regionData: newData
    })
}));

export default regionStore;