import React from 'react';
import { Tooltip } from 'antd';
import { SIDO_COLOR } from '../../Constants/sidoColor';

const containerStyle = {
  display: 'flex',
  height: '28px',
  borderRadius: '6px',
  overflow: 'hidden',
  fontSize: '12px',
  fontWeight: '500',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
  width: '100%',
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

export const RegionBarChart = ({ statList, style }) => {
  if (!statList || statList.length === 0) return null;

  return (
    <div style={{ ...containerStyle, ...style }}>
      {statList.map((item, index) => {
        const sidoStyle = SIDO_COLOR[item.region] || { bg: '#e5e7eb', text: '#374151' };
        const isSmallZone = item.ratio <= 20;

        return (
          <Tooltip placement="bottom" title={`${item.region} ${item.ratio}%`} key={index} arrow>
            <div
              style={{
                ...segmentStyle,
                width: `${item.ratio}%`,
                backgroundColor: sidoStyle.bg,
                color: sidoStyle.text,
                padding: '0 4px',
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
  );
};