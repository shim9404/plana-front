import React, { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd';
import styles from '../../styles/signup.module.css';

const SignUpModalComponent = ({open, onClose, form, submitting, setSubmitting, onRegisterSuccess}) => {

  // 회원 가입 정보 등록
  const handleMemberRegisterSubmit = () => { // 회원 가입 버튼 클릭 (TODO: 회원가입 데이터 저장)
  } 
  

  // 이메일 인증
  const [emailCheck, setEmailCheck] = useState(false)
  const [emailVertifying, setNiEmailVertifying] = useState(false)
  const handleEmailVertify = async () => {  
  }

  // 닉네임 중복 체크
  const [nicknameChecking, setNicknameChecking] = useState(false) 
  const handleNicknameDuplicateCheck = async () => {  
  }

  return (
    <>
    <Modal
      title="회원가입"
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
      styles={{ 
        header: { textAlign: 'center', paddingTop: '20px' }, 
        title: { fontSize: '20px', fontWeight: 400} }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}     
        wrapperCol={{ span: 19 }} 
        colon={false}
        requiredMark={false}
        onFinish={handleMemberRegisterSubmit}
        style={{ marginTop: '20px' }}>
        <Form.Item label="이메일" className={styles.InputCheckFormItem}>
          <div className={styles.InputCheckeRow}>
            <Form.Item
              name="email"
              noStyle
              rules={[
                { required: true, message: '이메일을 입력하세요.' },
                { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
                { max: 255, message: '최대 255자까지 입력 가능합니다.' },
              ]}
            >
              <Input placeholder="이메일" autoComplete="off"
                style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px'}}/>
            </Form.Item>
            <Button
              type="default"
              onClick={()=>setEmailCheck(true)}
              className={styles.InputCheckBtn}
            >
              인증
            </Button>
          </div>
        </Form.Item>
        { emailCheck && (
          <Form.Item label=" " className={styles.InputCheckFormItem} 
            extra="인증 메일이 전송되었어요!">
            <div className={styles.InputCheckeRow}>
              <Form.Item
                name="emailVertify"
                noStyle
                rules={[
                  { required: true, message: '인증번호를 입력하세요.' },
                ]}
              >
                <Input placeholder="이메일 안증 번호" autoComplete="off"
                  style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px'}}/>
              </Form.Item>
              <Button
                type="default"
                loading={emailVertifying}
                onClick={handleEmailVertify}
                className={styles.InputCheckBtn}
              >
                확인
              </Button>
            </div>
          </Form.Item>
          )
        }
        <Form.Item
          name="password"
          label="비밀번호"
          style={{ marginTop: '30px', marginBottom: '0px' }}
          rules={[
            { required: true, message: '비밀번호를 입력하세요.' },
            { max: 20, message: '최대 20자까지 입력 가능합니다.' },
            { min: 8, message: '최소 8자부터 입력 가능합니다.' },
          ]}
        >
          <Input.Password placeholder="비밀번호" autoComplete="new-password"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }}/>
        </Form.Item>
        <Form.Item 
          name="confirmPassword"
          label=" "
          style={{ marginTop: '10px', marginBottom: '0px' }}
          dependencies={['password']}
          rules={[
            { required: true, message: '비밀번호를 재입력하세요.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('비밀번호가 서로 일치하지 않습니다.')
                )
              },
            }),
          ]}
          extra="영어 숫자 혼합 8~20자 특수문자(! @ # $ ...) 사용 가능"
        >
          <Input.Password placeholder="비밀번호 확인" autoComplete="new-password"
          style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }}/>
        </Form.Item>
        <Form.Item
          name="name"
          label="이름"
          style={{ marginTop: '30px', marginBottom: '0px' }}
          rules={[
            { required: true, message: '이름을 입력하세요.' },
            { max: 50, message: '최대 50자까지 입력 가능합니다.' },
          ]}
        >
          <Input placeholder="이름"
          style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }}/>
        </Form.Item>
        <Form.Item label="닉네임" className={styles.InputCheckFormItem}>
          <div className={styles.InputCheckeRow}>
            <Form.Item
              name="nickname"
              noStyle
              rules={[
                { required: true, message: '닉네임을 입력하세요.' },
                { max: 20, message: '최대 20자까지 입력 가능합니다.' },
              ]}
            >
              <Input placeholder="닉네임" maxLength={20} showCount
              style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }}/>
            </Form.Item>
            <Button
              type="default"
              loading={nicknameChecking}
              onClick={handleNicknameDuplicateCheck}
              className={styles.InputCheckBtn}
            >
              중복 확인
            </Button>
          </div>
        </Form.Item>
        <Form.Item 
          wrapperCol={{ span: 18, offset: 3 }}
          style={{ marginTop: '40px', marginBottom: '12px' }}>
          <Button
            block
            htmlType="submit"
            loading={submitting}
            className={styles.submitFinishGray}
            onClick={() => {
              onClose();
              onRegisterSuccess?.();
            }}
          >
            가입하기
          </Button>
        </Form.Item>
      </Form>  
    </Modal>
    </>
  )
}

export default SignUpModalComponent
