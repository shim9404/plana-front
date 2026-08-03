import { create } from "zustand";
import { tokenStore } from "../utils/auth/tokenStore";
import { SESSION_EXPIRED_NOTICE_KEY } from "../services/axiosInstance";

const readFromStorage = (key, fallback = "") =>
  localStorage.getItem(key) ?? fallback;

const authStore = create((set) => ({
  // 로그인 상태
  isLoggedIn: !!readFromStorage("accessToken"),
  setIsLoggedIn: (newData) =>
    set({
      isLoggedIn: newData
    }),

  userRole: readFromStorage("role"),
  setUserRole: (newData) =>
    set({
      userRole: newData
    }),

  refreshToken: readFromStorage("refreshToken"),
  setRefreshToken: (newData) =>
    set({
      refreshToken: newData
    }),

  accessToken: readFromStorage("accessToken"),
  setAccessToken: (newData) =>
    set({
      accessToken: newData
    }),

  email: readFromStorage("email"),
  setEmail: (newData) =>
    set({
      email: newData
    }),

  memberId: readFromStorage("memberId"),
  setMemberId: (newData) =>
    set({
      memberId: newData
    }),

  username: readFromStorage("name"),
  setUsername: (newData) =>
    set({
      username: newData
    }),

  nickname: readFromStorage("nickname"),
  setNickname: (newData) =>
    set({
      nickname: newData
    }),

  profileImage: readFromStorage("profileImage"),
  setProfileImage: (newData) =>
    set({
      profileImage: newData
    }),

  // 로그인 성공 시 호출
  login: (data, inputEmail) => {
    tokenStore.setTokens(data.accessToken, data.refreshToken);
    // localStorage 저장
    localStorage.setItem("email", inputEmail);
    localStorage.setItem("name", data.name);
    localStorage.setItem("nickname", data.nickname);
    localStorage.setItem("role", data.role);

    if (data.memberId != null && data.memberId !== "") {
      localStorage.setItem("memberId", String(data.memberId));
    }

    // 상태 업데이트
    set({
      isLoggedIn: true,
      userRole: String(data.role ?? ""),
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      email: inputEmail,
      memberId: data.memberId,
      username: data.name,
      nickname: data.nickname,
      profileImage: data.profileImage
    });

    // AppRouter 이벤트 리스너와 호환
    window.dispatchEvent(new Event("trip-auth-profile-updated"));
  },

  // 로그아웃 시 호출
  logout: (isExpired = false) => {
    tokenStore.clearTokens();

    // localStorage 정리
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("memberId");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("trip_auto_login");
    localStorage.removeItem("nickname");

    // 상태 초기화
    set({
      isLoggedIn: false,
      userRole: "",
      accessToken: "",
      refreshToken: "",
      email: "",
      memberId: "",
      username: "",
      profileImage: ""
    });

    if (isExpired || sessionStorage.getItem(SESSION_EXPIRED_NOTICE_KEY)) {
      sessionStorage.removeItem(SESSION_EXPIRED_NOTICE_KEY); // 플래그 제거
      console.log("토큰이 만료되어 로그아웃되었습니다.");
    }

    window.dispatchEvent(new Event("trip-auth-profile-updated"));
  }
}));

// logout 콜백 등록
// -> 토큰 만료 시 실행할 로그아웃 함수 등록
tokenStore.setOnLogout(() => {
  authStore.getState().logout(true); // getState() : 현재 store 상태/함수 직접 접근
});

export default authStore;