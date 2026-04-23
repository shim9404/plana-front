import axiosInstance from "./axiosInstance";

export const getRegionApi = async () => {
  const response = await axiosInstance.get(`/api/regions`);
  return response.data;
};