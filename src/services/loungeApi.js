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

export const getHubPlanDetailApi = async (hubPlanId) => {
  const response = await axiosInstance.get(`/api/lounge/hubs/${hubPlanId}`);
  return response.data;
};
export const likePlanApi = async (hubPlanId) => {
  const response = await axiosInstance.patch(`/api/lounge/hubs/${hubPlanId}/like`);
  return response.data;
};

// 여행 복제 API
export const copyTripApi = async (tripId, requestData) => {
  return await axiosInstance.post(`/api/trips/${tripId}/copy`, requestData);
};
