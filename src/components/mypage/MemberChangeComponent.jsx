import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal } from 'antd';
import { ProfileOutlined, SmileOutlined } from '@ant-design/icons';
import '../../styles/mypage.css';
import { TextButton } from '../common/PLA_Buttons';
import axiosInstance from '../../services/axiosInstance';
import ProfileMarkerImage from "../../components/mypage/ProfileMarkerImage";

{/* == 회원 정보 수정 콘텐츠 == */}
const MemberChangeComponent = ({memberId, objectMemberItem, getMember, setSelectedMenu}) => {
  // 프로필 이미지 초기값
  const [profileImage, setProfileImage] = useState("")
  useEffect(() => {
    if (objectMemberItem) {
      setProfileImage(objectMemberItem.profileImage);
    }
  }, [objectMemberItem]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // 모달 창 OPEN  

  // 닉네임 초기값
  const [nickname, setNickname] = useState(""); 
  useEffect(() => { 
    setNickname(objectMemberItem.nickname);
  }, [objectMemberItem])

  // 닉네임 중복 확인 함수
  const [isNicknameDupli, setIsNicknameDupli] = useState(false); // true: 중복(프로필 변경 불가능) / false: 중복 x
  const [isNicknameChange, setIsNicknameChange] = useState(false); // 닉네임 변경 후 중복 확인 버튼 눌렀는지 확인용 -> true: 변경되었으므로 중복 확인 버튼 필수로 눌러야함
  const handleNicknameCheck = async(changheNickname) => {
    if (!changheNickname) { // 닉네임 존재 여부 확인
      message.warning("닉네임을 입력하세요.");
      setIsNicknameDupli(true);
      return;
    } else if (objectMemberItem.nickname === changheNickname) { // 동일 닉네임 확인
      message.warning("동일 닉네임입니다.");
      setIsNicknameDupli(false);
      return;
    }

    try {
      const uri = `/api/members/nickname/check?nickname=${changheNickname}`;
      const result = await axiosInstance.get(uri, null);
      const newNickname = result.data.data.newNickname;

      if (newNickname) { // 새닉네임 사용 가능 확인
        message.success("사용 가능합니다.");
        setIsNicknameDupli(false);
      } 
    } catch (error) {
      console.log(error);
      message.error("사용 불가능합니다.")
      setIsNicknameDupli(true);
    }
  }

  // 회원 정보 수정
  const handleUpdateMember = async () => {
    try {
      if (isNicknameDupli) {
        message.warning("변경이 불가능합니다. 닉네임을 확인해주세요.");
        return;
      } else if (isNicknameChange) {
        message.warning("변경이 불가능합니다. 닉네임 중복 확인해주세요.");
        return;
      }

      const uri = `/api/members/${memberId}`;
      const body = {
        nickname: nickname,
        profileImage: profileImage
      };
      
      await axiosInstance.patch(uri, body);
      message.success("변경되었습니다.")
      getMember();
    } catch (error) {
      console.log(error);
      message.error("변경이 불가능합니다.")
    }
  }

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
              <ProfileMarkerImage
                    number={parseInt((profileImage || "profileImage1").replace("profileImage", ""), 10)} active={2}/>
              <Button className="image-btn" onClick={() => {setProfileImage(objectMemberItem.profileImage)}}>
                X
              </Button>            
            </div>
              <TextButton type="primary" width="240px" height="40px" fontSize="15px" 
              onClickEvent={() => {setIsProfileModalOpen(true)}}>
                내 사진 바꾸기
              </TextButton>
          </div>
          <Modal
            open={isProfileModalOpen}
            title="프로필 이미지 선택"
            footer={null}  
            onCancel={() => setIsProfileModalOpen(false)}
            width={400}
            styles={{body: { display: 'flex', justifyContent: 'center', padding: '12px'}}}
          >
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 110px)', gap: '10px', width: 'fit-content'}}>
              {[1,2,3,4,5,6,7,8,9].map((num) => (
                <div
                  key={num}
                  onClick={() => {
                    setProfileImage(`profileImage${num}`);
                    setIsProfileModalOpen(false);}}
                  style={{ cursor: "pointer" }}
                >
                  <ProfileMarkerImage
                    number={num} active={2}/>
                </div>
              ))}
            </div>
          </Modal>
        </div>
        {/* 닉네임 변경 부분 */}
        <div className="edit__row">
          <label>닉네임</label>
          <Input className="edit__input"  maxLength={15} showCount
            value={nickname || ""} 
            onChange={(e) => {
              setNickname(e.target.value); 
              setIsNicknameChange(true);}}/>
          <TextButton type="default" danger width="100px" height="40px" fontSize="15px"
            onClickEvent={()=> {
            handleNicknameCheck(nickname)
              setIsNicknameChange(false);}}>
            중복 확인
          </TextButton>
        </div>
        <div className="edit__row">
          <label>이메일</label>
          <Input className="edit__input" value={objectMemberItem.email} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="edit__row">
          <label>이름</label>
          <Input className="edit__input" value={objectMemberItem.name} style={{background: '#fff', color: '#aaa'}} disabled/>
        </div>
        <div className="edit__change">
          <TextButton type="primary" width="480px" height="45px" fontSize="17px"
            onClickEvent={()=>handleUpdateMember()}>
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
