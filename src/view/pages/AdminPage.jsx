import React, { useEffect, useState } from 'react'

import PageLayout from "../../components/common/PageLayout";
import MemberList from '../../components/admin/member/MemberList'
import UsageOverview from '../../components/admin/analytics/UsageOverview'
import UserStatistics from '../../components/admin/analytics/UserStatistics'
import RegionSearchStatistics from '../../components/admin/analytics/RegionSearchStatistics'
import SearchKeywordStatistics from '../../components/admin/analytics/SearchKeywordStatistics'
import UsageStatistics from '../../components/admin/analytics/UsageStatistics'
import '../../styles/global.css'
import '../../styles/adminPage.css'
import {
  Flex,
  Layout,
  theme,
  Typography,
} from 'antd'
import {
  Activity,
  ChartColumn,
  ClipboardList,
  FileUp,
  LayoutDashboard,
  LineChart,
  List,
  Map,
  MapPinned,
  Search,
  Users,
} from 'lucide-react'
import { SettingOutlined } from '@ant-design/icons'
import { FlexBox, TextBox } from '../../components/common/PLA_FlexBox';
import { useAuth } from '../../hooks/AuthContext';
import ProfileMarkerImage from '../../components/mypage/ProfileMarkerImage';

/** localStorage `profile_image`(서버 pds 파일명) 없으면 기본 아바타 */
function getAdminSidebarProfileSrc(springBaseUrl) {
  const name = localStorage.getItem('profile_image')?.trim()
  if (!name || name === 'null' || name === 'undefined') {
    return adminAvatar
  }
  return `${springBaseUrl}/pds/${name}`
}

const { Content, Sider } = Layout

const menuIconProps = { size: 14, strokeWidth: 2, 'aria-hidden': true }
const DEFAULT_MENU_KEY = '1'

const items2 = [
  {
    key: 'sub1',
    label: '이용현황',
    icon: <Activity {...menuIconProps} />,
    children: [
      { key: '1', label: '요약', icon: <LayoutDashboard {...menuIconProps} /> },
      { key: '2', label: '이용자 통계', icon: <ChartColumn {...menuIconProps} /> },
      { key: '3', label: '지역 검색 통계', icon: <MapPinned {...menuIconProps} /> },
      { key: '4', label: '검색어 통계', icon: <Search {...menuIconProps} /> },
      { key: '5', label: '이용 통계', icon: <LineChart {...menuIconProps} /> },
    ],
  },
  {
    key: 'sub2',
    label: '회원관리',
    icon: <Users {...menuIconProps} />,
    children: [
      { key: '6', label: '회원목록', icon: <ClipboardList {...menuIconProps} /> },
    ],
  },

  {
    key: 'sub3',
    label: '장소관리',
    icon: <Map {...menuIconProps} />,
    children: [
      { key: '7', label: '장소목록', icon: <List {...menuIconProps} /> },
      { key: '8', label: '파일 업로드(.csv)', icon: <FileUp {...menuIconProps} /> },
    ],
  },
]

const pageTitleMap = {
  '1': '요약',
  '2': '이용자 통계',
  '3': '지역 검색 통계',
  '4': '검색어 통계',
  '5': '이용 통계',
  '6': '회원목록',
  '7': '장소목록',
  '8': '파일 업로드(.csv)',
}

/** 메뉴 키별 본문 영역 안내 (추후 각 페이지 컴포넌트로 교체 가능) */
const contentDescriptionMap = {
  '1': '서비스 이용 현황을 한눈에 볼 수 있는 요약 화면입니다.',
  '2': '이용자 수·접속 등 통계를 확인하는 화면입니다.',
  '3': '지역별 검색 현황 통계를 확인하는 화면입니다.',
  '4': '인기 검색어 등 검색어 통계를 확인하는 화면입니다.',
  '5': '이용 패턴·기간별 이용 통계를 확인하는 화면입니다.',
  '6': '등록된 회원 목록을 조회·검색·관리하는 화면입니다.',
  '7': '등록된 장소 목록을 조회·관리하는 화면입니다.',
  '8': 'CSV 파일을 선택해 장소 데이터를 일괄 업로드하는 화면입니다.',
}

/** Breadcrumb 중간 구간: 이용현황(1~5) / 회원관리(6) / 장소관리(7·8) */
const breadcrumbParentMap = {
  '1': '이용현황',
  '2': '이용현황',
  '3': '이용현황',
  '4': '이용현황',
  '5': '이용현황',
  '6': '회원관리',
  '7': '장소관리',
  '8': '장소관리',
}

