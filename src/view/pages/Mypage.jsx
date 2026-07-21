import PageLayout from "../../components/common/PageLayout";
import { Layout, Menu, Tooltip } from "antd";
import { GiftOutlined, KeyOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import authStore from "../../store/authStore";
import '../../styles/mypage.css';
import MemberChangeComponent from "../../components/mypage/MemberChangeComponent";
import PasswordChangeComponent from "../../components/mypage/PasswordChangeComponent";
import MemberWithdrawComponent from "../../components/mypage/MemberWithdrawComponent";
import ProfileMarkerImage from "../../components/mypage/ProfileMarkerImage";
import { getMemberApi } from "../../services/memberApi";
import TripPointComponent from "../../components/mypage/TripPointComponent";

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  height: "100%",
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '60px 200px 200px',
  background: '#ffffff',
  boxShadow: '0 3px 5px rgba(0,0,0,0.5)',
  boxSizing: "border-box",
  overflow: "hidden",
}

const Mypage = () => {
  // 회원 전역 변수
  const memberId = authStore((state) => state.memberId);
  const email = authStore((state) => state.email);
  const accessToken = authStore((state) => state.accessToken);
  const logout = authStore((state) => state.logout);
  
  // 회원 정보 초기값
  const [objectMemberItem, setObjectMemberItem] = useState({})
  const getMember = async () => {
    if (!memberId) return;

    try {
      const result = await getMemberApi(memberId);
      const member = result.data;

      setObjectMemberItem(member);
    } catch (error) {
      console.log(error);
    }
  }
  
  const menuInfo = {
    1: {
      title: "회원 정보 수정",
      icon: <UserOutlined style={{ fontSize: 30 }} />,
    },
    2: {
      title: "비밀번호 수정",
      icon: <KeyOutlined style={{ fontSize: 30 }} />,
    },
    3: {
      title: "PLAN A 회원 탈퇴",
      icon: <ProfileOutlined style={{ fontSize: 30 }} />,
    },
    4: {
      title: "여행 포인트",
      icon: <GiftOutlined style={{ fontSize: 30 }} />,
    },
  };

  useEffect(() => {
  if (!memberId) return;
    getMember();
  }, [memberId])


  // 메뉴(회원 정보 수정(1) / 비밀번호 변경(2) / 회원 탈퇴(3)) 선택 
  const [selectedMenu, setSelectedMenu] = useState('1');

  return (
    <PageLayout style={{overflow: "hidden"}}>
      <Layout style={layoutStyle}>
        {/* == 사이드 영역 == */}
        <Sider width={'120px'} theme="light" style={{ borderRight: "1px solid #c4c4c4" }}>
          {/* 상단 프로필 박스 */}
          <div className="profile-box">
            <ProfileMarkerImage
              number={parseInt((objectMemberItem.profileImage || "profileImage1").replace("profileImage", ""), 10)} active={3}/>
          </div>
          {/* 메뉴 */}
          <Menu
            className="custom-menu" theme="light" mode="inline"
            selectedKeys={selectedMenu ? [selectedMenu] : []}
            onClick={(e) => setSelectedMenu(e.key)}
            items={[
              {
                key: '1',
                icon:
                  <Tooltip title="회원 정보 수정" placement="right">
                    <UserOutlined style={{ fontSize: '26px' }} />
                  </Tooltip>
              },
              {
                key: '2',
                icon: 
                  <Tooltip title="비밀번호 수정" placement="right">
                    <KeyOutlined style={{ fontSize: '26px' }} />
                  </Tooltip>
              },
              {
                key: '4',
                icon: 
                  <Tooltip title="여행 포인트" placement="right">
                    <GiftOutlined style={{ fontSize: '26px' }} />
                  </Tooltip>
              }
            ]}
          />
        </Sider>
        {/* == 콘텐츠 영역 == */}
        <Content style={contentStyle} className="mypage-content">
          {/* 고정 헤더 */}
          <div className="content-header">
            {menuInfo[selectedMenu].icon}
            <span className="content-header__title">
              {menuInfo[selectedMenu].title}
            </span>
          </div>
          {/* 내용 영역 */}
          <div className="content-scroll">
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
            {/* 여행 포인트 콘텐츠 (4) */}
            {selectedMenu === '4' &&
              <TripPointComponent
              />
            }
          </div>
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default Mypage;