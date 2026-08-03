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
 * @param List<String> category
 * @param {String} keyword
 * @param {Number} mapX
 * @param {Number} mapY
 * @param {Number} page
 */
export const getPlaceApi = async (category, keyword, mapX, mapY, page = 1) => {
  const response = await axiosInstance.get(`/api/areas/place`, {
    params: {
      category,
      keyword,
      mapX,
      mapY,
      page,
      size: 10,
    },
  });
  return response.data;
};

/**
 * @param List<String> theme
 * @param {String} keyword
 * @param {Number} mapX
 * @param {Number} mapY
 * @param {Number} page
 * @param {String} regionId
 */
export const getThemeApi = async (theme, keyword, mapX, mapY, regionId, page = 1) => {

  const response = await axiosInstance.get(`/api/areas/theme`, {
    params: {
      theme,
      keyword,
      mapX,
      mapY,
      regionId,
      page,
      size: 10,
    },
  });
  return response.data;
};

/**
 * @param {String} filter
 * @param {Number} mapX
 * @param {Number} mapY
 * @param {Number} page
 */
export const getAroundApi = async (filter, mapX, mapY, page = 1) => {

  const response = await axiosInstance.get(`/api/areas/around`, {
    params: {
      filter,
      mapX,
      mapY,
      page,
      size: 10,
    },
  });
  return response.data;
};

/**
 * @param {String} keyword
 * @param {Number} page
 * @param {String} regionId
 */
export const getRealatedPlaceApi = async (keyword, regionId, page = 1) => {

  const response = await axiosInstance.get(`/api/areas/related-places`, {
    params: {
      keyword,
      regionId,
      page,
      size: 10,
    },
  });
  return response.data;
};