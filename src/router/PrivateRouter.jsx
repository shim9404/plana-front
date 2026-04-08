import { Navigate } from "react-router-dom";

const PrivateRouter = ({ role, children, allowedRoles }) => {
  const userRole = role ?? "";
  console.log("유저 역할" + role);
  console.log(allowedRoles);

  if (!userRole.trim()) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.includes(userRole)) {
    return children;
  }
  return <Navigate to="/error" replace />;
};

export default PrivateRouter;
