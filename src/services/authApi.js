import axiosInstance from './axiosInstance';

/** @param {{ email: string, password: string, name: string }} payload */
export const signupApi = async (payload) => {
  const response = await axiosInstance.post('/api/auth/signup', payload);
  return response.data;
};

/** @param {{ email: string, password: string }} payload */
export const loginApi = async (payload) => {
  const response = await axiosInstance.post('/api/auth/login', payload);
  return response.data;
};

/** @param {{ refreshToken: string }} payload */
export const refreshTokenApi = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axiosInstance.post('/api/auth/tokens/refresh', { refreshToken: refreshToken });
  return response.data;
};

/** @param {{ email: string, accessToken: string }} payload — 서버에서 Redis refresh 삭제·액세스 블랙리스트 처리 */
export const logoutApi = async (payload) => {
  const response = await axiosInstance.post('/api/auth/logout', payload);
  return response.data;
};
