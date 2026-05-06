import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { tokenStore } from '../utils/auth/tokenStore';
import { SESSION_EXPIRED_NOTICE_KEY } from '../services/axiosInstance';

const AuthContext = createContext(null);

const readFromStorage = (key, fallback = '') => localStorage.getItem(key) ?? fallback;

export const AuthProvider = ({ children }) => {
  // 로그인 상태 (localStorage 초기값으로 새로고침 시에도 유지)
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!readFromStorage('accessToken')
  );
  const [userRole, setUserRole] = useState(
    () => readFromStorage('role')
  );

  const [refreshToken, setRefreshToken] = useState(
    () => readFromStorage('refreshToken')
  );

  // React 컴포넌트 리렌더링 트리거용
  const [accessToken, setAccessToken] = useState(
    () => readFromStorage('accessToken')
  );

  const [email, setEmail] = useState(
    () => readFromStorage('email')
  );

  const [memberId, setMemberId] = useState(
    () => readFromStorage('memberId')
  );

  const [username, setUsername] = useState(
    () => readFromStorage('name')
  );

  const [profileImage, setProfileImage] = useState(
    () => readFromStorage('profileImage')
  );

  // 로그인 성공 시 호출
  const login = useCallback((data, inputEmail) => {

    tokenStore.setTokens(data.accessToken, data.refreshToken);
    // localStorage 저장
    localStorage.setItem('email', inputEmail);
    localStorage.setItem('name', data.name);
    localStorage.setItem('role', data.role);

    if (data.memberId != null && data.memberId !== '') {
      localStorage.setItem('memberId', String(data.memberId));
    }

    // 상태 업데이트
    setIsLoggedIn(true);
    setUserRole(String(data.role ?? ''));
    setRefreshToken(data.refreshToken);
    setAccessToken(data.accessToken);
    setEmail(inputEmail);
    setMemberId(data.memberId);
    setUsername(data.name);
    setProfileImage(data.profileImage);

    // AppRouter 이벤트 리스너와 호환
    window.dispatchEvent(new Event('trip-auth-profile-updated'));
  }, []);

  // 로그아웃 시 호출
  const logout = useCallback((isExpired = false) => {
    tokenStore.clearTokens();

    // localStorage 정리
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('memberId');
    localStorage.removeItem('profileImage')
    localStorage.removeItem('trip_auto_login');

    // 상태 초기화
    setIsLoggedIn(false);
    setUserRole('');
    setAccessToken('');
    setRefreshToken('');
    setEmail('');
    setMemberId('');
    setUsername('');
    setProfileImage('');

    if (isExpired || sessionStorage.getItem(SESSION_EXPIRED_NOTICE_KEY)) {
      sessionStorage.removeItem(SESSION_EXPIRED_NOTICE_KEY); // 플래그 제거
      console.log("토큰이 만료되어 로그아웃되었습니다.")
    }
    window.dispatchEvent(new Event('trip-auth-profile-updated'));
  }, []);

  // logout 콜백 등록
  useEffect(() => {
    tokenStore.setOnLogout(() => logout(true));
  }, [logout]);


  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userRole,
      login,
      logout,
      accessToken,
      refreshToken,
      email,
      memberId,
      username,
      profileImage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};