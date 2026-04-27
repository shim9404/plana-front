import { useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useModal } from '../../hooks/ModalProvider';
import styles from '../../styles/signup.module.css';
import { existsEmailApi, signupApi } from '../../services/authApi';
import { existsNicknameApi } from '../../services/memberApi';
import { oneBtnPreset } from '../../utils/alertModalPreset'

const SignUpModalComponent = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { openLoginModal, openOneBtnModal } = useModal();


  // 유저 이름
  const [userName, setUserName] = useState("");

  // 이메일 인증
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(null); // null: 미확인, true: 가능, false: 불가능
  const [emailStatus, setEmailStatus] = useState({ status: '', help: '' });

  // 비밀번호
  // 새 비밀번호 영어 숫자 혼합 8~20자 맞는지 확인
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,20}$/;

  // 입력한 비밀번호
  const [password, setPassword] = useState("");
  // 확인용 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //#region 닉네임

  // 입력한 닉네임
  const [nickname, setNickname] = useState("");
  // 닉네임 변경 후 중복 확인 버튼 눌렀는지 확인용 -> true: 변경되었으므로 중복 확인 버튼 필수로 눌러야함
  const [isNicknameChange, setIsNicknameChange] = useState(true);
  // api 대기 
  const [nicknameLoading, setNicknameLoading] = useState(false);

  const onChangeNickname = (e) => {
    setNickname(e.currentTarget.value);
    if (isNicknameChange == false) setIsNicknameChange(true);
  }

  const handleNicknameCheck = async (changheNickname) => {
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
  }

  // 닉네임 중복 확인 API 연결 예정
  const handleNicknameDuplicateCheck = async () => {
    handleNicknameCheck(nickname);
  };
  //#endregion

  //#region 비밀번호
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  }
  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.currentTarget.value);
  }

  //#endregion

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
    if (e.currentTarget.value !== confirmEmail) {
      setEmailAvailable(null);
      setEmailStatus({ status: '', help: '' });
    }
  }

  // 이메일 인증 발송 API 연결 예정
  const handleEmailVertify = async () => {
    setEmailLoading(true);
    try {
      const result = await existsEmailApi(email);
      if (result) {
        setEmailAvailable(true);
        setConfirmEmail(email);
        setEmailStatus({ status: 'success', help: '사용 가능한 이메일입니다.' });
      }
    } catch (e) {
      setEmailAvailable(false);
      setConfirmEmail("");
      setEmailStatus({ status: 'error', help: '이미 가입된 이메일입니다.' });
    }
    finally {
      setEmailLoading(false);
    }
  };

  const onChangeUseName = (e) => {
    setUserName(e.currentTarget.value);
  }

  const handleClose = () => {
    form.resetFields();
    form.setFields([]);
    onClose();
  };

  // 회원가입 완료 후 로그인 모달로 전환
  const handleRegisterSuccess = () => {
    handleClose();
    openLoginModal();
  };



  // 회원가입 API 연결 예정 (rule이 다 통과되면 여기로 호출됨)
  const handleMemberRegisterSubmit = async () => {

    if (emailAvailable == null || !emailAvailable) {
      message.error("이메일 인증을 해주세요");
      return;
    }

    if (isNicknameChange) {
      message.error("닉네임 중복 확인을 해주세요");
      return;
    }

    setSubmitting(true);

    const data = {
      email,          // { email: "값" }
      name: userName, // { name: "값" }
      nickname,
      password,
    }

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
        header: { textAlign: 'center', paddingTop: '20px' },
        title: { fontSize: '20px', fontWeight: 400 }
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        colon={false}
        requiredMark={false}
        onFinish={handleMemberRegisterSubmit}
        style={{ marginTop: '20px' }}
      >
        <Form.Item label="이메일" className={styles.InputCheckFormItem} >
          <div className={styles.InputCheckeRow} style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Form.Item
              name="email"
              validateStatus={emailStatus.status || undefined}  // 지정해놓은 툴팁 색상 보여주는 용도
              help={emailStatus.help || undefined}              // 지정해놓은 툴팁 메세지 보여주는 용도
              style={{ flex: 2, marginBottom: 0 }}
              className={styles.email}
              rules={[
                { required: true, message: '이메일을 입력하세요.' },
                { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
                { max: 255, message: '최대 255자까지 입력 가능합니다.' },
                {
                  validator: () =>
                    emailAvailable === true
                      ? Promise.resolve()
                      : Promise.reject(new Error('')), // 메시지는 emailStatus.help에서 표시하니까 빈 문자열
                }
              ]}
            >
              <Input placeholder="이메일" autoComplete="off" onChange={onChangeEmail}
                style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
            </Form.Item>
            <Button
              type="default"
              loading={emailLoading}
              onClick={handleEmailVertify}
              className={styles.InputCheckBtn}
            >
              인증
            </Button>
          </div>
        </Form.Item>
        {/* {emailCheck && (
          <Form.Item label=" " className={styles.InputCheckFormItem}
            extra="인증 메일이 전송되었어요!">
            <div className={styles.InputCheckeRow}>
              <Form.Item
                name="emailVertify"
                noStyle
                rules={[{ required: true, message: '인증번호를 입력하세요.' }]}
              >
                <Input placeholder="이메일 인증 번호" autoComplete="off"
                  style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
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
        )} */}
        <Form.Item
          name="password"
          label="비밀번호"
          style={{ marginTop: '30px', marginBottom: '0px' }}
          rules={[
            { required: true, message: '비밀번호를 입력하세요.' },
            { max: 20, message: '최대 20자까지 입력 가능합니다.' },
            { min: 8, message: '최소 8자부터 입력 가능합니다.' },
            {
              validator: (_, value) =>
                !value || regex.test(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('영문자와 숫자를 포함해야 합니다.')),
            }
          ]}
        >
          <Input.Password placeholder="비밀번호" autoComplete="new-password" onChange={onChangePassword}
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
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
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 서로 일치하지 않습니다.'));
              },
            }),
          ]}
          extra="영어 숫자 혼합 8~20자 특수문자(! @ # $ ...) 사용 가능"
        >
          <Input.Password placeholder="비밀번호 확인" autoComplete="new-password" onChange={onChangePasswordConfirm}
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
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
          <Input placeholder="이름" onChange={onChangeUseName}
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
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
              <Input placeholder="닉네임" onChange={onChangeNickname} maxLength={20} showCount
                style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
            </Form.Item>
            <Button
              type="default"
              loading={nicknameLoading}
              onClick={handleNicknameDuplicateCheck}
              className={styles.InputCheckBtn}
            >
              중복 확인
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 18, offset: 3 }}
          style={{ marginTop: '40px', marginBottom: '12px' }}
        >
          <Button
            block
            htmlType="submit"
            loading={submitting}
            className={styles.submitFinishGray}
          >
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpModalComponent;