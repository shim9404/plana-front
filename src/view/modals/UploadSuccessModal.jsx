import React from 'react';
import { Button, Modal } from 'antd';
import { TextButton } from '../../components/common/PLA_Buttons';
import { Files, ThumbsUp } from 'lucide-react';
import { CategoryBarChart } from '../../components/lounge/CategoryBarChart';
import { RegionBarChart } from '../../components/lounge/RegionBarChart';
import { KEYWORD_ICONS, KEYWORD_OPTIONS } from '../../constants/keyword';

// 고정 스타일들은 외부 유지
const baseModalStyles = {
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    width: '484px',
    padding: 0,
    borderRadius: '24px',
    overflow: 'hidden',
  },
  header: { display: 'none' },
  footer: { display: 'none' },
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'center',
  marginTop: '12px',
  marginBottom: '24px',
};

const pointBoxStyle = {
  width: '100%',
  height: '96px',
  backgroundColor: '#f3f4f6',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  gap: '16px',
  marginBottom: '28px',
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
};

const pointTextStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#000000',
  lineHeight: '1.1',
};

const pointSubTextStyle = {
  fontSize: '13px',
  color: '#9ca3af',
};

const linkTextStyle = {
  fontSize: '13px',
  color: '#4b5563',
  cursor: 'pointer',
  textDecoration: 'none',
  padding: 0,
};

const linkWrapperStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '6px',
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
};

const cardTopRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const periodBadgeStyle = {
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  padding: '6px 12px',
  fontSize: '13px',
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
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#1f2937',
  wordBreak: 'break-all',
  lineHeight: '1.2',
};

const cardNicknameStyle = {
  fontSize: '11px',
  color: '#9ca3af',
  marginTop: '2px',
};

const cardDividerStyle = {
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: '2px 0',
};

const keywordRowStyle = {
  display: 'flex',
  gap: '3px',
};

const keywordIconBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',          // 시안의 직사각형 비율에 맞춤
  height: '30px',
  border: '1px solid #d9d9d9', // periodBadge와 동일한 톤의 테두리
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const cardBottomRowStyle = {
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
  fontSize: '11px',
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
};

const noticeTextStyle = {
  fontSize: '12px',
  color: '#3b82f6',
  margin: 0,
};

const confirmButtonStyle = {
  width: '180px',
  height: '50px',
  backgroundColor: '#a3a3a3',
  borderColor: '#a3a3a3',
  color: '#ffffff',
  borderRadius: '12px',
  marginTop: 'auto', // 높이가 줄어들어도 항상 최하단 고정
};

const UploadSuccessModal = ({ isModalOpen, handleClose, planData }) => {
  // 1. 포인트 유무 체크 조건 (0이거나 undefined/null 이면 false)
  const hasPoint = planData?.pointAmount && planData.pointAmount > 0;
  
  // 2. 포인트 유무에 따른 모달 높이 동적 계산 (687px - 124px = 563px)
  const modalHeight = hasPoint ? '687px' : '563px';

  // 3. AntD 스타일에 동적 높이 주입
  const modalContainerStyles = {
    ...baseModalStyles,
    content: {
      ...baseModalStyles.content,
      height: modalHeight,
    },
    body: {
      padding: '40px 36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: modalHeight,
    },
  };

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

      {/* 4. 조건부 렌더링: 포인트가 있을 때만 렌더링 */}
      {hasPoint && (
        <div style={pointBoxStyle}>
          <div style={pointIconStyle}>P</div>
          <div>
            <div style={pointTextStyle}>여행 포인트 + {planData?.pointAmount}</div>
            <div style={pointSubTextStyle}>여행 최초 공개</div>
          </div>
        </div>
      )}

      <div style={linkWrapperStyle}>
        <Button
          type="link"
          size="small"
          style={linkTextStyle}
          onClick={() => console.log('바로가기 클릭')}
        >
          내가 올린 계획 바로 보기 &gt;
        </Button>
      </div>

      <div style={previewCardStyle}>
        <div style={cardTopRowStyle}>
          <div style={periodBadgeStyle}>
            {planData?.nights !== undefined ? `${planData.nights}박 ${planData.nights + 1}일` : '-박 -일'}
          </div>
          <div style={cardTitleWrapperStyle}>
            <div style={cardTitleStyle}>{planData?.name || '-'}</div>
            <div style={cardNicknameStyle}>{planData?.nickname || '-'}</div>
          </div>
        </div>

        <div style={cardDividerStyle} />

        <div style={keywordRowStyle}>
        {planData?.keywordIds?.map((keywordId) => {
            // 1. 상수 배열에서 해당 키워드 정보(아이콘, 색상 등)를 찾습니다.
            const keywordOption = KEYWORD_OPTIONS.find((opt) => opt.id === keywordId);
            if (!keywordOption) return null;

            const IconComponent = keywordOption.icon;
            return (
            <div key={keywordId} style={keywordIconBoxStyle}>
                {/* 2. 등록해둔 고유의 색상과 두께를 적용해 시안처럼 선명하게 표현합니다 */}
                <IconComponent size={16} color={keywordOption.iconColor} strokeWidth={2.5} />
            </div>
            );
        })}
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
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
        fontSize="18px"
        onClickEvent={handleClose}
      >
        확인
      </TextButton>
    </Modal>
  );
};

export default UploadSuccessModal;