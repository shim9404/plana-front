import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";
import { useModal } from "./hooks/ModalProvider";
import { useEffect } from "react";


/**
 * 로그인 없이 접근 가능한 공개 경로 목록
 *
 * AppRouter 또는 최상위 라우터에서 공개 라우트와 동일하게 유지해야 한다.
 * 이 목록에 없는 경로는 accessToken이 있어야 접근 가능하다.
 */
const PUBLIC_PATHS_WITHOUT_AUTH = new Set(["/", "/error"]);


// 인증이 필요한 라우트를 보호하는 컴포넌트
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { openLoginModal } = useModal();

  const allowWithoutToken = PUBLIC_PATHS_WITHOUT_AUTH.has(location.pathname);

  useEffect(() => {
    if (!isLoggedIn && !allowWithoutToken) {
      openLoginModal();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn && !allowWithoutToken) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  // 보호 대상이 되는 하위 컴포넌트
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
