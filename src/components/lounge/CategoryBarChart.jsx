import React from 'react';
import { Tooltip } from 'antd';
import { CATEGORY_COLOR } from '../../Constants/categoryColor';
import { CATEGORY_ICON } from '../../Constants/categoryIcon';
import { CATEGORY_NAME } from '../../Constants/categoryName';

const containerStyle = {
  display: 'flex',
  height: '28px',
  borderRadius: '6px',
  overflow: 'hidden',
  fontSize: '12px',
  fontWeight: '500',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
  width: '100%', // 부모가 주는 너비에 맞춰 유연하게 채워짐
};

const segmentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  transition: 'width 0.3s ease',
  gap: '2px',
  cursor: 'pointer',
};

export const CategoryBarChart = ({ statList, style }) => {
  if (!statList || statList.length === 0) return null;

  return (
    <div style={{ ...containerStyle, ...style }}>
      {statList.map((item, index) => {
        const categoryStyle = CATEGORY_COLOR[item.category || "ETC"] || CATEGORY_COLOR.default;
        const CategoryIcon = CATEGORY_ICON[item.category || "ETC"];
        const categoryName = CATEGORY_NAME[item.category || "ETC"] || "기타";
        const isSmallZone = item.ratio <= 20;

        return (
          <Tooltip placement="bottom" title={`${categoryName} ${item.ratio}%`} key={index} arrow>
            <div
              style={{
                ...segmentStyle,
                width: `${item.ratio}%`,
                backgroundColor: categoryStyle.bg,
                color: categoryStyle.text,
              }}
            >
              {CategoryIcon && <CategoryIcon size="15px" color={categoryStyle.text} />}
              {!isSmallZone && <span>{item.ratio}%</span>}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};