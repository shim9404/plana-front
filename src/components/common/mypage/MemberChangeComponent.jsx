import React from 'react'
import { Button, Input } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import '../../../styles/mypage.css';
import { TextButton } from '../PLA_Buttons';

import img1 from '../../../styles/image1.PNG';


{/* == 회원 정보 수정 콘텐츠 == */}
const MemberChangeComponent = ({memberItem, setSelectedMenu}) => {
  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <ProfileOutlined style={{fontSize: 30}}/>
        <span className="content-header__title">회원 정보 수정</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="profile-edit_content_1">
        {/* 프로필 변경 부분 */}
        <div className="profile-edit__image-section">
          <label style={{ width: '80px', fontWeight: '500'}}>프로필</label>
          <img className="profile-edit__image" 
            src={memberItem.profileImage || img1}/>
            <div className="profile-edit__image-buttons">
              <TextButton type="primary" width="150px" height="40px" fontSize="15px">내 사진 바꾸기</TextButton>
              <TextButton type="primary" width="80px" height="40px" fontSize="15px">초기화</TextButton>
            </div>
        </div>
        {/* 닉네임, 이름, 이름 변경 부분 */}
        <div className="profile-edit__row">
          <label>닉네임</label>
          <Input className="profile-edit__input" placeholder={memberItem.nickname} 
            maxLength={20} showCount/>
          <TextButton type="default" danger width="100px" height="40px" fontSize="15px">중복 확인</TextButton>
        </div>
        <div className="profile-edit__row">
          <label>이메일</label>
          <Input className="profile-edit__input" value={memberItem.email} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="profile-edit__row">
          <label>이름</label>
          <Input className="profile-edit__input" value={memberItem.name} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="profile-edit__change">
          <TextButton type="primary" width="480px" height="45px" fontSize="17px">
            프로필 변경하기
          </TextButton>
        </div>
      </div>
      {/* 회원 탈퇴 버튼 부분 */}
      <div className="withdraw-wrapper">
        <Button type="link" className = "withdraw-link" onClick={() => setSelectedMenu('3')}>
          회원 탈퇴
        </Button>
      </div>
    </>
  )
}

export default MemberChangeComponent
