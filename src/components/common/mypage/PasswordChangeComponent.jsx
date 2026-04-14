import React from 'react'
import { Input } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import '../../../styles/mypage.css';
import { TextButton } from '../PLA_Buttons';

{/* == 비밀번호 수정 콘텐츠 == */}
const PasswordChangeComponent = () => {
  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <KeyOutlined style={{fontSize: 30}}/>
        <span className="content-header__title">비밀번호 수정</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="profile-edit_content2">
        {/* 비밀번호 변경 부분 */}
        <div className="profile-edit__row">
          <label>현재 비밀번호</label>
          <Input.Password className="profile-edit__input" placeholder="현재 비밀번호"/>
        </div>
        <div className="profile-edit__row" style={{marginBottom: 15}}>
          <label>새 비밀번호</label>
          <Input.Password className="profile-edit__input" placeholder="새 비밀번호"/>
        </div>
        <div className="profile-edit__row">
          <label> </label>
          <div style={{ flex: 1 }}>
            <Input.Password className="profile-edit__input" placeholder="새 비밀번호 확인"/>
            <div style={{ color: '#aaa', fontSize: 14}}>
              영어 숫자 혼합 8~20자 특수문자(! @ # $ ...) 사용 가능
            </div>
          </div>
        </div>
        {/* 비밀번호 변경 버튼 부분 */}
        <div className="profile-edit__change">
          <TextButton type="primary" width="480px" height="45px" fontSize="17px">
            새 비밀번호로 변경하기
          </TextButton>
        </div>
      </div>
    </>
  )
}

export default PasswordChangeComponent