/** 사이드에서 선택한 메뉴 키에 맞는 본문 영역 */
function renderAdminMainContent(menuKey, { onNavigate }) {
  switch (menuKey) {
    case '1':
      return <UsageOverview onNavigate={onNavigate} />
    case '2':
      return <UserStatistics />
    case '3':
      return <RegionSearchStatistics />
    case '4':
      return <SearchKeywordStatistics />
    case '5':
      return <UsageStatistics />
    case '6':
      return <MemberList />
    case '7':
      return (
        <div style={{ display:'flex', height:'100%', justifyContent:'flex-start', alignItems:'center', flexDirection:'column'}}>
          <div style={{ height:'80%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <div style={{ weight:500, height:'none', color:"#A8A8A8", padding:'12px' ,fontSize:"48px"}}>{pageTitleMap['7']}</div>
            <div style={{ weight:500, height:'none',color:"#A8A8A8", fontSize:"30px"}}> {contentDescriptionMap['7']} </div>
            <div style={{ weight:500, height:'none',color:"#A8A8A8", fontSize:"24px"}}>
              장소 목록 화면은 준비 중입니다.
            </div>
          </div>
        </div>
      )
    case '8':
      return (
        <div style={{ display:'flex', height:'100%', justifyContent:'flex-start', alignItems:'center', flexDirection:'column'}}>
          <div style={{ height:'80%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <div style={{ weight:500, height:'none', color:"#A8A8A8", padding:'12px' ,fontSize:"48px"}}>{pageTitleMap['8']}</div>
            <div style={{ weight:500, height:'none',color:"#A8A8A8", fontSize:"30px"}}> {contentDescriptionMap['8']} </div>
            <div style={{ weight:500, height:'none',color:"#A8A8A8", fontSize:"24px"}}>
              CSV 업로드 화면은 준비 중입니다.
            </div>
          </div>
        </div>
      )
    default:
      return <UsageOverview onNavigate={onNavigate} />
  }
}

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

const AdminPage = () => {
  const [selectedKeys, setSelectedKeys] = useState([DEFAULT_MENU_KEY])
  const [openSubKeys, setOpenSubKeys] = useState(() => ['sub1', 'sub2', 'sub3'])
  const { token } = theme.useToken()
  const { username, email, profileImage } = useAuth();
  const { colorText, colorTextSecondary } = token

  const key = selectedKeys[0]
  const currentParentTitle =
    breadcrumbParentMap[key] ?? breadcrumbParentMap[DEFAULT_MENU_KEY]
  const currentPageTitle = pageTitleMap[key] ?? pageTitleMap[DEFAULT_MENU_KEY]

  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* == 사이드 영역 == */}
        <Sider width={'300px'} theme="light">
          <FlexBox vertical align='start'>
            {/* 상단 프로필 박스 */}
            <FlexBox h='15%' align='center' className="top-area" >
              {/* 프로필 박스 */}
              <FlexBox h='none' className="profile-box">
                <ProfileMarkerImage
                  number={parseInt((profileImage || "profileImage1").replace("profileImage", ""), 10)} active={1} />
                <div className="profile-info">
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: colorText,
                      lineHeight: 1.35,
                    }}
                  >
                    PLAN A 관리자 페이지
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: colorText,
                      marginTop: 4,
                      lineHeight: 1.35,
                    }}
                  >
                    {username ? `${username}님` : '관리자님'}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: colorTextSecondary,
                      marginTop: 4,
                      wordBreak: 'break-all',
                    }}
                  >
                    {email || '—'}
                  </div>
                </div>
              </FlexBox>
            </FlexBox>
            {/* 메뉴 (Ant Design Menu 대신 DOM + 클릭 핸들러) */}
            <FlexBox w='80%' h='85%' className="admin-list">
              <nav className="admin-nav" aria-label="관리자 사이드 메뉴" style={{ flex: 1, borderInlineEnd: 0, overflow: 'auto' }} >
                {items2.map((group) => {
                  const isOpen = openSubKeys.includes(group.key)
                  return (
                    <div key={group.key} className="admin-sub">
                      <button
                        type="button"
                        className="admin-sub-title"
                        onClick={() => {
                          setOpenSubKeys((prev) =>
                            prev.includes(group.key)
                              ? prev.filter((k) => k !== group.key)
                              : [...prev, group.key],
                          )
                        }}
                        aria-expanded={isOpen}
                      >
                        {group.icon}
                        <span className="menu-text">{group.label}</span>
                        <span className="admin-sub-chevron" aria-hidden>
                          {isOpen ? '▼' : '▶'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="admin-sub-children">
                          {group.children.map((item) => {
                            const selected = selectedKeys[0] === item.key
                            return (
                              <div
                                key={item.key}
                                role="button"
                                tabIndex={0}
                                className={`admin-sub-item${selected ? ' active' : ''}`}
                                onClick={() => setSelectedKeys([item.key])}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    setSelectedKeys([item.key])
                                  }
                                }}
                              >
                                {item.icon}
                                <span className="menu-text">{item.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </FlexBox>
          </FlexBox>
        </Sider>
        {/* == 콘텐츠 영역 == */}
        <Content style={contentStyle}>
          <FlexBox vertical h='100%'>
            {/* navgation */}
            <FlexBox h='10%' className="admin-content-space">
              <nav className="admin-breadcrumb" aria-label="현재 위치">
                <ol className="admin-breadcrumb__list">
                  <li className="admin-breadcrumb__item">
                    <span className="admin-breadcrumb__segment admin-breadcrumb__segment--root">
                      <SettingOutlined
                        className="admin-breadcrumb__icon"
                        aria-hidden
                      />
                      <span>관리자페이지</span>
                    </span>
                  </li>
                  <li className="admin-breadcrumb__sep" aria-hidden>
                    &gt;
                  </li>
                  <li className="admin-breadcrumb__item">
                    <span className="admin-breadcrumb__segment">
                      {currentParentTitle}
                    </span>
                  </li>
                  <li className="admin-breadcrumb__sep" aria-hidden>
                    &gt;
                  </li>
                  <li className="admin-breadcrumb__item">
                    <span
                      className="admin-breadcrumb__segment admin-breadcrumb__segment--current"
                      aria-current="page"
                    >
                      {currentPageTitle}
                    </span>
                  </li>
                </ol>
              </nav>
            </FlexBox>
            <FlexBox vertical h='90%' className="admin-main-content">
              {renderAdminMainContent(key, {
                onNavigate: (menuKey) => setSelectedKeys([menuKey]),
              })}
            </FlexBox>
          </FlexBox>
        </Content>
      </Layout>
    </PageLayout>
  )
}

export default AdminPage