import { Button, Flex, Modal } from 'antd'
import React, { useState } from 'react'
import { FlexBox } from '../../components/common/PLA_FlexBox'
import { FlexContainer } from '../../components/common/PLA_Containers'
import { IconButton, TextButton } from '../../components/common/PLA_Buttons';
import { X } from 'lucide-react';
import { LoungeCard } from '../../components/lounge/LoungeCard'

// 1. 모달 타이틀 스타일
const modalTitleStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
  textAlign: 'center',
};

// 2. 하단 '다음' 버튼 스타일
const nextButtonStyle = {
  width: '180px',
  height: '50px'
};

// 3. Ant Design Modal 내부 구역별 스타일 객체 (Mask, Content, Header, Body, Footer)
const modalContainerStyles = {
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    height: '687px', // 모달 전체 크기 고정
    padding: 0,
    borderRadius: '16px',
  },
  close: {
    width: '46px',
    height: '46px',
    padding: 0,          
    top: '24px',         
    right: '24px',       
    
    // 내부 X 아이콘을 정확히 46px 박스의 정중앙에 배치
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  header: {
    padding: '40px 36px 20px 36px',
    marginBottom: 0,
  },
  body: {
    height: '475px', // 강제 스크롤 생성을 위한 고정 높이
    overflowY: 'auto',
    padding: '0 36px 16px 36px',
  },
  footer: {
    padding: '16px 36px 32px 36px',
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

// 4. 카드 리스트 정렬 컨테이너 스타일
const cardListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

// 5. 개별 카드 아이템 스타일
const cardItemStyle = {
  border: '1px solid #d9d9d9',
  borderRadius: '12px',
  padding: '20px',
  height: '121px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  flexShrink: 0,
};


const customCloseButtonStyle = {
  position: 'absolute',
  top: '30px',          // 상단 여백 (시안에 맞춰 미세조정 가능)
  right: '36px',         // 우측 여백 (시안에 맞춰 미세조정 가능)
  width: '46px',        // 가로 46px 고정
  height: '46px',       // 세로 46px 고정
  border: '1px solid #d9d9d9', // 테두리 선
  display: 'flex',
  fontSize: '20px',     // X 아이콘 크기
  userSelect: 'none'
};

// 샘플 데이터 배열 (전달해주신 형태 반영)
const travelDataList = [
  {
    id: 1,
    period: "11박 12일",
    title: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
    date: "2025.10.09",
    categoryStatList: [
      { category: "FD6", ratio: 45 },
      { category: "CE7", ratio: 40 },
      { category: "ETC", ratio: 15 }
    ],
    regionStatList: [
      { region: "경기도", ratio: 70 },
      { region: "서울", ratio: 30 }
    ]
  },
  {
    id: 2,
    period: "3박 4일",
    title: "대구 맛집 도장깨기 여행 계획",
    date: "2026.07.07",
    categoryStatList: [
      { category: "ETC", ratio: 83 },
      { category: "FD6", ratio: 17 }
    ],
    regionStatList: [
      { region: "대구광역시", ratio: 100 }
    ]
  }
];


const UploadHubPlanModal =({ isModalOpen, handleClose }) => {

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  return (
      <Modal
        title={
          <div style={modalTitleStyle}>
            라운지에 공개할 여행 계획을 선택해 주세요!
          </div>
        }
        open={isModalOpen}
        onCancel={handleClose}
        closable={false}
        centered
        width={660}
        // 분리한 푸터 버튼 스타일 적용
        footer={[
          <TextButton 
            type="primary" 
            style={nextButtonStyle}
            fontSize='18px'
          >
            다음
          </TextButton>
        ]}
        
        // 분리한 AntD 모달 세부 스타일 객체 통째로 주입
        styles={modalContainerStyles}
      >
        <IconButton type="default" style={customCloseButtonStyle} 
        onClickEvent={handleClose}>
          <X size={25} />
        </IconButton>
        {/* 분리한 카드 리스트 래퍼 스타일 적용 */}
        <div style={cardListStyle}>
          {travelDataList.map((plan) => (
            // 분리한 개별 카드 스타일 적용
            <LoungeCard
              key={plan.id} 
              plan={plan} 
              isSelected={selectedPlanId === plan.id}
              onSelect={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>
      </Modal>
    );
};

export default UploadHubPlanModal