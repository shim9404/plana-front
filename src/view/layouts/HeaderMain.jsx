import { Layout, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import MenuButton from "../../components/common/MenuButton";
import {
  CompassOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import PlanHeader from "../../components/plan/PlanHeader";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const isAdmin = isLoggedIn && userRole === "ROLE_ADMIN";

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: "rgba(168,168,186,0.5)",
            colorPrimaryActive: "rgba(168,168,186,1)",
          },
        },
      }}
    >
      <Header style={headerStyle}>
        {/* 로고 영역 */}
        <div style={LogoContainer}>
          <Link
            to="/"
            className="header-trip__brand"
          >
            <img
              src="../../../public/images/svg/logos/plana-logo.svg"
              alt="logo"
              width="137px"
              left="13%"
              height="52px"
            />
          </Link>
        </div>
        {/* 여행 계획 페이지 활성: 여행 정보 영역 */}
        {isPlanning ? (
          <div style={PlanContainer}>
            <PlanHeader />
          </div>
        ) : null}
        {/* 메뉴 버튼 영역 */}
        <div style={ButtonContainer}>
          {isAdmin ? (
            <MenuButton name="관리자 페이지">
              <SlidersOutlined />
            </MenuButton>
          ) : null}
          <MenuButton name="내 여행">
            <CompassOutlined />
          </MenuButton>
          <MenuButton name="내 프로필">
            <UserOutlined />
          </MenuButton>
          {isLoggedIn ? (
            <MenuButton name="로그아웃">
              <LogoutOutlined />
            </MenuButton>
          ) : (
            <MenuButton name="로그인">
              <LoginOutlined />
            </MenuButton>
          )}
        </div>
      </Header>
    </ConfigProvider>
  );
};

export default HeaderMain;
