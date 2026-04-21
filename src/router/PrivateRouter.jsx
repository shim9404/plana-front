import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useModal } from "../hooks/ModalProvider";

//  role 체크 (권한 여부) 
const PrivateRouter = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { isLoggedIn, userRole } = useAuth();
  const { openLoginModal } = useModal();

  // 비로그인
  if (!isLoggedIn) {
    openLoginModal();
    return <Navigate to="/" replace />;
  }

  // 권한 있음
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // 권한 없음
  return <Navigate to="/error" replace />;
};

export default PrivateRouter;