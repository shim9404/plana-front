import { Modal } from "antd";
import { InfoCircleOutlined, CheckCircleOutlined, WarningOutlined, CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
import { TextBox } from "../../components/common/PLA_FlexBox";
import { useEffect } from "react";

const ICON_MAP = {
  info: { icon: InfoCircleOutlined, color: "#1677ff" },
  edit: {icon: FormOutlined, color: "#a5a5a5" },
  success: { icon: CheckCircleOutlined, color: "#52c41a" },
  warning: { icon: WarningOutlined, color: "#faad14" },
  error: { icon: CloseCircleOutlined, color: "#ff4d4f" },
};

const modalButtonStyle = {
  padding: "6px 32px",
  borderRadius: 6,
  border: "1px solid #d9d9d9",
  cursor: "pointer",
  fontSize: 14,
  background: "transparent",
}

const modalButtonConfirmStyle = {
  ...modalButtonStyle,
  background: "#fd7b7d", 
  color: "#fff"
}

const modalStyle = {
  header: { textAlign: "center", paddingTop: "20px" },
  title: { fontSize: "18px", fontWeight: 500 },
}

const messageContainerStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "24px 0 8px" }

const messageTextStyle = { fontSize: 15, color: "#666", textAlign: "center", lineHeight: 1.7, margin: 0 }

export const TwoBtnModal = ({ onClose, onOk, title, message, type }) => {
  const { icon: IconComponent, color } = ICON_MAP[type] ?? ICON_MAP.info;

  useEffect(() => {
    console.log(message);
  }, [])

  return (
    <Modal
      open
      closable={false}
      transitionName="ant-fade"
      title={title}
      onCancel={onClose}
      footer={
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "30px" }}>
          <button
            onClick={onClose}
            style={modalButtonStyle}>
            닫기
          </button>
          <button 
            onClick={onOk}
            style={modalButtonConfirmStyle}>
            확인
          </button>
        </div>
      }
      width={400}
      styles={modalStyle}
    >
      <div style={messageContainerStyle}>
        <IconComponent style={{ fontSize: 48, color }} />
        <TextBox style={messageTextStyle}>
          {message}
        </TextBox>
      </div>
    </Modal>
  );
};
