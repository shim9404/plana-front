import React, { useState } from 'react'
import { ConfigProvider, Input, Select, Typography } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import '../../../styles/mypage.css';
import { TextButton } from '../PLA_Buttons';

const MemberWithdrawComponent = ({setSelectedMenu}) => {
  // 탈퇴 사유 초기 값
  const [withdrawReason, setWithdrawReason] = useState('');

  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <ProfileOutlined style={{fontSize: 30}}/>
        <span className="content-header__title">PLAN A 회원 탈퇴</span>
      </div>      
      {/* 회원 탈퇴 주의문구 박스 */}
      <div className="withdraw-box">
        <Typography.Title level={4} style={{color: 'red'}}>회원 탈퇴 주의사항!</Typography.Title>
        <p style={{ fontSize: '16px' }}>
          아래 정보가 모두 삭제되며, 한 번 삭제된 정보는 {' '}
            <span style={{ fontWeight: 700 }}>복구가 불가능</span>합니다.
        </p>
        <ul style={{marginTop: 15}}>
          <li style={{ fontSize: '14px' }}>● 계정 및 프로필 정보</li>
          <li style={{ fontSize: '14px' }}>● 내 여행 계획 및 장소 저장 정보</li>
        </ul>
        <p style={{ fontSize: '16px', marginTop: 20}}>
          또한, 아래 정보는 회원 탈퇴 후에도 유지되며 삭제되지 않습니다.
        </p>
        <ul style={{marginTop: 15}}>
          <li style={{ fontSize: '14px' }}>● 등록된 장소</li>
        </ul>
        <p style={{ fontSize: '16px', marginTop: 20}}>
          ▣ 소셜 계정 연동으로 가입한 경우, 계정 연동 또한 자동으로 해지됩니다.
        </p>  
      </div>   
      {/* 이메일, 이름, 비밀번호, 탈퇴 사유 입력 부분 */}    
      <div className="profile-edit_content3">
        <div style={{fontSize: 20, fontWeight: 600, marginBottom: 15}}>
          탈퇴할 회원 정보 확인
        </div>
        <div className="profile-edit__row">
          <label>이메일</label>
          <Input className="profile-edit__input" placeholder="이메일 입력"/>
        </div>
        <div className="profile-edit__row">
          <label>이름</label>
          <Input className="profile-edit__input" placeholder="이름 입력"/>
        </div>
        <div className="profile-edit__row">
          <label>비밀번호</label>
          <Input.Password className="profile-edit__input" placeholder="비밀번호 입력"/>
        </div>
        <div className="profile-edit__row">
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
                  optionSelectedColor: '#000'}}}}>
              <Select className="profile-edit__input" style={{ flex: 1 }} placeholder="선택해주세요"
                value={withdrawReason}
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
          <TextButton type="primary" width="80px" height="45px" fontSize="17px" onClick={() => setSelectedMenu('1')}> 
            취소 
          </TextButton>
          <TextButton type="primary" width="180px" height="45px" fontSize="17px"> 
            탈퇴 신청하기
          </TextButton>
        </div>
      </div>
    </>
  )
}

export default MemberWithdrawComponent
