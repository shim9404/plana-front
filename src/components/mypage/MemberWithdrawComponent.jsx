import React, { useState } from 'react'
import { ConfigProvider, Input, message, Select, Typography } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import '../../styles/mypage.css';
import { TextButton } from '../common/PLA_Buttons';
import axiosInstance from '../../services/axiosInstance';
import { logoutApi } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import useProtectedNavigate from '../../hooks/useProtectedNavigate';
import { NAV_PRESET } from '../../utils/protectedNavPreset';

const MemberWithdrawComponent = ({ memberId, email, accessToken, logout, setSelectedMenu }) => {
  const navigate = useNavigate();
  const protectedNavigate = useProtectedNavigate();

  // 탈퇴 사유 초기 값
  const [withdrawReason, setWithdrawReason] = useState('');

  // 탈퇴할 회원 정보 초기 값
  const [objectWithdrawMember, setObjectWithdrawMember] = useState({
    email: "",
    name: "",
    password: ""
  })

  // 회원 탈퇴 함수
  const handleLogout = async () => { // 로그아웃
    try {
      await logoutApi({ email, accessToken });
    } catch (error) {
      console.error('로그아웃 API 실패:', error);
    } finally {
      logout();
      message.success('로그아웃되었습니다.');
      protectedNavigate(NAV_PRESET.HOME);
    }
  };

  const handleWithdrawMember = async () => { // 회원 탈퇴
    try {
      const uri = `/api/members/${memberId}/withdraw`;
      const body = {
        email: objectWithdrawMember.email,
        name: objectWithdrawMember.name,
        password: objectWithdrawMember.password
      };

      console.log(body)
      await axiosInstance.patch(uri, body);
      message.success("정상적으로 탈퇴되었습니다.")
      handleLogout();
    } catch (error) {
      console.log(error);
      message.error("회원 정보가 일치하지 않습니다. 다시 입력해주세요.")
    }
  }

  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <ProfileOutlined style={{ fontSize: '30px' }} />
        <span className="content-header__title">PLAN A 회원 탈퇴</span>
      </div>
      {/* 회원 탈퇴 주의문구 박스 */}
      <div className="withdraw-box">
        <Typography.Title level={4} style={{ color: 'red' }}>회원 탈퇴 주의사항!</Typography.Title>
        <p style={{ fontSize: '16px' }}>
          아래 정보가 모두 삭제되며, 한 번 삭제된 정보는 {' '}
          <span style={{ fontWeight: 700 }}>복구가 불가능</span>합니다.
        </p>
        <ul style={{ marginTop: '15px' }}>
          <li style={{ fontSize: '14px' }}>● 계정 및 프로필 정보</li>
          <li style={{ fontSize: '14px' }}>● 내 여행 계획 및 장소 저장 정보</li>
        </ul>
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          또한, 아래 정보는 회원 탈퇴 후에도 유지되며 삭제되지 않습니다.
        </p>
        <ul style={{ marginTop: '15px' }}>
          <li style={{ fontSize: '14px' }}>● 등록된 장소</li>
        </ul>
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          ▣ 소셜 계정 연동으로 가입한 경우, 계정 연동 또한 자동으로 해지됩니다.
        </p>
      </div>
      {/* 이메일, 이름, 비밀번호, 탈퇴 사유 입력 부분 */}
      <div className="edit_content3">
        <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '15px' }}>
          탈퇴할 회원 정보 확인
        </div>
        <div className="edit__row">
          <label>이메일</label>
          <Input className="edit__input" placeholder="이메일 입력"
            onChange={(e) => setObjectWithdrawMember({ ...objectWithdrawMember, email: e.target.value })} />
        </div>
        <div className="edit__row">
          <label>이름</label>
          <Input className="edit__input" placeholder="이름 입력"
            onChange={(e) => setObjectWithdrawMember({ ...objectWithdrawMember, name: e.target.value })} />
        </div>
        <div className="edit__row">
          <label>비밀번호</label>
          <Input.Password className="edit__input" placeholder="비밀번호 입력"
            onChange={(e) => setObjectWithdrawMember({ ...objectWithdrawMember, password: e.target.value })} />
        </div>
        <div className="edit__row">
          <label>탈퇴사유</label>
          <ConfigProvider theme={{
            components: {
              Select: {
                colorPrimary: '#aaa',
                colorPrimaryHover: '#aaa',
                colorBorder: '#aaa',
                controlOutline: 'rgba(0, 0, 0, 0)',
                optionSelectedBg: '#fafafa',
                optionActiveBg: '#fafafa',
                optionSelectedColor: '#000'
              }
            }
          }}>
            <Select className="edit__input" style={{ flex: 1 }} placeholder="선택해주세요"
              value={withdrawReason || undefined}
              onChange={(value) => setWithdrawReason(value)}
              options={[
                { value: '1', label: '서비스가 불편해요' },
                { value: '2', label: '사용 빈도가 낮아요' },
                { value: '3', label: '기능이 부족해요' },
                { value: '4', label: '콘텐츠가 불만이에요' },
                { value: '5', label: '개인정보를 삭제하고 싶어요' },
                { value: '6', label: '기타' },
              ]}
            />
          </ConfigProvider>
        </div>
        {/* 취소 및 회원 탈퇴 버튼 부분 */}
        <div className="withdraw-button-wrapper">
          <TextButton type="primary" width="80px" height="45px" fontSize="17px" onClickEvent={() => setSelectedMenu('1')}>
            취소
          </TextButton>
          <TextButton type="primary" width="180px" height="45px" fontSize="17px"
            onClickEvent={() => handleWithdrawMember()}>
            탈퇴 신청하기
          </TextButton>
        </div>
      </div>
    </>
  )
}

export default MemberWithdrawComponent
