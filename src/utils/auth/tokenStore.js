let accessToken = localStorage.getItem('accessToken') ?? null;
let refreshToken = localStorage.getItem('refreshToken') ?? null;
let onLogout = null;

export const tokenStore = {
  // 토큰 읽기
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  // 토큰 저장 (로그인 성공, refresh 성공 시)
  setTokens: (access, refresh) => {
    accessToken = access;
    refreshToken = refresh;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  },

  // 토큰 초기화 (로그아웃, refresh 실패 시)
  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  // logout 콜백 등록 (AuthContext에서 등록)
  setOnLogout: (cb) => {
    onLogout = cb;
  },

  // logout 콜백 실행 (refresh 실패 시 axiosInstance에서 호출)
  triggerLogout: () => {
    console.log('triggerLogout 호출');
    try {

      sessionStorage.setItem(SESSION_EXPIRED_NOTICE_KEY, '1');
    } catch { /* private 모드 등 */ }
    window.dispatchEvent(new Event('trip-session-expired'));

    if (onLogout) onLogout();
  }
};