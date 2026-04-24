import { Layout, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/common/PLA_Buttons";
import {
  CompassOutlined,
  LoginOutlined,
  LogoutOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../hooks/AuthContext";
import { useModal } from "../../hooks/ModalProvider";
import { logoutApi } from "../../services/authApi";
import { FlexBox } from "../../components/common/PLA_FlexBox";
import { useEffect, useRef } from "react";
import useProtectedNavigate from "../../hooks/useProtectedNavigate";
import { NAV_PRESET } from "../../utils/protectedNavPreset";
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

const HeaderMain = () => {
  const loaction = useLocation();
  const { isLoggedIn, logout, email, accessToken, userRole } = useAuth();
  const { openLoginModal } = useModal();
  const protectedNavigate = useProtectedNavigate();

  const isAdmin = isLoggedIn && userRole === 'ADMIN';
  const isPlanning = location.pathname === NAV_PRESET.PLAN.path;
  const buttonsRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logoutApi({ email, accessToken });
    } catch (error) {
      console.error('로그아웃 API 실패:', error);
    } finally {
      console.log("추가!")
      sessionStorage.setItem("isLogout", "true"); // 추가  
      logout();
      protectedNavigate(NAV_PRESET.HOME);
      message.success('로그아웃되었습니다.');
    }
  };

  // 조건에 따라 표시할 메뉴 버튼 정의
  const menuButtons = [
    {
      key: "ADMIN",
      isVisiable: isLoggedIn && isAdmin && !isPlanning,
      name: "관리자 페이지",
      type: "primary",
      onClickEvent: () => protectedNavigate(NAV_PRESET.ADMIN),
      icon: <SlidersOutlined />
    },
    {
      key: "MYTRIP",
      isVisiable: true,
      name: "내 여행",
      type: "default",
      onClickEvent: () => { protectedNavigate(NAV_PRESET.MYTRIP) },
      icon: <CompassOutlined />
    },
    {
      key: "MYPAGE",
      isVisiable: !isPlanning,
      name: "내 프로필",
      type: "default",
      onClickEvent: () => { protectedNavigate(NAV_PRESET.MYPAGE) },
      icon: <UserOutlined />
    },
    {
      key: "LOGIN",
      isVisiable: !isLoggedIn,
      name: "로그인",
      type: "default",
      onClickEvent: openLoginModal,
      icon: <LoginOutlined />
    },
    {
      key: "LOGOUT",
      isVisiable: isLoggedIn,
      name: "로그아웃",
      type: "default",
      onClickEvent: handleLogout,
      icon: <LogoutOutlined />
    },
  ]

  useEffect(() => {

  }, [loaction])

  return (
    <Header style={headerStyle}>
      <FlexBox settings={{ justify: "center" }}>
        <FlexBox w={isPlanning ? "100%" : "80%"} bg="none" style={{ margin: "48px" }}>
          {/* 로고 */}
          <FlexBox w="200px" bg="none">
            <Link to="/" className="header-trip__brand">
              <img src="../../../public/images/svg/logos/plana-logo.svg"
                alt="logo" width="137px" height="52px" />
            </Link>
          </FlexBox>
          {/* 계획 페이지 헤더 영역 */}
          <FlexBox w={`calc(100vw - ${120 + 210 + 200}px)`} bg="none">

          </FlexBox>
          {/* 메뉴 버튼 */}
          <FlexBox w="auto" bg="none" settings={{ justify: "flex-end" }} ref={buttonsRef}>
            {
              menuButtons.map((menu) => {
                return (menu.isVisiable &&
                  <MenuButton key={menu.key} name={menu.name} type={menu.type} onClickEvent={menu.onClickEvent}>
                    {menu.icon}
                  </MenuButton>
                )
              })
            }
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Header>
  );
};

export default HeaderMain;
