import React, { useEffect, useState } from 'react'
import { Button, Input, Modal } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import '../../styles/mypage.css';
import { TextButton } from '../common/PLA_Buttons';

{/* == 회원 정보 수정 콘텐츠 == */}
const MemberChangeComponent = ({profileImage0, images, memberItem, setSelectedMenu}) => {
  // 프로필 이미지 초기값
  const [profileImage, setProfileImage] = useState("")
  useEffect(() => {
    if (memberItem) {
      setProfileImage(memberItem.profileImage);
    }
  }, [memberItem]);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // 모달 창 OPEN  

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
              <img className="profile-edit__image" src={profileImage || profileImage0}/>
              <Button className="image-btn" onClick={() => {setProfileImage(profileImage0)}}>
                X
              </Button>            
            </div>
              <TextButton type="primary" width="240px" height="40px" fontSize="15px" 
              onClickEvent={() => {setProfileModalOpen(true)}}>
                내 사진 바꾸기
              </TextButton>
          </div>
          <Modal
            open={profileModalOpen}
            title="프로필 이미지 선택"
            footer={null}
            onCancel={() => setProfileModalOpen(false)}
            width={400}
            styles={{body: { display: 'flex', justifyContent: 'center', padding: '12px'}}}
          >
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 110px)', gap: '10px', width: 'fit-content'}}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => {
                    setProfileImage(img);
                    setProfileModalOpen(false);
                  }}
                  className='profile-select-image'
                />
              ))}
            </div>
          </Modal>
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
