import React, { useState } from 'react'
import { Input, message } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import '../../styles/mypage.css';
import { TextButton } from '../common/PLA_Buttons';
import axiosInstance from '../../services/axiosInstance';

{/* == 비밀번호 수정 콘텐츠 == */}
const PasswordChangeComponent = ({memberId, setSelectedMenu}) => {
  // 현재 비밀번호 초기값
  const [currentPassword, setCurrentPassword] = useState("");
  // 새 비밀번호 초기값
  const [newPassword, setNewPassword] = useState("");
  // 새 비밀번호 확인 초기값
  const [newPassword2, setNewPassword2] = useState("");

  // 현재 비밀번호와 현재 비밀번호 일치 확인
  const isCompare = currentPassword && newPassword && currentPassword === newPassword; // true: 일치(변경 불가능) / false: 불일치

  // 새 비밀번호 영어 숫자 혼합 8~20자 맞는지 확인
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,20}$/;
  const isPasswordError = newPassword && !regex.test(newPassword); // true: 규칙 틀림(변경 불가능) / false: 규칙 맞음

  // 새 비밀번호와 새 비밀번호 일치 확인
  const isCompareError = newPassword2 && newPassword !== newPassword2; // true: 불일치(변경 불가능) / false: 일치

  // 새 비밀번호 변경
  const handleChangePassword = async () => {
    try {
      if(isCompare) {
        message.warning("현재 비밀번호와 새 비밀번호가 서로 일치합니다. 다시 입력해주세요.");
        return;
      } else if (isPasswordError) {
        message.warning("영어, 숫자 혼합 8~20자여야 합니다. 다시 입력해주세요.");
        return;
      } else if (isCompareError) {
        message.warning("새 비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.");
        return;
      }

      const uri = `/api/members/${memberId}/password`;
      const body = {
        currentPassword: currentPassword,
        newPassword: newPassword
      };
      
      await axiosInstance.patch(uri, body);
      message.success("비밀번호가 변경되었습니다.")
      setSelectedMenu('1')
    } catch (error) {
      console.log(error);
      message.error("현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
    }
  }

  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <KeyOutlined style={{fontSize: '30px'}}/>
        <span className="content-header__title">비밀번호 수정</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="edit_content2">
        {/* 비밀번호 변경 부분 */}
        <div className="edit__row">
          <label>현재 비밀번호</label>
          <Input.Password className="edit__input" placeholder="현재 비밀번호"
            onChange={(e) => setCurrentPassword(e.target.value)}/>
        </div>
        <div className="edit__row" style={{marginBottom: '15px'}}>
          <label>새 비밀번호</label>
          <Input.Password className="edit__input" placeholder="새 비밀번호"
            onChange={(e) => setNewPassword(e.target.value)}/>
        </div>
        <div className="edit__row">
          <label> </label>
          <div style={{ flex: 1 }}>
            <Input.Password className="edit__input" placeholder="새 비밀번호 확인"
              onChange={(e) => {setNewPassword2(e.target.value);}}/>
            {isCompareError && (
              <div style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
                새 비밀번호와 일치하지 않습니다.
              </div>
            )}
            <div style={{ color: '#aaa', fontSize: '14px'}}>
              영어, 숫자 혼합 8~20자 특수문자(! @ # $ ...) 사용 가능
            </div>
          </div>
        </div>
        {/* 비밀번호 변경 버튼 부분 */}
        <div className="edit__change">
          <TextButton type="primary" width="480px" height="45px" fontSize="17px"
            onClickEvent={() => handleChangePassword()}>
            새 비밀번호로 변경하기
          </TextButton>
        </div>
      </div>
    </>
  )
}

export default PasswordChangeComponent
