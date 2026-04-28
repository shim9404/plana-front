import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Form, Input, message, Modal } from 'antd';
import { useModal } from '../../hooks/ModalProvider';
import styles from '../../styles/signup.module.css';
import { existsEmailApi, sendEmailApi, signupApi, verifyEmailApi } from '../../services/authApi';
import { existsNicknameApi } from '../../services/memberApi';
import { oneBtnPreset } from '../../utils/alertModalPreset'

// 비밀번호
// 새 비밀번호 영어 숫자 혼합 8~20자 맞는지 확인
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const SignUpModalComponent = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { openLoginModal, openOneBtnModal } = useModal();

  // 이메일 인증
  const [isEmailSent, setIsEmailSent] = useState(false);        // 전송 성공 여부 + 인증 번호 입력창 표시
  const [isVerified, setIsVerified] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);      // 이메일 전송 & 중복 체크 로딩
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false); // 검증 로딩
  const [emailStatus, setEmailStatus] = useState({ status: '', help: '' }); // 
  const [timeLeft, setTimeLeft] = useState(300); // 5분
  const startTimeRef = useRef(null);

  //#region 닉네임

  // 닉네임 변경 후 중복 확인 버튼 눌렀는지 확인용 -> true: 변경되었으므로 중복 확인 버튼 필수로 눌러야함
  const [isNicknameChange, setIsNicknameChange] = useState(true);
  // api 대기 
  const [nicknameLoading, setNicknameLoading] = useState(false);

  const onChangeNickname = (e) => {
    const value = e.currentTarget.value.replace(/\s/g, ''); // 공백 제거
    form.setFieldsValue({ nickname: value });

    if (!isNicknameChange) setIsNicknameChange(true); // 수정되면 다시 확인 필요
  };

  // 닉네임 중복 확인 API 연결 예정
  const handleNicknameDuplicateCheck = async () => {
    let changheNickname = form.getFieldValue('nickname');

    if (!changheNickname) { // 닉네임 존재 여부 확인
      message.warning("닉네임을 입력하세요.");
      return;
    }

    try {
      setNicknameLoading(true);
      const result = await existsNicknameApi(changheNickname);

      if (result) { // 새닉네임 사용 가능 확인
        message.success("사용 가능합니다.");
        setIsNicknameChange(false);
      } else {
        message.error("사용 불가능합니다.")
        setIsNicknameChange(true);
      }
    } catch (error) {
      message.error("사용 불가능합니다.")
      setIsNicknameChange(true);
      console.log(error);
    } finally {
      setNicknameLoading(false);
    }
  };
  //#endregion


  // 이메일 input이 변경될 때
  const onChangeEmail = () => {
    if (!isVerified && !isEmailSent) return; // 인증 완료 전에는 초기화 불필요

    // 다시 검증 필요
    setIsEmailSent(false);
    setIsVerified(false)
    setEmailStatus({ status: '', help: '' });
  }

  // 이메일 인증 발송
  const handleEmailSend = async () => {
    if (isVerified) return;

    try {
      await form.validateFields(['email']);
    } catch {
      return; // 검증 실패 시 중단 (에러 메시지는 validator가 표시)
    }

    // 인증 만료 시 다시 보내기를 누른 경우 초기화 필요
    if (isEmailSent) {
      form.setFieldsValue({ emailVertify: "" });
      setIsEmailSent(false);
      setEmailStatus({ status: '', help: '' });
    }

    const email = form.getFieldValue('email');

    setEmailLoading(true);
    try {
      await existsEmailApi(email);
      setEmailStatus({ status: 'success', help: '사용 가능한 이메일입니다.' });
    } catch {
      setEmailLoading(false);
      setEmailStatus({ status: 'error', help: '이미 가입된 이메일입니다.' });
      return;
    }
    try {
      await sendEmailApi(email);
      setIsEmailSent(true);
    } catch {
      setEmailStatus({ status: 'error', help: '잠시 후 다시 시도해 주세요.' });
    } finally {
      setEmailLoading(false);
    }
  }; // end of handleEmailSend

  // 이메일 인증번호 검증 
  const handleEmailVertify = async () => {
    const email = form.getFieldValue('email');
    const authCode = form.getFieldValue('emailVertify');
    setEmailVerifyLoading(true);
    try {
      await verifyEmailApi({ email, authCode });
      setTimeLeft(0);
      setIsVerified(true);
      form.setFieldsValue({ emailVertify: "" });
      setEmailStatus({ status: 'success', help: '이메일 인증이 완료되었습니다.' });
    } catch (e) {
      const errorCode = e.response?.data?.code;
      if (errorCode === 'E003') {
        message.error("인증시간이 만료되었습니다.");
      } else {
        message.error("인증번호가 일치하지 않습니다.");
      }
    } finally {
      setEmailVerifyLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setIsEmailSent(false);
    setIsVerified(false);
    setEmailStatus({ status: '', help: '' });
    setTimeLeft(300);
    setIsNicknameChange(true);
    onClose();
  };


  // 회원가입 완료 후 로그인 모달로 전환
  const handleRegisterSuccess = () => {
    handleClose();
    openLoginModal();
  };


  // 인증번호 타이머
  useEffect(() => {
    if (!isEmailSent) return;
    startTimeRef.current = Date.now(); // 시작 시각 저장
    setTimeLeft(300);

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(300 - elapsed, 0);
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [isEmailSent]);

  // 인증번호 시간 포맷팅
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // 회원가입 API 연결 예정 (rule이 다 통과되면 여기로 호출됨)
  const handleMemberRegisterSubmit = async () => {
    if (!isVerified) {
      setEmailStatus({ status: 'error', help: '이메일 인증을 완료해주세요.' });
      return;
    }

    if (isNicknameChange) {
      message.error("닉네임 중복 확인을 해주세요");
      return;
    }

    setSubmitting(true);

    const { email: formEmail, name, nickname, password } = form.getFieldsValue();
    const data = { email: formEmail, name, nickname, password };

    try {
      const result = await signupApi(data);
      if (result) {
        openOneBtnModal(oneBtnPreset.signupSuccess);
        handleRegisterSuccess();
      }
    } catch (e) {
      openOneBtnModal(oneBtnPreset.retryOver);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      transitionName="ant-fade"
      title="회원가입"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={400}
      styles={{
        header: { textAlign: 'center', paddingTop: '32px' },
        title: { fontSize: '20px', fontWeight: 400 },
        body: { position: 'relative', height: '550px', paddingTop: '10px' }
      }}
    >
      <Form form={form} layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} colon={false} requiredMark={false}
        onFinish={handleMemberRegisterSubmit}
        className={styles.signupForm}
        style={{ marginTop: '20px' }}
      >
        <Form.Item label="이메일" className={styles.InputCheckFormItem}>
          <div className={styles.InputCheckeRow} style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Form.Item
              name="email"
              validateStatus={emailStatus.status || undefined}  // 지정해놓은 툴팁 색상 보여주는 용도
              help={emailStatus.help || undefined}              // 지정해놓은 툴팁 메세지 보여주는 용도
              style={{ flex: 2, marginBottom: 0 }}
              className={styles.email}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) return Promise.reject(new Error('이메일을 입력하세요.'));
                    if (!EMAIL_REGEX.test(value)) return Promise.reject(new Error('올바른 이메일 형식이 아닙니다.'));
                    if (value.length > 255) return Promise.reject(new Error('최대 255자까지 입력 가능합니다.'));
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Input placeholder="이메일" autoComplete="off" onChange={onChangeEmail}
                style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
            </Form.Item>
            <Button type="default" disabled={isVerified || isEmailSent} loading={emailLoading} onClick={handleEmailSend} className={styles.InputCheckBtn} >
              인증
            </Button>
          </div>
        </Form.Item>
        {isEmailSent && !isVerified && (
          <Form.Item label=" " className={styles.InputCheckFormItem}
            extra={
              <div style={{ display: 'flex', width: '95%', justifyContent: 'space-between' }}>
                <span>
                  {timeLeft > 0
                    ? '인증 메일이 전송되었어요!'
                    : '인증 시간이 만료되었습니다. 다시 시도해주세요.'}
                </span>
                {timeLeft > 0 && (
                  <span style={{ color: '#ff4d4f' }}>
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            }>
            <div className={styles.InputCheckeRow} >
              <Form.Item name="emailVertify" noStyle rules={[{ required: true, message: '인증번호를 입력하세요.' }]}>
                <Input placeholder="이메일 인증 번호" autoComplete="off"
                  style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
              </Form.Item>
              <Button
                type="default"
                loading={emailVerifyLoading}
                onClick={handleEmailVertify}
                className={styles.InputCheckBtn}
              >
                확인
              </Button>
            </div>
          </Form.Item>
        )}
        <Form.Item name="password" label="비밀번호" style={{ marginTop: '30px' }}
          rules={[
            { required: true, message: '비밀번호를 입력하세요.' },
            { max: 20, message: '최대 20자까지 입력 가능합니다.' },
            { min: 8, message: '최소 8자부터 입력 가능합니다.' },
            {
              validator: (_, value) =>
                !value || PASSWORD_REGEX.test(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('영문자와 숫자를 포함해야 합니다.')),
            }
          ]}
        >
          <Input.Password placeholder="비밀번호" autoComplete="new-password"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
        </Form.Item>
        <Form.Item name="confirmPassword" label=" " style={{ marginTop: '10px' }} dependencies={['password']}
          rules={[
            { required: true, message: '비밀번호를 다시 입력하세요.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 서로 일치하지 않습니다.'));
              },
            }),
          ]}
          extra="영어 숫자 혼합 8~20자 특수문자(! @ # $ ...) 사용 가능"
        >
          <Input.Password placeholder="비밀번호 확인" autoComplete="new-password"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
        </Form.Item>
        <Form.Item name="name" label="이름" style={{ marginTop: '30px' }}
          rules={[
            { required: true, message: '이름을 입력하세요.' },
            { max: 50, message: '최대 50자까지 입력 가능합니다.' },
          ]}
        >
          <Input placeholder="이름"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
        </Form.Item>
        <Form.Item label="닉네임" className={styles.InputCheckFormItem} extra={
          !isNicknameChange ?
            <div>
              사용가능한 닉네임입니다.
            </div>
            : null
        }>
          <div className={styles.InputCheckeRow}>
            <Form.Item name="nickname" noStyle
              rules={[
                { required: true, message: '닉네임을 입력하세요.' },
                { max: 20, message: '최대 20자까지 입력 가능합니다.' }
              ]}
            >
              <Input placeholder="닉네임" maxLength={20} showCount onChange={onChangeNickname} style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
            </Form.Item>

            {isNicknameChange ?
              <Button type="default" loading={nicknameLoading} onClick={handleNicknameDuplicateCheck} className={styles.InputCheckBtn}>
                중복 확인
              </Button>
              :
              null
            }
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 18, offset: 3 }}
          style={{ position: 'absolute', bottom: '10px', width: '100%', marginTop: '40px', marginBottom: '12px' }}
        >
          <Button block htmlType="submit" loading={submitting} className={styles.submitFinishGray} >
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpModalComponent;