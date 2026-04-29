import axiosInstance from "./axiosInstance";

export const getRegionApi = async () => {
  const response = await axiosInstance.get(`/api/regions`);
  return response.data;
};

export const getRegionByIdApi = async (regionId) => {
  const response = await axiosInstance.get(`/api/regions/find?regionId=${regionId}`);
  return response.data;
}