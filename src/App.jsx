import { useEffect } from "react";
import LoginModalComponent from "./components/auth/LoginModalComponent";
import SignUpModalComponent from "./components/auth/SignUpModalComponent";
import AppRouter from "./router/AppRouter";
import HeaderMain from "./view/layouts/HeaderMain";
import { RegionProvider } from "./hooks/home/RegionContext.jsx";
import { TripInfoProvider } from "./hooks/TripInfoContext.jsx";
import { useModal } from "./hooks/ModalProvider.jsx";
import { TripPlanProvider } from "./hooks/plan/PlanTripContext.jsx";
import { OneBtnModal } from "../src/view/modals/OneBtnModal.jsx";
import { oneBtnPreset } from "./utils/alertModalPreset.js";
import { SESSION_EXPIRED_NOTICE_KEY } from "./services/axiosInstance.js";


function App() {

  const {
    isLoginOpen, openLoginModal, closeLoginModal,
    isSignupOpen, closeSignupModal,
    oneBtnModal, openOneBtnModal, closeOneBtnModal
  } = useModal();

useEffect(() => {
  const checkExpired = () => {
    if (sessionStorage.getItem(SESSION_EXPIRED_NOTICE_KEY)) {
      sessionStorage.removeItem(SESSION_EXPIRED_NOTICE_KEY);
      openOneBtnModal(oneBtnPreset.expiredToken);
      openLoginModal();
    }
  };

  checkExpired(); // 마운트 시 즉시 체크 (직접 접근 케이스)
  window.addEventListener("trip-session-expired", checkExpired); // 인터셉터 refresh 실패 케이스
  return () => window.removeEventListener("trip-session-expired", checkExpired);
}, []);

  return (
    <RegionProvider>
      <TripInfoProvider>
        <TripPlanProvider>
          <LoginModalComponent
            open={isLoginOpen}
            onClose={closeLoginModal}
          />
          <SignUpModalComponent
            open={isSignupOpen}
            onClose={closeSignupModal}
          />
          {oneBtnModal.isOpen && (
            <OneBtnModal
              {...oneBtnModal.props}
              onClose={closeOneBtnModal}
            />
          )}
          <HeaderMain />
          <AppRouter />
        </TripPlanProvider>
      </TripInfoProvider>
    </RegionProvider>
  );
}

export default App;
