// components/lounge/LoungeSidebar.jsx
import React from 'react';
import { Tooltip } from 'antd';
import { Sparkles, Map, FileUp, FolderHeart } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'recommend', label: '추천 여행', icon: Sparkles },
  { id: 'board', label: '여행 게시판', icon: Map },
  { id: 'shared', label: '공유한 계획', icon: FileUp },
  { id: 'liked', label: '좋아요 한 계획', icon: FolderHeart },
];

const sidebarContainerStyle = {
  width: '80px',
  height: '100%',
  borderRight: '1px solid #e5e7eb',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '24px',
  gap: '16px',
  flexShrink: 0,
};

const iconBtnBaseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const menuDividerStyle = {
  width: '100%',
  height: '1px',
  backgroundColor: '#e5e7eb',
  border: 'none',
  margin: '4px 0', 
};

const blackTooltipStyle = {
  backgroundColor: '#262626',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 'bold',
  padding: '8px 14px',
  borderRadius: '10px',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

export const LoungeSidebar = ({ currentTab, onTabChange }) => {
  return (
    <div style={sidebarContainerStyle}>
      {MENU_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;

        return (
          <React.Fragment key={item.id}>
            <Tooltip
              title={item.label}
              placement="right"
              color="#262626"
              overlayInnerStyle={blackTooltipStyle}
              mouseEnterDelay={0.05}
            >
              <button
                type="button"
                onClick={() => onTabChange(item.id)}
                style={{
                  ...iconBtnBaseStyle,
                  backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                }}
              >
                <Icon
                  size={22}
                  color={isActive ? '#1e293b' : '#64748b'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </button>
            </Tooltip>

            {index === 0 && <hr style={menuDividerStyle} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};