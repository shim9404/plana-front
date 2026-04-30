import { Button, Form, Input, message, Modal, Radio, Space } from 'antd';
import { useState } from 'react';
import { FlexBox } from '../../components/common/PLA_FlexBox';
import { changNickname, existsNicknameApi, updateRoleApi, updateStatusApi } from '../../services/memberApi';

const MemberDetailModal = ({ member, onUpdate, onClose }) => {
  const [form] = Form.useForm();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [editNickname, setEditNickname] = useState(false);
  const [nicknameLoading, setNicknameLoading] = useState(false);

  const [currentRole, setCurrentRole] = useState(member?.role);
  const [roleLoading, setRoleLoading] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(member?.status);
  const [statusLoading, setStatusLoading] = useState(false);




  const getLatestDate = () => {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
  }

  const onChangeNickname = () => {
    if (isNicknameChecked) setIsNicknameChecked(false);
    if (!editNickname) setEditNickname(true);
  };

  const handleNicknameCheck = async () => {
    const nickname = form.getFieldValue('nickname');
    if (!nickname) { message.warning("닉네임을 입력하세요."); return; }
    setNicknameLoading(true);
    try {
      const result = await existsNicknameApi(nickname);
      if (result) { message.success("사용 가능합니다."); setIsNicknameChecked(true); }
      else { message.error("사용 불가능합니다."); setIsNicknameChecked(false); }
    } catch {
      message.error("사용 불가능합니다.");
      setIsNicknameChecked(false);
    } finally {
      setNicknameLoading(false);
    }
  };

  const handleNicknameEditToggle = () => {
    if (!isNicknameChecked) {
      message.warning("닉네임 중복 확인을 해주세요.");
      return;
    } else {
      handleNicknameApply();
    }
  };

  const handleNicknameApply = async () => {
    const nickname = form.getFieldValue('nickname');
    try {
      const result = await changNickname(member?.memberId, nickname);
      console.log(result)
      if (result) {
        message.success("닉네임이 변경되었습니다.");
        const now = getLatestDate();
        onUpdate({ ...member, nickname, latestDate: now });
        form.setFieldsValue({ latestDate: now });
        setEditNickname(false);
        setIsNicknameChecked(false);
      }
    } catch {
      message.error("닉네임 변경에 실패하였습니다.");
    }
  };

  const handleRoleApply = async () => {
    setRoleLoading(true);
    const role = form.getFieldValue('role');
    try {
      const result = await updateRoleApi(member?.memberId, role);
      console.log(result)
      if (result) {
        message.success("유형이 변경되었습니다.");
        const now = getLatestDate();
        onUpdate({ ...member, role, latestDate: now });
        member.role = role;
        form.setFieldsValue({ latestDate: now });
      }
    } catch {
      message.error("유형이 변경에 실패하였습니다.");
    } finally {
      setRoleLoading(false);
    }
  };

  const handleStatusApply = async () => {
    setStatusLoading(true);
    const status = form.getFieldValue('status');
    try {
      const result = await updateStatusApi(member?.memberId, status);
      console.log(result)
      if (result) {
        message.success("상태가 변경되었습니다.");
        const now = getLatestDate();
        onUpdate({ ...member, status, latestDate: now });
        member.status = status;
        form.setFieldsValue({ latestDate: now });
      }
    } catch {
      message.error("상태 변경에 실패하였습니다.");
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <Modal
      open
      title="회원 상세 정보"
      onCancel={onClose}
      footer={null}
      width={400}
      styles={{
        header: { textAlign: 'center', paddingTop: '20px' },
        title: { fontSize: '18px', fontWeight: 400 },
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        colon={false}
        style={{ marginTop: '20px' }}
        initialValues={{
          email: member?.email,
          name: member?.name,
          socialType: member?.socialType,
          role: member?.role,
          nickname: member?.nickname,
          status: member?.status,
          createDate: member?.createDate,
          latestDate: member?.latestDate,
        }}
      >
        <Form.Item name="email" label="이메일">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="name" label="이름">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="socialType" label="소셜 연동">
          <Input readOnly />
        </Form.Item>

        {/* 유형 — Radio + 적용 버튼 우측 정렬 */}
        <Form.Item label="유형">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="role" noStyle>
              <Radio.Group buttonStyle="solid" onChange={(e) => setCurrentRole(e.target.value)}>
                <Radio.Button value="MEMBER">회원</Radio.Button>
                <Radio.Button value="MANAGER">부관리자</Radio.Button>
                <Radio.Button value="ADMIN">관리자</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Button loading={roleLoading} onClick={handleRoleApply} disabled={currentRole == member?.role}>적용</Button>
          </div>
        </Form.Item>

        {/* 닉네임 */}
        <Form.Item name="nickname" label="닉네임">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Form.Item name="nickname" noStyle>
              <Input onChange={onChangeNickname} />
            </Form.Item>
            {editNickname && !isNicknameChecked && (
              <Button loading={nicknameLoading} onClick={handleNicknameCheck}>
                중복 확인
              </Button>
            )}
            {editNickname && (
              <Button onClick={handleNicknameEditToggle}>
                적용
              </Button>
            )
            }
          </div>
        </Form.Item>

        {/* 상태 — Radio + 적용 버튼 우측 정렬 */}
        <Form.Item label="상태">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="status" noStyle>
              <Radio.Group buttonStyle="solid" onChange={(e) => setCurrentStatus(e.target.value)}>
                <Radio.Button value="ACTIVE">활성</Radio.Button>
                <Radio.Button value="INACTIVE">정지</Radio.Button>
                <Radio.Button value="DELETED" style={{ color: '#ff4d4f' }}>탈퇴</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Button loading={statusLoading} onClick={handleStatusApply} disabled={currentStatus == member?.status}>적용</Button>
          </div>
        </Form.Item>

        <Form.Item name="createDate" label="가입일">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="latestDate" label="최근 수정일">
          <Input readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MemberDetailModal;