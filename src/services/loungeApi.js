import axiosInstance from "./axiosInstance";

export const getMyTripsApi = async () => {
  const response = await axiosInstance.get(`/api/lounge/my-trips`);
  return response.data;
};


export const uploadHubPlanApi = async (tripId, payload) => {
  const response = await axiosInstance.patch(`/api/lounge/${tripId}/public`, payload);
  return response.data;
};



export const getHubPlansApi = async (payload) => {
  const response = await axiosInstance.get(`/api/lounge/hubs`, { params: payload });
  return response.data;
};