import axios from 'axios';
import { getMemberIdFromAccessToken } from '../utils/auth/jwtUtil';
import { tokenStore } from '../utils/auth/tokenStore';


/** refresh 실패 후 `/login`에서 세션 만료 안내를 띄울 때 사용 */
export const SESSION_EXPIRED_NOTICE_KEY = 'trip_session_expired_notice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPRING_IP,
  withCredentials: false
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenStore.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    console.log("에러발생!:: ", error.response)
    if (error.response?.status === 403 || error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = tokenStore.getRefreshToken();

        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/tokens/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

            tokenStore.setTokens(accessToken, newRefreshToken);

            // memberId 업데이트
            const memberId = getMemberIdFromAccessToken(accessToken);
            if (memberId) localStorage.setItem('memberId', memberId); // memberId는 tokenStore 밖

            // 원래 요청 재실행
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);

          } catch {
            // refresh 실패 시 로그아웃 처리
            tokenStore.clearTokens();
            localStorage.removeItem('memberId');

            try {
              sessionStorage.setItem(SESSION_EXPIRED_NOTICE_KEY, '1');
            } catch {
              /* private 모드 등 */
            }
            // 만료
            tokenStore.triggerLogout();
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;