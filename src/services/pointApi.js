import axiosInstance from './axiosInstance';

/**
 * 포인트 정보 호출
 * @param {string|number} memberId
 */
export const getPointApi = async (memberId) => {
  const response = await axiosInstance.get(`/api/points/${memberId}`);
  return response.data;
};
