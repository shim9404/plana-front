import { Form, Layout } from "antd";
import { Link } from "react-router-dom";
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

  
  const [loginForm] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const [loginModalOpen, setLoginModalOpen] = useState(false);    // 로그인 창 열기/닫기
  const [loginError, setLoginError] = useState('');               // 로그인 에러
  const [loginSubmitting, setLoginSubmitting] = useState(false);  // 로그인 로딩 표시

  const [signUpModalOpen, setSignUpModalOpen] = useState(false);  // 회원가입 창 열기/닫기
  const [signUpSubmitting, setSignUpSubmitting] = useState(false);   // 회원가입 에러

  const closeLoginModal = () => { // 로그인 창 닫기
    setLoginModalOpen(false);
    loginForm.resetFields(); // 값 초기화
    loginForm.setFields([]); // 에러 상태 초기화
    setLoginError('');
  };

  const handleLoginSubmit = () => { // 로그인 버튼 클릭 (TODO: 로그인 데이터 저장)
    setLoginSubmitting(true);
  }

  const openSignUpFromLogin = () => { // 회원가입 창 열기(회원가입 버튼 클릭)
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => { // 회원가입 창 닫기
    setSignUpModalOpen(false);
    signUpForm.resetFields(); // 값 초기화
    signUpForm.setFields([]); // 에러 상태 초기화
  };

  const afterSignUpSuccessOpenLogin = () => { // 로그인 창 열기(가입 버튼 클릭)
    setLoginModalOpen(true);
  };

  return (
    <Header style={headerStyle}>
      {/* 로고 영역 */}
      <div style={LogoContainer}>
        <Link to="/" className="header-trip__brand">
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
          <MenuButton name="관리자 페이지" type="primary">
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
          <MenuButton name="로그인" 
            onClickEvent={() => setLoginModalOpen(true)}>
            <LoginOutlined />
          </MenuButton>
        )}
      </div>

      <LoginModalComponent
        open={loginModalOpen}     // 로그인 창 열기
        onClose={closeLoginModal} // 로그인 창 닫기
        form={loginForm}          // 로그인 Form
        onFinish={handleLoginSubmit} // 로그인 버튼 클릭
        submitting={loginSubmitting} // 로그인 로딩 표시
        onRequestSignUp={openSignUpFromLogin} // 회원가입 창 열기(회원가입 버튼 클릭)
        loginError={loginError}   // 로그인 에러
      />

      <SignUpModalComponent
        open={signUpModalOpen}     // 회원가입 창 열기
        onClose={closeSignUpModal} // 회원가입 창 닫기
        form={signUpForm}          // 회원가입 Form
        submitting={signUpSubmitting} // 회원가입 로딩 표시
        setSubmitting={setSignUpSubmitting}
        onRegisterSuccess={afterSignUpSuccessOpenLogin} // 회원가입 창 닫기(가입 버튼 클릭)
      />

    </Header>
  );
};

export default HeaderMain;
