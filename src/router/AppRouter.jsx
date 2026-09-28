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
import TripAccessGuard from "../components/plan/TripAccessGuard";
import { LoungeDetailGuard } from "../components/lounge/LoungeDetailGuard";
import LoungePage from "../view/pages/LoungePage";
import {LoungeDetailPage} from "../view/pages/LoungeDetailPage";

const AppRouter = () => {

  const navigate = useNavigate();
  navRef.navigate = navigate; // 이제 인터셉터에서도 이 navigate를 쓸 수 있음

  return (
    <Routes>
      {/* 공개 페이지: 누구나 접근 가능 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/lounge" element={<LoungePage />} />
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
      {/* 내 소유 여행 혹은 초대받은 여행 — 로그인 필요 + 여행별 권한 체크 */}
      <Route
        path="/plan/:tripId"
        element={
          <PrivateRouter
            allowedRoles={["ADMIN", "MANAGER", "MEMBER"]}
          >
            <TripAccessGuard mode="JOIN">
              {(tripData) => <PlanPage tripData={tripData} />}
            </TripAccessGuard>
          </PrivateRouter>
        }
      ></Route>

      {/* 공유 링크 접근 — 비로그인 허용, VIEWER 고정 */}
      <Route
        path="/plan/share/:shareToken"
        element={
          <TripAccessGuard mode="SHARE">
            {(tripData) => <PlanPage tripData={tripData} />}
          </TripAccessGuard>
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
      <Route
        path="/lounge/detail/:id"
        element={
          <LoungeDetailGuard>
            {(loungeData) => <LoungeDetailPage loungeData={loungeData} />}
          </LoungeDetailGuard>
        }
      />
    <Route path="*" element={<ErrorPage defaultKey="NOT_FOUND" />} />
    </Routes>
  );
};

export default AppRouter;
