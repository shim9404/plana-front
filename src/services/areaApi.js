import axiosInstance from './axiosInstance';

/** @param {String} regionId */
export const getAreaInitApi = async (regionId) => {
  const response = await axiosInstance.get(`/api/areas?regionId=${regionId}`);
  return response.data;
};

/**
 * @param {String} regionId
 * @param {String} searchType - PLACE | SPOT | FOOD
 * @param {Number} page
 * @param {Number} size
 */
export const getAreaApi = async (regionId, searchType, page = 1, size = 20, keyword = '') => {
  const response = await axiosInstance.get(`/api/areas/page`, {
    params: {
      regionId,
      searchType,
      page,
      size,
      ...(keyword ? { keyword } : {})
    },
  });
  return response.data;
};


/**
 * @param {String} keyword
 * @param {Number} mapX
 * @param {Number} mapY
 * @param {Number} page
 */
export const getPlaceApi = async (keyword, mapX, mapY, page = 1) => {

  const response = await axiosInstance.get(`/api/areas/place`, {
    params: {
      keyword,
      mapX,
      mapY,
      page,
      size: 15,
    },
  });
  return response.data;
};