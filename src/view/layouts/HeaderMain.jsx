import { Form, Layout, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/common/PLA_Buttons";
import {
  CompassOutlined,
  LoginOutlined,
  LogoutOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import LoginModalComponent from "../../components/auth/LoginModalComponent";
import SignUpModalComponent from "../../components/auth/SignUpModalComponent";
import { useAuth } from "../../hooks/AuthContext";
import { useModal } from "../../hooks/ModalProvider";
import { logoutApi } from "../../services/authApi";
import axiosInstance from "../../services/axiosInstance";
const { Header } = Layout;

const headerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  position: "absolute",
  zIndex: "100",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "98px",
  lineHeight: 1.2,
  borderBottom: "solid 2px #A8A8A8",
};

const LogoContainer = {
  // backgroundColor: "green",
  display: "flex",
  height: "auto",
  justifyContent: "flex-end",
  width: "14%",
  minWidth: "140px",
  padding: "",
};

const PlanContainer = {
  // backgroundColor: "yellow",
  display: "flex",
  width: "80%",
  height: "60%",
};

const ButtonContainer = {
  // backgroundColor: "orange",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "26%",
  height: "100%",
};

const HeaderMain = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, email, accessToken, userRole, memberId } = useAuth();
  const { openLoginModal } = useModal();

  const isAdmin = isLoggedIn && userRole === 'ADMIN';

  const handleLogout = async () => {
    try {
      await logoutApi({ email, accessToken });
    } catch (error) {
      console.error('로그아웃 API 실패:', error);
    } finally {
      logout();
      message.success('로그아웃되었습니다.');
      navigate('/');
    }
  };

  return (
    <Header style={headerStyle}>
      {/* 로고 */}
      <div style={LogoContainer}>
        <Link to="/" className="header-trip__brand">
          <img src="../../../public/images/svg/logos/plana-logo.svg"
            alt="logo" width="137px" height="52px" />
        </Link>
      </div>
      {/* 메뉴 버튼 */}
      <div style={ButtonContainer}>
        {isAdmin && (
          <MenuButton name="관리자 페이지" type="primary">
            <SlidersOutlined />
          </MenuButton>
        )}
        <MenuButton name="내 여행" onClickEvent={() => navigate('/mytrip')}>
          <CompassOutlined />
        </MenuButton>
        <MenuButton name="내 프로필" onClickEvent={() => navigate('/mypage')}>
          <UserOutlined />
        </MenuButton>
        {isLoggedIn ? (
          <MenuButton name="로그아웃" onClickEvent={handleLogout}>
            <LogoutOutlined />
          </MenuButton>
        ) : (
          <MenuButton name="로그인" onClickEvent={openLoginModal}>
            <LoginOutlined />
          </MenuButton>
        )}
      </div>
    </Header>
  );
};

export default HeaderMain;
