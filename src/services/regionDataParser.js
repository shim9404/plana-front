/**
 * 지역 선택 Cascader 양식으로 가공된 데이터
 * @returns
 */
export const getRegionDataForCascader = (datas) => {
  let regionData = datas;

  const newRegionMap = {};
  
  // Cascader용 데이터 변환
  const newOptions = regionData.map((region) => {
    const zdoKey = String(region.zdoCode);

    newRegionMap[zdoKey] = region.zdoName;

    return {
      value: zdoKey,
      label: region.zdoName,
      children: region.sigus.map((sigu) => {
        // console.log("region.sigus:: " + sigu.siguName)
        // 2. 시군구 데이터도 regionMap에 추가
        newRegionMap[sigu.regionId] = sigu.siguName;
        return {
          value: sigu.regionId,
          label: sigu.siguName,
        };
      }),
    };
  });

  const processedData = {
    regionMap: newRegionMap,
    cascaderOptions: newOptions,
  };
  return processedData;
};
