import { Navigate, useLocation } from "react-router-dom";
import authStore from "../store/authStore";

//  role 체크 (권한 여부) 
const PrivateRouter = ({ children, allowedRoles }) => {
  const userRole = authStore((state) => state.userRole);  
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const location = useLocation();

  // 권한 있음
  if (allowedRoles.includes(userRole)) { return children; }
  // 권한 없음
  if (isLoggedIn) { return <Navigate to="/error" replace state={{ errorKey: "FORBIDDEN", from: location.pathname }} /> }

  return <Navigate to="/" replace />
};

export default PrivateRouter;