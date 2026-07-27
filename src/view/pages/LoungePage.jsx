import React, { useState } from 'react';
import PageLayout from '../../components/common/PageLayout';
import UploadHubPlanModal from '../modals/UploadHubPlanModal';
import UploadSuccessModal from '../modals/UploadSuccessModal';
import { LoungeSidebar } from '../../components/lounge/LoungeSidebar';
import modalStore from '../../store/modalStore';
import { oneBtnPreset } from '../../utils/alertModalPreset';

import { BoardTabContent } from '../../components/lounge/tabs/BoardTabContent';
import { RecommendTabContent } from '../../components/lounge/tabs/RecommendTabContent';
import { SharedTabContent } from '../../components/lounge/tabs/SharedTabContent';
import { LikedTabContent } from '../../components/lounge/tabs/LikedTabContent';

const pageContainerStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

const rightAreaStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
};

const LoungePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [planData, setPlanData] = useState(null); 
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);

  // 현재 활성화된 탭 관리
  const [currentTab, setCurrentTab] = useState('board');

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setPlanData(null);
  };

  const handleUploadSuccess = (data) => {
    console.log(data);
    setPlanData(data);
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  // 각 탭 전용 컴포넌트에 업로드 모달을 열 수 있는 이벤트 전달
  const renderTabContent = () => {
    const onUploadClick = () => setIsModalOpen(true);

    switch (currentTab) {
      case 'recommend':
        return <RecommendTabContent onUploadClick={onUploadClick} />;
      case 'shared':
        return <SharedTabContent onUploadClick={onUploadClick} />;
      case 'liked':
        return <LikedTabContent onUploadClick={onUploadClick} />;
      case 'board':
      default:
        return <BoardTabContent onUploadClick={onUploadClick} />;
    }
  };

  return (
    <PageLayout>
      <div style={pageContainerStyle}>
        
        {/* 좌측 사이드바 */}
        <LoungeSidebar currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* 우측 영역 */}
        <div style={rightAreaStyle}>
          {renderTabContent()}
        </div>
      </div>

      {/* 글로벌 업로드 모달 */}
      <UploadHubPlanModal 
        isModalOpen={isModalOpen} 
        handleClose={() => setIsModalOpen(false)} 
        onSuccess={handleUploadSuccess} 
        onFail={() => {
          openOneBtnModal(oneBtnPreset.default); 
        }} 
      />

      <UploadSuccessModal 
        isModalOpen={isSuccessModalOpen} 
        planData={planData} 
        handleClose={handleCloseSuccessModal}
      />
    </PageLayout>
  );
};

export default LoungePage;