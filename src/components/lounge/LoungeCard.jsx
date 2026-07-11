import React from 'react';
import { CategoryBarChart } from './CategoryBarChart'; 
import { RegionBarChart } from './RegionBarChart';   

const cardItemStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '16px 20px',
  height: '121px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexShrink: 0,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
};

const cardTopSectionStyle = { display: 'flex', alignItems: 'stretch', gap: '12px' };
const titleWrapperStyle = { display: 'flex', flexDirection: 'column' };
const cardTitleStyle = { fontSize: '15px', fontWeight: 'bold', color: '#1f2937', lineHeight: '1.2', wordBreak: 'break-all' };
const cardDateStyle = { fontSize: '11px', color: '#9ca3af' };
const cardDividerStyle = { height: '1px', backgroundColor: '#e5e7eb', margin: '8px 0' };
const cardBottomSectionStyle = { display: 'flex', gap: '16px' };

const periodBadgeStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid #d9d9d9', borderRadius: '8px', padding: '0 8px',
  fontSize: '13px', color: '#4b5563', fontWeight: '500', flexShrink: 0,
};

export const LoungeCard = ({ plan, isSelected, onSelect }) => {
  
  // 이전 선배가 피드백 준 움푹 들어가는 선택 스타일 적용
  const dynamicCardStyle = {
    ...cardItemStyle,
    ...(isSelected ? {
      backgroundColor: '#f9fafb',
      boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.06)',
      transform: 'scale(0.99)',
      border: '1px solid #a8a8a8',
    } : {
      backgroundColor: '#fff',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transform: 'none',
    })
  };

  return (
    <div style={dynamicCardStyle} onClick={onSelect}>
      <div style={cardTopSectionStyle}>
        <div style={periodBadgeStyle}>
          {plan?.nights}박{plan?.nights + 1}일 
        </div>
        <div style={titleWrapperStyle}>
          <div style={cardTitleStyle}>{plan?.name}</div>
          <div style={cardDateStyle}>여행일 {plan?.startDate} ~ {plan?.endDate}</div>
        </div>
      </div>

      <div style={cardDividerStyle} />

      <div style={cardBottomSectionStyle}>
        <CategoryBarChart statList={plan?.categoryStatList} style={{ flex: 1.2 }} />
        <RegionBarChart statList={plan?.regionStatList} style={{ flex: 1 }} />
      </div>
    </div>
  );
};