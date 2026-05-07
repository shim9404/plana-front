import { App, Button, Form, Input, Modal, Alert } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useModal } from '../../hooks/ModalProvider';
import { loginApi } from '../../services/authApi';
import styles from '../../styles/login.module.css';

const LoginModalComponent = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { login } = useAuth();
  const { openSignupModal } = useModal();
  const { message } = App.useApp();

  // 값 입력 감시용
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);

  const handleFinish = async (values) => {
    setSubmitting(true);
    setLoginError('');
    try {
      const result = await loginApi({
        email: values.email.trim(),
        password: values.password,
      });
      login(result.data, values.email);
      message.success('로그인되었습니다.');
      handleClose();
    } catch (error) {
      const status = error?.response?.status;
      const body = error?.response?.data;
      const msg = body?.message || body?.detail || null;
      setLoginError(
        msg || (status === 401
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    form.setFields([]);
    setLoginError('');
    onClose();
  };

  const handleSignUp = () => {
    handleClose();
    openSignupModal();
  };

  const naverLogin = () => message.info('naver login');
  const kakaoLogin = () => message.info('kakao login');
  const googleLogin = () => message.info('google login');

  return (
    <Modal
      transitionName="ant-fade"
      title="로그인"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={300}
      styles={{
        header: { textAlign: 'center', paddingTop: '20px' },
        title: { fontSize: '20px', fontWeight: 400 }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          name="email"
          style={{ marginBottom: '10px' }}
          rules={[
            { required: true, message: '이메일을 입력하세요.' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
          ]}
          className={styles.smallError}
        >
          <Input placeholder="이메일" autoComplete="username"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
        </Form.Item>
        <Form.Item
          name="password"
          style={{ marginTop: '0px', marginBottom: '0px' }}
          rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}
          className={styles.smallError}
        >
          <Input.Password placeholder="비밀번호" autoComplete="current-password"
            style={{ height: '35px', boxShadow: '0 2px 2px rgba(0,0,0,0.2)', fontSize: '12px' }} />
        </Form.Item>
        <Form.Item style={{ marginTop: '0px', marginBottom: '0px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              type="link"
              size="small"
              style={{ height: 'auto', fontSize: '10px' }}
              onClick={() => message.info('비밀번호 찾기 기능은 준비 중입니다.')}
            >
              비밀번호를 잊어버리셨나요?
            </Button>
          </div>
        </Form.Item>
        {loginError && (
          <Alert
            type="error"
            showIcon
            title={loginError}
            style={{ marginBottom: '12px' }}
          />
        )}
        <Form.Item style={{ marginTop: '0px', marginBottom: '12px' }}>
          <Button
            block
            htmlType="submit"
            loading={submitting}
            disabled={!email || !password}
            className={!email || !password? styles.submitGrayDisabled : styles.submitGray}
          >
            로그인
          </Button>
        </Form.Item>
        {/* <Form.Item style={{ marginBottom: '0px' }}>
          <div className={styles.snsCaption} style={{ display: 'flex', justifyContent: 'center' }}>
            SNS 계정으로 시작하기
          </div>
        </Form.Item>
        <Form.Item style={{ marginTop: '0px', marginBottom: '8px' }}>
          <Button block htmlType="button" className={styles.submitNaver} onClick={naverLogin}>
            네이버 계정으로 시작
          </Button>
        </Form.Item>
        <Form.Item style={{ marginTop: '0px', marginBottom: '8px' }}>
          <Button block htmlType="button" className={styles.submitKakao} onClick={kakaoLogin}>
            카카오 계정으로 시작
          </Button>
        </Form.Item>
        <Form.Item style={{ marginTop: '0px', marginBottom: '12px' }}>
          <Button block htmlType="button" className={styles.submitGoogle} onClick={googleLogin}>
            구글 계정으로 시작
          </Button>
        </Form.Item> */}
        <Form.Item style={{ marginBottom: '0px' }}>
          <div className={styles.snsCaption} style={{ display: 'flex', justifyContent: 'center' }}>
            아직 계정이 없으신가요?
          </div>
        </Form.Item>
        <Form.Item style={{ marginTop: '0px', marginBottom: '12px' }}>
          <Button block htmlType="button" className={styles.submitGray} onClick={handleSignUp}>
            이메일로 회원가입
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModalComponent;