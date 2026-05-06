
export const navRef = {
  navigate: null
};

// API 응답 에러 시 에러 페이지 이동에 사용
export const handleSystemRedirect = (path, state) => {
  if (navRef.navigate) {
    navRef.navigate(path, state);
  } else {
    window.location.href = path;
  }
};