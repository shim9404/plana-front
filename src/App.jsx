import { useEffect } from "react";
import LoginModalComponent from "./components/auth/LoginModalComponent";
import SignUpModalComponent from "./components/auth/SignUpModalComponent";
import AppRouter from "./router/AppRouter";
import HeaderMain from "./view/layouts/HeaderMain";
import modalStore from "./store/modalStore.js";
import { OneBtnModal } from "../src/view/modals/OneBtnModal.jsx";
import { TwoBtnModal } from "./view/modals/TwoBtnModal.jsx";
import { oneBtnPreset } from "./utils/alertModalPreset.js";
import { SESSION_EXPIRED_NOTICE_KEY } from "./services/axiosInstance.js";
import { isMobile } from "react-device-detect";
import MobileGuard from "./view/layouts/MobileGuard.jsx";


function App() {
  const loginModal = modalStore((state) => state.loginModal);
  const openLoginModal = modalStore((state) => state.openLoginModal);
  const closeLoginModal = modalStore((state) => state.closeLoginModal);
  const confirmLoginModal = modalStore((state) => state.confirmLoginModal);
  const isSignupOpen = modalStore((state) => state.isSignupOpen);
  const closeSignupModal = modalStore((state) => state.closeSignupModal);
  const oneBtnModal = modalStore((state) => state.oneBtnModal);
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);
  const closeOneBtnModal = modalStore((state) => state.closeOneBtnModal);
  const twoBtnModal = modalStore((state) => state.twoBtnModal);
  const openTwoBtnModal = modalStore((state) => state.openTwoBtnModal);
  const closeTwoBtnModal = modalStore((state) => state.closeTwoBtnModal);
  const confirmTwoBtnModal = modalStore((state) => state.confirmTwoBtnModal);

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


  if (isMobile && window.innerWidth < 768) return <MobileGuard />;

  return (
    <>
      <LoginModalComponent
        open={loginModal.isOpen}
        onLogin={confirmLoginModal}
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
        />)}
      {twoBtnModal.isOpen && (
        <TwoBtnModal
          {...twoBtnModal.props}
          onClose={closeTwoBtnModal}
          onOk={confirmTwoBtnModal}
        />
      )}
      <HeaderMain />
      <AppRouter />
    </>
  );
}

export default App;
