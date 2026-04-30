import axiosInstance from './axiosInstance';

//#region 여행(TRIP)
/**
 * 신규 여행 생성
 * @param {{ memberId:String, name: String, startDate: String, endDate: String }} payload
 * @returns 
 */
export const addTripApi = async (payload) => {
  const response = await axiosInstance.post(`/api/trips`, payload);
  return response.data;
};

/**
 * 여행 전체 저장 (DAY 및 SCHEDULE 아이디 재발급)
 * @param {String} tripId 
 * @param {*} payload 
 * @returns 
 */
export const saveTripApi = async (tripId, payload) => {
  const response = await axiosInstance.put(`/api/trips/${tripId}`, payload);
  return response.data;
}

/**
 * 여행 조회
 * @param {String} tripId 
 * @returns 
 */
export const getTripApi = async (tripId) => {
  const response = await axiosInstance.get(`/api/trips/${tripId}`);
  return response.data;
}

/**
 * 여행 정보 수정
 * @param {String} tripId
 * @param {{ startDate: String, endDate: String, name: String }} payload
 * @returns 
 */
export const editTripInfoApi = async (tripId, payload) => {
  const response = await axiosInstance.patch(`/api/trips/${tripId}/info`, payload);
  const reulst = response.data ?? {};
  return reulst.success;
};
//#endregion

//#region 여행 일자(TRIP_DAY)
/**
 * 신규 여행 일자 추가
 * @param {String} tripId
 * @param {{ indexSort: Number }} payload
 * @returns 
 */
export const addDayApi = async (tripId, payload) => {
  const response = await axiosInstance.post(`/api/trips/${tripId}/days`, payload);
  return response.data;
};

/**
 * 여행 일자 삭제
 * @param {*} tripId 
 * @param {*} dayId 
 * @returns 
 */
export const deleteDayApi = async (tripId, dayId) => {
  const response = await axiosInstance.delete(`/api/trips/${tripId}/days/${dayId}`);
  return response.data;
}
//#endregion

//#region 여행 스케줄(TRIP_SCHEDULE)
/**
 * 신규 여행 스케줄 추가
 * @param {String} tripId 
 * @param {String} dayId 
 * @returns 
 */
export const addScheduleApi = async (tripId, dayId) => {
  const response = await axiosInstance.post(`/api/trips/${tripId}/days/${dayId}/schedules`);
  return response.data;
};

/**
 * 여행 스케줄 수정
 * @param {String} tripId 
 * @param {String} dayId 
 * @param {String} scheduleId 
 * @param {*} payload 
 * @returns 
 */
export const editScheduleApi = async (tripId, dayId, scheduleId, payload) => {
  const response = await axiosInstance.patch(`/api/trips/${tripId}/days/${dayId}/schedules/${scheduleId}`, payload);
  const result = response.data ?? {};
  return result.success;
};

/**
 * 여행 스케줄 북마크 링크(등록 수정 해제)
 * @param {String} tripId 
 * @param {String} dayId 
 * @param {String} scheduleId 
 * @param {*} payload 
 * @returns 
 */
export const linkBookmarkInSchedule = async (tripId, dayId, scheduleId, payload) => {
  const response = await axiosInstance.patch(`/api/trips/${tripId}/days/${dayId}/schedules/${scheduleId}/bookmark`, payload)
  const result = response.data ?? {};
  return result.success;
}

/**
 * 여행 스케줄 순서 변경
 * @param {String} tripId 
 * @param {String} dayId 
 * @param {*} payload 
 * @returns 
 */
export const reorderScheduleApi = async (tripId, dayId, payload) => {
  const response = await axiosInstance.patch(`/api/trips/${tripId}/days/${dayId}/schedules/${scheduleId}`, payload);
  const result = response.data ?? {};
  return result.success;
};

/**
 * 여행 스케줄 삭제
 * @param {*} tripId 
 * @param {*} dayId 
 * @param {*} scheduleId 
 * @returns 
 */
export const deleteScheduleApi = async (tripId, dayId, scheduleId) => {
  const response = await axiosInstance.delete(`/api/trips/${tripId}/days/${dayId}/schedules/${scheduleId}`, payload);
  const result = response.data ?? {};
  return result.success;
}
//#endregion

//#region 북마크(BOOKMARK)
/**
 * 신규 북마크 추가
 * @param {String} tripId
 * @param {{  }} payload
 * @returns 
 */
export const addBookmarkApi = async (tripId, payload) => {
  const response = await axiosInstance.post(`/api/trips/${tripId}/bookmarks`, payload);
  return response.data;
};

/**
 * 북마크 삭제
 * @param {String} tripId 
 * @param {String} bookmarkId 
 * @returns 
 */
export const deleteBookmarkApi = async (tripId, bookmarkId) => {
  const response = await axiosInstance.delete(`/api/trips/${tripId}/bookmarks/${bookmarkId}`, payload);
  const result = response.data ?? {};
  return result.success;
}
//#endregion