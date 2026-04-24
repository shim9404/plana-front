import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

//  role 체크 (권한 여부) 
const PrivateRouter = ({ children, allowedRoles }) => {
  const { userRole } = useAuth();

  // 권한 있음
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // 권한 없음
  return <Navigate to="/error" replace />;
};

export default PrivateRouter;