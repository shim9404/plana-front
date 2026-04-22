import axiosInstance from './axiosInstance';

/** @param {String} regionId */
export const getAreaApi = async (regionId) => {
  const response = await axiosInstance.get(`/api/areas?regionId=${regionId}`);
  return response.data;
};

/** @param {String} regionId */
/** @param {Double} mapX */
/** @param {Double} mapY */
export const getPlaceApi = async (keyword, mapX, mapY) => {
  const optionalKeyword = keyword === null || keyword === undefined ? "" : `&keyword=${keyword}`;
  const optionalMapX = mapX === null || mapX === undefined ? "" : `&mapX=${mapX}`;
  const optionalMapY = mapY === null || mapY === undefined ? "" : `&mapY=${mapY}`;
  const response = await axiosInstance.get(`/api/areas?${optionalKeyword}${optionalMapX}${optionalMapY}`);
  return response.data;
};