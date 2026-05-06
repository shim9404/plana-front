import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { App as AntdApp, ConfigProvider, message } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import "./styles/global.css";
import { GLOBAL_TOKEN } from "./styles/antdDesignTokens.js";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { ModalProvider } from "./hooks/ModalProvider.jsx";


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
              <Routes>
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
