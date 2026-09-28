import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { TextButton } from '../../components/common/PLA_Buttons';
import { Files, ThumbsUp, Info } from 'lucide-react';
import { CategoryBarChart } from '../../components/lounge/CategoryBarChart';
import { RegionBarChart } from '../../components/lounge/RegionBarChart';
import { KEYWORD_OPTIONS } from '../../constants/keyword';
import { LoungePostCard } from '../../components/lounge/LoungePostCard';

const modalContainerStyles = {
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    width: '484px',
    height: '687px',
    padding: 0,
    borderRadius: '24px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  header: { display: 'none' },
  body: {
    height: '687px',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  footer: { display: 'none' },
};

const titleStyle = {
  width: '100%',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'center',
  marginTop: '12px',
  marginBottom: '24px',
  whiteSpace: 'nowrap',
  letterSpacing: '-0.7px',
  boxSizing: 'border-box',
};

const boxContainerStyle = {
  width: '100%',
  height: '96px',
  backgroundColor: '#f3f4f6',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  gap: '16px',
  marginBottom: '28px',
  boxSizing: 'border-box',
};

const pointIconStyle = {
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  backgroundColor: '#d1d5db',
  border: '3px solid #4b5563',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '26px',
  fontWeight: '900',
  color: '#4b5563',
  flexShrink: 0,
};

const infoIconStyle = {
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6b7280',
  flexShrink: 0,
};

const boxPrimaryTextStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#000000',
  lineHeight: '1.2',
};

const boxSubTextStyle = {
  fontSize: '14px',
  color: '#9ca3af',
  marginTop: '2px',
};

const linkWrapperStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '8px',
  boxSizing: 'border-box',
};

const linkTextStyle = {
  fontSize: '14px',
  color: '#4b5563',
  fontWeight: '500',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

const noticeWrapperStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignSelf: 'flex-start',
  paddingLeft: '4px',
  marginTop: '10px',
  boxSizing: 'border-box',
};

const noticeTextStyle = {
  fontSize: '12px',
  color: '#6B72FF',
  margin: 0,
};

const confirmButtonStyle = {
  width: '180px',
  height: '50px',
  backgroundColor: '#a3a3a3',
  borderColor: '#a3a3a3',
  color: '#ffffff',
  borderRadius: '12px',
  marginTop: 'auto',
};

const UploadSuccessModal = ({ isModalOpen, handleClose, planData }) => {
  const hasPoint = planData?.pointAmount && planData.pointAmount > 0;

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleClose}
      closable={false}
      centered
      width={484}
      styles={modalContainerStyles}
    >
      <div style={titleStyle}>
        내 여행 계획이 라운지에 올라갔어요!
      </div>

      {hasPoint ? (
        <div style={boxContainerStyle}>
          <div style={pointIconStyle}>P</div>
          <div>
            <div style={boxPrimaryTextStyle}>여행 포인트 + {planData?.pointAmount}</div>
            <div style={boxSubTextStyle}>여행 최초 공개</div>
          </div>
        </div>
      ) : (
        <div style={boxContainerStyle}>
          <div style={infoIconStyle}>
            <Info size={28} />
          </div>
          <div>
            <div style={boxPrimaryTextStyle}>포인트 미지급</div>
            <div style={boxSubTextStyle}>최초 공개 시에만 포인트가 적립됩니다.</div>
          </div>
        </div>
      )}

      <div style={linkWrapperStyle}>
        <span
          style={linkTextStyle}
          onClick={() => console.log('바로가기 클릭')}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          내가 올린 계획 바로 보기 &gt;
        </span>
      </div>

      <LoungePostCard plan={planData} />

      <div style={noticeWrapperStyle}>
        <p style={noticeTextStyle}>*라운지에 공개된 여행 계획은 삭제할 수 없어요.</p>
        <p style={noticeTextStyle}>*여행 계획은 라운지에서 비공개 후 삭제할 수 있어요.</p>
      </div>

      <TextButton
        type="primary"
        style={confirmButtonStyle}
        fontSize="16px"
        onClickEvent={handleClose}
      >
        확인
      </TextButton>
    </Modal>
  );
};

export default UploadSuccessModal;