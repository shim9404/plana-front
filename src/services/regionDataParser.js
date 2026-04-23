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

    // 1. regionMap
    newRegionMap[zdoKey] = region.zdoName;

    // 1. 시군구 배열에서 '전체' 항목과 나머지 항목 분리
    const allOption = region.sigus.find((sigu) => sigu.siguCode == "0");
    const otherSigus = region.sigus.filter((sigu) => sigu.siguCode != "0");

    // 2. '전체'가 존재한다면 맨 앞에 붙이고, 아니면 나머지들만 정렬
    // (가나다순 정렬까지 추가하면 더 깔끔합니다)
    const sortedSigus = allOption
      ? [
          allOption,
          ...otherSigus.sort((a, b) => a.siguName.localeCompare(b.siguName)),
        ]
      : otherSigus.sort((a, b) => a.siguName.localeCompare(b.siguName));

    return {
      value: zdoKey,
      label: region.zdoName,
      children: sortedSigus.map((sigu) => {
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
