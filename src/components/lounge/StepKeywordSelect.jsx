import React from 'react';
import { LoungeCard } from '../../components/lounge/LoungeCard';
import { Check } from 'lucide-react';
import { KEYWORD_OPTIONS } from '../../constants/keyword';

const keywordContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const keywordSectionWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const keywordTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '8px',
};

const keywordSubDescriptionStyle = {
  fontSize: '14px',
  color: '#6B72FF',
  margin: '0 0 12px 0',
};

const keywordListContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const keywordRowStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 12px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  userSelect: 'none',
};

const keywordIconBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  backgroundColor: '#fff',
  marginRight: '12px',
  flexShrink: 0,
};

const keywordNameStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151',
  flex: 1,
};

const keywordCheckWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const StepKeywordSelect = ({ selectedPlan, selectedKeywords, onToggleKeyword }) => {
  return (
    <div style={keywordContainerStyle}>
      <div style={keywordSectionWrapperStyle}>
        <h4 style={keywordTitleStyle}>여행 정보 카드</h4>
        <LoungeCard plan={selectedPlan} />
      </div>

      <div style={keywordSectionWrapperStyle}>
        <h4 style={{ ...keywordTitleStyle, marginBottom: '2px' }}>여행 테마(선택)</h4>
        <p style={keywordSubDescriptionStyle}>
          *올바른 테마를 선택하면 다른 여행객들이 내 여행 계획을 발견하기 쉽습니다!
        </p>

        <div style={keywordListContainerStyle}>
          {KEYWORD_OPTIONS.map((keyword) => {
            const isChecked = selectedKeywords.includes(keyword.id);
            const KeywordIcon = keyword.icon;

            return (
              <div
                key={keyword.id}
                onClick={() => onToggleKeyword(keyword.id)}
                style={{
                  ...keywordRowStyle,
                  border: isChecked ? '1px solid #565656' : '1px solid #a8a8a8',
                  backgroundColor: isChecked ? '#f9fafb' : '#fff',
                }}
              >
                <div style={keywordIconBoxStyle}>
                  <KeywordIcon size={16} color={keyword.iconColor} strokeWidth={2.5} />
                </div>
                <span style={keywordNameStyle}>{keyword.name}</span>
                {isChecked && (
                  <div style={keywordCheckWrapperStyle}>
                    <Check size={16} color="#565656" strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};