import axios from 'axios';
import { getMemberIdFromAccessToken } from '../utils/auth/jwtUtil';
import { tokenStore } from '../utils/auth/tokenStore';

/** refresh 실패 후 세션 만료 안내를 띄울 때 사용 */
export const SESSION_EXPIRED_NOTICE_KEY = 'trip_session_expired_notice';

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

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
    if (!originalRequest) return Promise.reject(error);

    console.log("에러발생!:: ", error.response);

    if (error.response?.status === 403 || error.response?.status === 401) {

      // 리프레시 진행 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = tokenStore.getRefreshToken();

        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/auth/tokens/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
            tokenStore.setTokens(accessToken, newRefreshToken);

            const memberId = getMemberIdFromAccessToken(accessToken);
            if (memberId) localStorage.setItem('memberId', memberId);

            processQueue(null, accessToken); // 대기 중인 요청 새 토큰으로 재실행
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);

          } catch (refreshError) {
            processQueue(refreshError, null); // 대기 중인 요청 실패 처리
            tokenStore.clearTokens();
            localStorage.removeItem('memberId');
            try {
              sessionStorage.setItem(SESSION_EXPIRED_NOTICE_KEY, '1');
            } catch { /* private 모드 등 */ }
            tokenStore.triggerLogout();

          } finally {
            isRefreshing = false; // 성공/실패 무관하게 항상 초기화
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;