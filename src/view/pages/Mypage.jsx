import PageLayout from "../../components/common/PageLayout";
import { Layout, Menu } from "antd";
import { KeyOutlined, ProfileOutlined } from "@ant-design/icons";
import { useState } from "react";
import '../../styles/mypage.css';
import MemberChangeComponent from "../../components/mypage/MemberChangeComponent";
import PasswordChangeComponent from "../../components/mypage/PasswordChangeComponent";
import MemberWithdrawComponent from "../../components/mypage/MemberWithdrawComponent";

import img1 from '../../../public/images/image1.PNG' // 테스트용_이미지

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  minHeight: '100%',
  padding: '8px 48px'
};

const contentStyle = {
  display: 'flex', 
  flexDirection: 'column',
  margin: '24px',
  padding: '48px',
  background: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.5)',
  height: 'calc(100vh - 150px)',
  overflowY: 'auto'
}

const Mypage = () => {
  // 회원 정보 초기값
  const [memberItem, setMemberItem] = useState({
    memberId: "M1", email: "a@a.com", name: "홍길동", nickname: "내가제일좋아하는게임캐릭터는커비입니다.", profileImage: img1
  }) // 테스트용 임의 값 (Backend 연결)

  // 메뉴(회원 정보 수정(1) / 비밀번호 변경(2) / 회원 탈퇴(3)) 선택 
  const [selectedMenu, setSelectedMenu] = useState('1');

  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* == 사이드 영역 == */}
        <Sider width={'300px'} theme="light">
          {/* 상단 프로필 박스 */}
          <div className="demo-logo-vertical" />
          <div className="profile-box">
            <img className="profile-image"
              src={memberItem.profileImage || null} /> {/* 테스트용_이미지 */}
            <div className="profile-name">{memberItem.nickname}</div>
          </div>
          {/* 메뉴 */}
          <Menu
            className="custom-menu" theme="light" mode="inline"
            selectedKeys={selectedMenu ? [selectedMenu] : []}
            onClick={(e) => setSelectedMenu(e.key)}
            items={[
              {
                key: '1',
                icon: <ProfileOutlined style={{ fontSize: '25px' }} />,
                label: '회원 정보 수정'
              },
              {
                key: '2',
                icon: <KeyOutlined style={{ fontSize: '25px' }} />,
                label: '비밀번호 변경'
              }
            ]}
          />
        </Sider>
        {/* == 콘텐츠 영역 == */}
        <Content style={contentStyle} >
          {/* 회원 정보 수정 콘텐츠 (1) */}
          {selectedMenu === '1' &&
            <MemberChangeComponent memberItem={memberItem} setSelectedMenu={setSelectedMenu} />}
          {/* 비밀번호 수정 콘텐츠 (2) */}
          {selectedMenu === '2' &&
            <PasswordChangeComponent />}
          {/* 비밀번호 수정 콘텐츠 (3) */}
          {selectedMenu === '3' &&
            <MemberWithdrawComponent setSelectedMenu={setSelectedMenu} />}
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default Mypage;