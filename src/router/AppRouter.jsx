import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// 권한 체크용 라우터
import PrivateRouter from "./PrivateRouter";
import HomePage from "../view/pages/HomePage";
import PlanPage from "../view/pages/PlanPage";
import Mypage from "../view/pages/Mypage";
import MyTripPage from "../view/pages/MyTripPage";
import AdminPage from "../view/pages/AdminPage";
import ErrorPage from "../view/pages/ErrorPage";

const readRoleFromStorage = () => localStorage.getItem("role") ?? "";

const AppRouter = () => {
  const [role, setRole] = useState(readRoleFromStorage);

  useEffect(() => {
    const sync = () => setRole(readRoleFromStorage());
    window.addEventListener("storage", sync);
    window.addEventListener("trip-auth-profile-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("trip-auth-profile-updated", sync);
    };
  }, []);

  return (
    <Routes>
      {/* 공개 페이지: 누구나 접근 가능 */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/error" element={<ErrorPage />}></Route>

      {/* 권한 필요: ROLE_ADMIN 또는 ROLE_MANAGER, ROLE_MEMBER만 접근 가능 */}
      <Route
        path="/mypage"
        element={
          <PrivateRouter
            role={role}
            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MEMBER"]}
          >
            <Mypage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ROLE_ADMIN 또는 ROLE_MANAGER, ROLE_MEMBER만 접근 가능 */}
      <Route
        path="/plan"
        element={
          <PrivateRouter
            role={role}
            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MEMBER"]}
          >
            <PlanPage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ROLE_ADMIN 또는 ROLE_MANAGER, ROLE_MEMBER만 접근 가능 */}
      <Route
        path="/mytrip"
        element={
          <PrivateRouter
            role={role}
            allowedRoles={["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MEMBER"]}
          >
            <MyTripPage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ADMIN만 접근 가능 */}
      <Route
        path="/admin"
        element={
          <PrivateRouter role={role} allowedRoles={["ROLE_ADMIN"]}>
            <AdminPage />
          </PrivateRouter>
        }
      ></Route>
    </Routes>
  );
};

export default AppRouter;
