import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

/**
 * 로그인 없이 접근 가능한 공개 경로 목록
 *
 * AppRouter 또는 최상위 라우터에서 공개 라우트와 동일하게 유지해야 한다.
 * 이 목록에 없는 경로는 accessToken이 있어야 접근 가능하다.
 */
const PUBLIC_PATHS_WITHOUT_AUTH = new Set(["/home", "/error"]);

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 *
 * 동작 방식:
 * 1. 현재 경로를 확인한다.
 * 2. localStorage에서 accessToken을 조회한다.
 * 3. 현재 경로가 공개 경로인지 확인한다.
 * 4. 토큰이 없고 공개 경로도 아니면 "/"로 리다이렉트한다.
 * 5. 그 외에는 자식 컴포넌트를 그대로 렌더링한다.
 */
const ProtectedRoute = ({ children }) => {
  // 현재 사용자가 접근하려는 URL 정보
  // 예: /admin, /board/list, /weather
  const location = useLocation();

  // 브라우저 localStorage에 저장된 accessToken 조회
  // 토큰 존재 여부를 기준으로 로그인 상태를 단순 판별
  const token = window.localStorage.getItem("accessToken");

  // 현재 경로가 로그인 없이 접근 가능한 공개 경로인지 확인
  const allowWithoutToken = PUBLIC_PATHS_WITHOUT_AUTH.has(location.pathname);

  /**
   * 접근 차단 조건
   * - accessToken 없음
   * - 공개 경로도 아님
   *
   * 처리:
   * - "/" 경로로 이동
   * - replace 옵션으로 현재 막힌 페이지를 브라우저 기록에 남기지 않음
   * - state.from에 원래 가려던 위치를 저장하여 로그인 후 복귀 가능
   */
  if (!token && !allowWithoutToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // 접근 허용 시 자식 컴포넌트 렌더링
  return children;
};

ProtectedRoute.propTypes = {
  // 보호 대상이 되는 하위 컴포넌트
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
