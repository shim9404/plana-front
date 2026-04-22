import { useEffect } from "react";
import LoginModalComponent from "./components/auth/LoginModalComponent";
import SignUpModalComponent from "./components/auth/SignUpModalComponent";
import AppRouter from "./router/AppRouter";
import HeaderMain from "./view/layouts/HeaderMain";
import { RegionProvider } from "./hooks/home/RegionContext.jsx";
import { TripInfoProvider } from "./hooks/TripInfoContext.jsx";
import { useModal } from "./hooks/ModalProvider.jsx";
import { TripPlanProvider } from "./hooks/plan/PlanTripContext.jsx";


function App() {

  const {
    isLoginOpen, closeLoginModal,
    isSignupOpen, closeSignupModal,
    openLoginModal
  } = useModal();

  useEffect(() => {
    const handleExpired = () => {
      message.warning('세션이 만료되었습니다. 다시 로그인해 주세요.');
      openLoginModal();
    };
    window.addEventListener('trip-session-expired', handleExpired);
    return () => window.removeEventListener('trip-session-expired', handleExpired);
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
          <HeaderMain />
          <AppRouter />
        </TripPlanProvider>
      </TripInfoProvider>
    </RegionProvider>
  );
}

export default App;
