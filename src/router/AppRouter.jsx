import { Route, Routes, useNavigate } from "react-router-dom";

// 권한 체크용 라우터
import PrivateRouter from "./PrivateRouter";
import PlanPage from "../view/pages/PlanPage";
import Mypage from "../view/pages/Mypage";
import MyTripPage from "../view/pages/MyTripPage";
import AdminPage from "../view/pages/AdminPage";
import ErrorPage from "../view/pages/ErrorPage";
import HomePage from "../view/pages/HomePage";
import { navRef } from "../utils/navUtil";

const AppRouter = () => {

  const navigate = useNavigate();
  navRef.navigate = navigate; // 이제 인터셉터에서도 이 navigate를 쓸 수 있음

  return (
    <Routes>
      {/* 공개 페이지: 누구나 접근 가능 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/error" element={<ErrorPage />} />

      {/* 권한 필요: ADMIN 또는 MANAGER, MEMBER만 접근 가능 */}
      <Route
        path="/mypage"
        element={
          <PrivateRouter
            allowedRoles={["ADMIN", "MANAGER", "MEMBER"]}
          >
            <Mypage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ADMIN 또는 MANAGER, MEMBER만 접근 가능 */}
      <Route
        path="/plan"
        element={
          <PrivateRouter
            allowedRoles={["ADMIN", "MANAGER", "MEMBER"]}
          >
            <PlanPage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ADMIN 또는 MANAGER, MEMBER만 접근 가능 */}
      <Route
        path="/mytrip"
        element={
          <PrivateRouter
            allowedRoles={["ADMIN", "MANAGER", "MEMBER"]}
          >
            <MyTripPage />
          </PrivateRouter>
        }
      ></Route>

      {/* 권한 필요: ADMIN만 접근 가능 */}
      <Route
        path="/admin"
        element={
          <PrivateRouter allowedRoles={["ADMIN"]}>
            <AdminPage />
          </PrivateRouter>
        }
      ></Route>
      <Route path="*" element={<ErrorPage defaultKey="NOT_FOUND" />} />
    </Routes>
  );
};

export default AppRouter;
