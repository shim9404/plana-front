import PageLayout from "../../components/common/PageLayout";
import { Layout, Menu } from "antd";
import { KeyOutlined, ProfileOutlined, SmileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import axiosInstance from "../../services/axiosInstance";
import '../../styles/mypage.css';
import MemberChangeComponent from "../../components/mypage/MemberChangeComponent";
import PasswordChangeComponent from "../../components/mypage/PasswordChangeComponent";
import MemberWithdrawComponent from "../../components/mypage/MemberWithdrawComponent";
import ProfileMarkerImage from "../../components/mypage/ProfileMarkerImage";

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  minHeight: '100%'
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
  // 회원 전역 변수
  const { memberId, email, accessToken, logout } = useAuth();
  
  // 회원 정보 초기값
  const [objectMemberItem, setObjectMemberItem] = useState({})
  const getMember = async () => {
    try {
      const uri = `/api/members/${memberId}`;
      const result = await axiosInstance.get(uri, null);
      const member = result.data.data.member;

      setObjectMemberItem(member);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getMember = async () => {
      try {
        const uri = `/api/members/${memberId}`;
        const result = await axiosInstance.get(uri, null);
        const member = result.data.data.member;

        setObjectMemberItem(member);
      } catch (error) {
        console.log(error);
      }
    }

    getMember();
  }, [memberId])


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
            <ProfileMarkerImage
              number={parseInt((objectMemberItem.profileImage || "profileImage1").replace("profileImage", ""), 10)} active={1}/>
            <div className="profile-name">{objectMemberItem.nickname}</div>
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
            <MemberChangeComponent 
              memberId={memberId}                 // 회원 id
              objectMemberItem={objectMemberItem} // 회원 정보
              getMember={getMember}               // 회원 정보 갖고오는 함수
              setSelectedMenu={setSelectedMenu}   // 메뉴 선택 번호
            />
          } 
          {/* 비밀번호 수정 콘텐츠 (2) */}
          {selectedMenu === '2' &&
            <PasswordChangeComponent 
            memberId={memberId}               // 회원 id
            setSelectedMenu={setSelectedMenu} // 메뉴 선택 번호
            />
          }
          {/* 회원 탈퇴 수정 콘텐츠 (3) */}
          {selectedMenu === '3' &&
            <MemberWithdrawComponent 
            memberId={memberId}               // 회원 id
            email={email}                     // 회원 이메일
            accessToken={accessToken}         // 회원 토큰
            logout={logout}                   // 로그아웃
            setSelectedMenu={setSelectedMenu} // 메뉴 선택 번호
            />
          }
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default Mypage;