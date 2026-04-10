import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import HomePage from "./view/pages/HomePage.jsx";
import HeaderMain from "./view/layouts/HeaderMain.jsx";
import './styles/global.css';

/**
 * 인증 필요 여부에 따른 페이지 분리
 * [전체 작동 흐름] 브라우저 진입 -> main.jsx -> BrowserRouter 적용 -> AntdApp 적용 -> Routes 분기
 */
createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <AntdApp>
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
      </AntdApp>
    </BrowserRouter>
  </>,
);
