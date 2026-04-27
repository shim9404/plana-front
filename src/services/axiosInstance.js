import axios from 'axios';
import { getMemberIdFromAccessToken } from '../utils/auth/jwtUtil';
import { tokenStore } from '../utils/auth/tokenStore';

/** refresh 실패 후 세션 만료 안내를 띄울 때 사용 */
export const SESSION_EXPIRED_NOTICE_KEY = 'trip_session_expired_notice';

let isRefreshing = false;
let pendingQueue = [];
const ongoingRequests = new Set();

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

  const key = `${config.method}-${config.url}`;

  // 동일 요청이 진행 중이면 차단
  if (ongoingRequests.has(key)) {
    console.warn("중복 요청 차단:", key);
    return Promise.reject(new axios.Cancel(`중복 요청 차단: ${key}`));
  }

  ongoingRequests.add(key);
  // 5초 후 강제 제거 (응답이 없는 경우 대비)
  setTimeout(() => ongoingRequests.delete(key), 5000);

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    const key = `${response.config.method}-${response.config.url}`;
    ongoingRequests.delete(key); // 성공 시 제거
    return response;
  },
  async (error) => {
    // 중복 요청이 차단된 경우 그냥 넘김
    if (axios.isCancel(error)) return Promise.reject(error);

    const key = `${error.config?.method}-${error.config?.url}`;
    ongoingRequests.delete(key); // 실패 시 제거 → fetchWithRetry 재시도 가능

    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    console.log("에러발생!:: ", error.response);

    if (error.response?.status === 403 || error.response?.status === 401) {

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
            console.log("재요청 결과:: ", refreshResponse);

            const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;
            tokenStore.setTokens(accessToken, newRefreshToken);

            const memberId = getMemberIdFromAccessToken(accessToken);
            if (memberId) localStorage.setItem('memberId', memberId);

            processQueue(null, accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);

          } catch (refreshError) {
            processQueue(refreshError, null);
            tokenStore.clearTokens();
            localStorage.removeItem('memberId');
            try {
              sessionStorage.setItem(SESSION_EXPIRED_NOTICE_KEY, '1');
            } catch { /* private 모드 등 */ }
            tokenStore.triggerLogout();

          } finally {
            isRefreshing = false;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;