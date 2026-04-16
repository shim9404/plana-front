import React, { useState } from 'react'
import { Button, Input } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import '../../styles/mypage.css';
import { TextButton } from '../common/PLA_Buttons';

{/* == 회원 정보 수정 콘텐츠 == */}
const MemberChangeComponent = ({memberItem, setSelectedMenu}) => {
  // 프로필 이미지 초기값
  const [profileImage, setProfileImage] = useState(memberItem.profileImage)
  
  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <ProfileOutlined style={{fontSize: 30}}/>
        <span className="content-header__title">회원 정보 수정</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="edit_content_1">
        {/* 프로필 변경 부분 */}
        <div className="profile-edit__image-section">
          <label style={{ width: '80px', fontWeight: 500}}>프로필</label>
          <div className="profile-edit__image-row">
            <div className="image-wrapper">
              <img className="profile-edit__image" src={profileImage || null}/>
              <Button className="image-btn" onClick={() => {setProfileImage(null)}}>
                X
              </Button>            
            </div>
              <TextButton type="primary" width="240px" height="40px" fontSize="15px">
                내 사진 바꾸기
              </TextButton>
          </div>
        </div>
        {/* 닉네임, 이름, 이름 변경 부분 */}
        <div className="edit__row">
          <label>닉네임</label>
          <Input className="edit__input" placeholder={memberItem.nickname} 
            maxLength={20} showCount/>
          <TextButton type="default" danger width="100px" height="40px" fontSize="15px">중복 확인</TextButton>
        </div>
        <div className="edit__row">
          <label>이메일</label>
          <Input className="edit__input" value={memberItem.email} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="edit__row">
          <label>이름</label>
          <Input className="edit__input" value={memberItem.name} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="edit__change">
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
