import React from 'react';
import { Tooltip } from 'antd';
import {SIDO_COLOR} from '../../Constants/sidoColor';
import {CATEGORY_COLOR} from '../../Constants/categoryColor';
import {CATEGORY_ICON} from '../../Constants/categoryIcon';
import {CATEGORY_NAME} from '../../Constants/categoryName';


// 개별 카드 전체 컨테이너
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
};

// 상단 영역 (뱃지 + 타이틀 묶음)
const cardTopSectionStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
};

// "11박 12일" 기간 뱃지
const periodBadgeStyle = {
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  padding: '4px 8px',
  fontSize: '13px',
  color: '#4b5563',
  fontWeight: '500',
  flexShrink: 0,
};

// 타이틀 & 날짜 컨테이너
const titleWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const cardTitleStyle = {
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#1f2937',
  lineHeight: '1.4',
  wordBreak: 'break-all',
};

const cardDateStyle = {
  fontSize: '11px',
  color: '#9ca3af',
};

// 중간 구분선
const cardDividerStyle = {
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: '8px 0',
};

// 하단 차트 바들이 배치되는 행
const cardBottomSectionStyle = {
  display: 'flex',
  gap: '16px',
};

// 각각의 차트 바를 감싸는 겉 테두리 (둥글게 깎아주는 껍데기)
const barContainerStyle = {
  display: 'flex',
  height: '28px',
  borderRadius: '6px',
  overflow: 'hidden', // 내부 자식들이 넘치면 둥글게 잘리도록 설정
  fontSize: '12px',
  fontWeight: '500',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
};

// 내부 조각 공통 스타일
const barSegmentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  height: '100%',
  transition: 'width 0.3s ease', // 데이터 변경 시 부드러운 애니메이션 효과
};

export const LoungeCard = ({ plan }) => {
  return (
    <div style={cardItemStyle}>
      {/* 1. 상단: 기간 뱃지 + 타이틀/날짜 */}
      <div style={cardTopSectionStyle}>
        <div style={periodBadgeStyle}>{plan.period}</div>
        <div style={titleWrapperStyle}>
          <div style={cardTitleStyle}>{plan.title}</div>
          <div style={cardDateStyle}>여행일 {plan.date}</div>
        </div>
      </div>

      {/* 2. 중간: 구분선 */}
      <div style={cardDividerStyle} />

      {/* 3. 하단: 스택형 가로 바 차트 영역 */}
      <div style={cardBottomSectionStyle}>
        {/* Left Bar: 카테고리 통계 (호버 시 카테고리명 + % 노출) */}
        <div style={{ ...barContainerStyle, flex: 1.2 }}>
          {plan.categoryStatList.map((item, index) => {
            const categoryStyle = CATEGORY_COLOR[item.category || "ETC"] || CATEGORY_COLOR.default;
            const CategoryIcon = CATEGORY_ICON[item.category || "ETC"];
            
            // 💡 잠들어있던 categoryName 상수를 깨워줍니다. (디폴트값 처리 포함)
            const categoryName = CATEGORY_NAME[item.category || "ETC"] || "기타";
            
            const isSmallZone = item.ratio <= 20;

            return (
              // 툴팁으로 감싸서 호버했을 때 "음식점 45%" 처럼 예쁘게 띄워줍니다.
              <Tooltip placement={"bottom"} title={`${categoryName} ${item.ratio}%`} key={index} arrow={true}>
                <div
                  style={{
                    ...barSegmentStyle,
                    width: `${item.ratio}%`,
                    backgroundColor: categoryStyle.bg,
                    color: categoryStyle.text,
                    cursor: 'pointer', // 마우스를 올릴 수 있다는 느낌을 주기 위한 커서 추가
                  }}
                >
                  {CategoryIcon && <CategoryIcon size="15px" color={categoryStyle.text}/>}
                  {!isSmallZone && <span>{item.ratio}%</span>}
                </div>
              </Tooltip>
            );
          })}
        </div>

        {/* Right Bar: 지역 통계 (호버 시 전체 지역명 노출) */}
        <div style={{ ...barContainerStyle, flex: 1 }}>
          {plan.regionStatList.map((item, index) => {
            const sidoStyle = SIDO_COLOR[item.region] || { bg: '#e5e7eb', text: '#374151' };
            const isSmallZone = item.ratio <= 20;

            return (
              // 지역 바도 똑같이 툴팁으로 감싸줍니다. 
              // 20% 이하라 글자가 숨겨졌을 때 마우스를 올리면 "대구광역시 100%"를 확인할 수 있어 UX가 극대화됩니다!
              <Tooltip placement={"bottom"} title={`${item.region} ${item.ratio}%`} key={index} arrow={true}>
                <div
                  style={{
                    ...barSegmentStyle,
                    width: `${item.ratio}%`,
                    backgroundColor: sidoStyle.bg,
                    color: sidoStyle.text,
                    padding: '0 4px',
                    cursor: 'pointer',
                  }}
                >
                  {!isSmallZone && (
                    <span style={{
                      fontSize: '10px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.region}
                    </span>
                  )}
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};