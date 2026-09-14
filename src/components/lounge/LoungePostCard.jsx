import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Files, ThumbsUp } from 'lucide-react';
import { CategoryBarChart } from './CategoryBarChart'; 
import { RegionBarChart } from './RegionBarChart';     
import { KEYWORD_OPTIONS } from '../../constants/keyword'; 

const previewCardStyle = {
  maxWidth: '400px',
  width: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '16px 20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease', 
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
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const cardTitleWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  textAlign: 'right',
  maxWidth: '260px', 
  width: '100%',     
};

const cardTitleStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1f2937',
  lineHeight: '1.2',
  whiteSpace: 'nowrap',       
  overflow: 'hidden',        
  textOverflow: 'ellipsis',  
  width: '100%',            
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
  height: '30px', 
  boxSizing: 'border-box',
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
  flexShrink: 0,
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

export const LoungePostCard = ({ plan }) => {
  const navigate = useNavigate();

  // 📌 카드 클릭 시 상세 페이지로 이동 핸들러
  const handleCardClick = () => {
    console.log(plan);
    if (plan.hubPlanId) {
      navigate(`/lounge/detail/${plan.hubPlanId}`);
    }
  };

  const formatPublishDate = (dateStr) => {
    if (!dateStr) return '-';
    return dateStr.substring(0, 10); 
  };

  return (
    <div 
      style={previewCardStyle}
      onClick={handleCardClick}
      // 마우스 오버 시 살짝 떠오르는 UI 피드백 효과
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div style={cardTopRowStyle}>
        <div style={periodBadgeStyle}>
          {plan?.nights === 0 ? "당일" : `${plan?.nights}박 ${plan?.nights + 1}일`}
        </div>
        <div style={cardTitleWrapperStyle}>
          <div style={cardTitleStyle}>{plan?.tripName || plan?.name}</div>
          <div style={cardNicknameStyle}>{plan?.nickname}</div>
        </div>
      </div>

      <div style={cardDividerStyle} />

      <div style={keywordRowStyle}>
        {plan?.keywordIds && plan.keywordIds.length > 0 ? (
          plan.keywordIds.map((keywordId) => {
            const keywordOption = KEYWORD_OPTIONS.find((opt) => opt.id === keywordId);
            if (!keywordOption) return null;

            const IconComponent = keywordOption.icon;
            return (
              <div key={keywordId} style={keywordIconBoxStyle}>
                <IconComponent size={16} color={keywordOption.iconColor} strokeWidth={2.5} />
              </div>
            );
          })
        ) : (
          <div style={{ height: '100%' }} />
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
        <CategoryBarChart statList={plan?.categoryStatList} style={{ flex: 1.2 }} />
        <RegionBarChart statList={plan?.regionStatList} style={{ flex: 1 }} />
      </div>

      <div style={cardBottomRowStyle}>
        <div style={cardDateWrapperStyle}>
          <div style={cardDateTextStyle}>여행일 {plan?.startDate} ~ {plan?.endDate}</div>
          <div style={cardDateTextStyle}>게시일 {formatPublishDate(plan?.createdDate || plan?.publishDate)}</div>
        </div>
        <div style={cardStatsWrapperStyle}>
          <div style={cardStatItemStyle}>
            <span>{plan?.copyCount || 0}</span>
            <Files size={16} />
          </div>
          <div style={cardStatItemStyle}>
            <span>{plan?.likeCount || 0}</span>
            <ThumbsUp size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};         