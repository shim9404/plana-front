import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import authStore from "../store/authStore";


/**
 * 로그인 없이 접근 가능한 공개 경로 목록
 *
 * AppRouter 또는 최상위 라우터에서 공개 라우트와 동일하게 유지해야 한다.
 * 이 목록에 없는 경로는 accessToken이 있어야 접근 가능하다.
 */
const PUBLIC_PATHS_WITHOUT_AUTH = ["/", "/error", "/plan/*"];

/**
 * 로그인(accessToken) 없이 접근 가능 여부 반환
 * PUBLIC_PATHS_WITHOUT_AUTH에 정의된 경로와 비교하여 판단
 * @param {*} pathname 
 * @returns boolean
 */
const isPublicPath = (pathname) => {
  return PUBLIC_PATHS_WITHOUT_AUTH.some((path) => {
    if (path.endsWith("*")) { // 와일드카드 포함 경로 처리
      const prefix = path.slice(0, -1);  // "*" 제거
      return pathname.startsWith(prefix);
    }
    return pathname === path;  // 와일드카드 없는 경로: 완전 일치만 허용
  });
};

// 인증이 필요한 라우트를 보호하는 컴포넌트 url다이렉트로 들어올때 검증 위주
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = authStore((state) => state.isLoggedIn);

  const allowWithoutToken = isPublicPath(location.pathname);

  if (!allowWithoutToken && !isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  // 보호 대상이 되는 하위 컴포넌트
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
