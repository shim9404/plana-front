import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { TextButton } from '../../components/common/PLA_Buttons';
import { Files, ThumbsUp, Info } from 'lucide-react';
import { CategoryBarChart } from '../../components/lounge/CategoryBarChart';
import { RegionBarChart } from '../../components/lounge/RegionBarChart';
import { KEYWORD_OPTIONS } from '../../constants/keyword';

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
  fontSize: '20px',
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

const previewCardStyle = {
  width: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '16px 20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '16px',
  boxSizing: 'border-box',
};

const cardTopRowStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const periodBadgeStyle = {
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '14px',
  color: '#4b5563',
  fontWeight: '500',
};

const cardTitleWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  textAlign: 'right',
  maxWidth: '260px',
};

const cardTitleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1f2937',
  wordBreak: 'break-all',
  lineHeight: '1.2',
};

const cardNicknameStyle = {
  fontSize: '12px',
  color: '#9ca3af',
  marginTop: '2px',
};

const cardDividerStyle = {
  width: '100%',
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: '2px 0',
};

const keywordRowStyle = {
  width: '100%',
  display: 'flex',
  gap: '6px',
};

const keywordIconBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '30px',
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const cardBottomRowStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: '4px',
};

const cardDateWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const cardDateTextStyle = {
  fontSize: '12px',
  color: '#6b7280',
};

const cardStatsWrapperStyle = {
  display: 'flex',
  gap: '12px',
  color: '#4b5563',
};

const cardStatItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  fontWeight: '500',
};

const noticeWrapperStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignSelf: 'flex-start',
  paddingLeft: '4px',
  marginBottom: '24px',
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

      <div style={previewCardStyle}>
        <div style={cardTopRowStyle}>
          <div style={periodBadgeStyle}>
            {planData?.nights == 0 ? "당일" : `${planData?.nights}박 ${planData?.nights + 1}일`}
          </div>
          <div style={cardTitleWrapperStyle}>
            <div style={cardTitleStyle}>{planData?.name || '-'}</div>
            <div style={cardNicknameStyle}>{planData?.nickname || '-'}</div>
          </div>
        </div>

        <div style={cardDividerStyle} />

        <div style={keywordRowStyle}>
          {planData?.keywordIds?.map((keywordId) => {
            const keywordOption = KEYWORD_OPTIONS.find((opt) => opt.id === keywordId);
            if (!keywordOption) return null;

            const IconComponent = keywordOption.icon;
            return (
              <div key={keywordId} style={keywordIconBoxStyle}>
                <IconComponent size={16} color={keywordOption.iconColor} strokeWidth={2.5} />
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
          <CategoryBarChart statList={planData?.categoryStatList} style={{ flex: 1.2 }} />
          <RegionBarChart statList={planData?.regionStatList} style={{ flex: 1 }} />
        </div>

        <div style={cardBottomRowStyle}>
          <div style={cardDateWrapperStyle}>
            <div style={cardDateTextStyle}>여행일 {planData?.startDate} ~ {planData?.endDate}</div>
            <div style={cardDateTextStyle}>게시일 {planData?.publishDate || '-'}</div>
          </div>
          <div style={cardStatsWrapperStyle}>
            <div style={cardStatItemStyle}>
              <span>0</span>
              <Files size={16} />
            </div>
            <div style={cardStatItemStyle}>
              <span>0</span>
              <ThumbsUp size={16} />
            </div>
          </div>
        </div>
      </div>

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