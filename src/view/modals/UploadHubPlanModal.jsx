import { Button, Empty, Flex, Modal, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FlexBox } from '../../components/common/PLA_FlexBox'
import { FlexContainer } from '../../components/common/PLA_Containers'
import { IconButton, TextButton } from '../../components/common/PLA_Buttons';
import { Dice1, X } from 'lucide-react';
import { getMyTripsApi, uploadHubPlanApi } from '../../services/loungeApi';
import { StepPlanSelect } from '../../components/lounge/StepPlanSelect';
import { StepKeywordSelect } from '../../components/lounge/StepKeywordSelect';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import authStore from '../../store/authStore';

const modalTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const nextButtonStyle = {
  width: '140px',
  height: '48px'
};

const prevButtonStyle = {
  width: '100px',
  height: '48px',
  marginRight: '4px',
  borderColor: '#a8a8a8',
  color: '#565656'
};

const modalContainerStyles = {
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    height: '687px',
    padding: 0,
    borderRadius: '16px',
  },
  close: {
    width: '46px',
    height: '46px',
    padding: 0,          
    top: '24px',         
    right: '24px',       
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
    height: '475px',
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

const customCloseButtonStyle = {
  position: 'absolute',
  top: '30px',          
  right: '36px',         
  width: '46px',        
  height: '46px',       
  border: '1px solid #d9d9d9', 
  display: 'flex',
  fontSize: '20px',     
  userSelect: 'none'
};


const UploadHubPlanModal = ({ isModalOpen, handleClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const modalContentRef = useRef(null);
  const nickname = authStore((state) => state.nickname);  
  useEffect(() => {
    if (isModalOpen) {
      
      const fetchMyTrips = async () => {
        setIsLoading(true);
        try {
          const trips = await getMyTripsApi();
          setMyTrips(trips.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMyTrips();
    } else {
      setCurrentStep(1);
      setSelectedPlanId(null);
      setSelectedKeywords([]);
    }
  }, [isModalOpen]);

  // 3. 스텝이 바뀔 때마다 스크롤을 맨 위로 올리는 로직 추가
  useEffect(() => {
    if (modalContentRef.current) {
      const modalBody = modalContentRef.current.closest('.ant-modal-body');
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
    }
  }, [currentStep]);

  const selectedPlan = myTrips?.find((plan) => plan.tripId === selectedPlanId);

  const handleToggleKeyword = (keywordId) => {
    if (selectedKeywords.includes(keywordId)) {
      setSelectedKeywords(selectedKeywords.filter((id) => id !== keywordId));
    } else {
      setSelectedKeywords([...selectedKeywords, keywordId]);
    }
  };

  const handleUpload = async () => {
    if (isLoading) return;
    
    const payload = {
      isPublic: true,
      keywords: selectedKeywords,
    };

    setIsLoading(true);

    const result = await uploadHubPlanApi(selectedPlanId, payload);
    
    const pointAmount = result.data?.point; 

    // 오늘 날짜 구하기 (포맷: YYYY-MM-DD)
    const today = new Date();
    const publishDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 2. [핵심] 상세조회 없이 기존 캐시 데이터 + 입력 데이터로만 결과물 조립
    const successModalData = {
      ...selectedPlan,             // 이름, 날짜, nights, 통계 리스트(categoryStatList, regionStatList) 포함
      publishDate,                 // 오늘 날짜
      pointAmount,                 // 지급된 포인트
      keywordIds: selectedKeywords, // 선택한 키워드 리스트
      copyCount: 0,               // 신규 등록이므로 0
      likeCount: 0,                // 신규 등록이므로 0
      nickname: nickname
    };
    
    // 3. 부모에게 완성된 데이터 전달 후 업로드 모달 닫기
    onSuccess(successModalData);
      
    handleClose();

    console.log(result);
  };

  const renderFooter = () => {
    if (isLoading) return null;

    if (currentStep === 1) {
      return [
        <TextButton
          key="next"
          type="primary"
          style={nextButtonStyle}
          fontSize="16px"
          disabled={!selectedPlanId}
          onClickEvent={() => setCurrentStep(2)}
        >
          다음
        </TextButton>
      ];
    }

    return [
      <TextButton
        key="prev"
        type="default"
        style={prevButtonStyle}
        fontSize="16px"
        onClickEvent={() => setCurrentStep(1)}
      >
        이전
      </TextButton>,
      <TextButton
        key="upload"
        type="primary"
        style={nextButtonStyle}
        fontSize="16px"
        onClickEvent={handleUpload}
      >
        업로드
      </TextButton>
    ];
  };

  return (
    <Modal
      title={
        <div style={modalTitleStyle}>
          {currentStep === 1
            ? "라운지에 공개할 여행 계획을 선택해 주세요!"
            : "라운지에 공개할 여행의 테마를 선택해주세요!"}
        </div>
      }
      open={isModalOpen}
      onCancel={handleClose}
      closable={false}
      centered
      width={660}
      footer={renderFooter()}
      styles={modalContainerStyles}
    >
      <IconButton type="default" style={customCloseButtonStyle} onClickEvent={handleClose}>
        <X size={25} />
      </IconButton>

      <LoadingOverlay loading={isLoading}>

        <div ref={modalContentRef} style={{width:'100%', height:'100%'}}>      
        {
            !isLoading &&  myTrips.length == 0 ?
            <FlexBox justify='center' alignItems='center' style={{width:'100%'}}>
              <Empty description= "공개가능한 여행 계획이 없습니다."/>
            </FlexBox>
            :
          currentStep === 1 ?
            <StepPlanSelect        
              myTrips={myTrips}
              selectedPlanId={selectedPlanId}
              onSelect={setSelectedPlanId}
            />
            :
            <StepKeywordSelect
              selectedPlan={selectedPlan}
              selectedKeywords={selectedKeywords}
              onToggleKeyword={handleToggleKeyword}
            />
          }
        </div>
      </LoadingOverlay>
    </Modal>
  );
  
};

export default UploadHubPlanModal;