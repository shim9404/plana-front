import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { App as AntdApp, ConfigProvider, message } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import HomePage from "./view/pages/HomePage.jsx";
import HeaderMain from "./view/layouts/HeaderMain.jsx";
import "./styles/global.css";
import { GLOBAL_TOKEN } from "./styles/antdDesignTokens.js";
import { ModalProvider, useModal } from "./hooks/ModalProvider.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { useEffect } from "react";


const GlobalEventHandler = () => {
  const { openLoginModal } = useModal();

  useEffect(() => {
    console.log('이벤트 리스너 등록');
    const handleExpired = () => {
      console.log('이벤트 수신!');
      message.warning('세션이 만료되었습니다. 다시 로그인해 주세요.');
      openLoginModal();
    };
    window.addEventListener('trip-session-expired', handleExpired);
    return () => window.removeEventListener('trip-session-expired', handleExpired);
  }, []);

  return null;
};

/**
 * 인증 필요 여부에 따른 페이지 분리
 * [전체 작동 흐름] 브라우저 진입 -> main.jsx -> BrowserRouter 적용 -> AntdApp 적용 -> Routes 분기
 */
createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ConfigProvider theme={GLOBAL_TOKEN}>
        <AntdApp>
          <AuthProvider>
            <ModalProvider>
              <GlobalEventHandler />
              <HeaderMain />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <App />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ModalProvider>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  </>,
);
