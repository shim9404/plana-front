import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useModal } from "./ModalProvider";
import { isTokenExpired } from "../utils/auth/jwtUtil";
import { oneBtnPreset } from "../utils/alertModalPreset";
import { NAV_PRESET } from "../utils/protectedNavPreset";

// 버튼으로 다른 경로로 이동할 때 사용하는 navigate hook
const useProtectedNavigate = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { openLoginModal, openOneBtnModal } = useModal();

  // nav: protectedNavPreset 
  const protectedNavigate = (nav, state = null) => {

    // error 전달용
    if (state) {
      navigate(nav.path, { state });
      return;
    }
    // 로그아웃 버튼으로 나갔을 경우
    if (sessionStorage.getItem("isLogout") === "true") {
      sessionStorage.removeItem("isLogout"); // 플래그 초기화
      navigate(NAV_PRESET.HOME.path);
      return;
    }

    // 로그인을 안 했을 경우 로그인 로그인이 필요한 경우 모달 띄우기
    if (!isLoggedIn && nav.requireAuth) {
      openLoginModal();
      return;
    }

    // 리프레시 토큰이 만료되었을 경우 이동하지 않고 로그아웃처리
    if (isLoggedIn && isTokenExpired()) {
      logout();
      openOneBtnModal(oneBtnPreset.expiredToken); // 토큰 만료 알림
      openLoginModal();
      navigate(NAV_PRESET.HOME.path);
      return;
    }

    navigate(nav.path);

  };

  return protectedNavigate;
};

export default useProtectedNavigate;