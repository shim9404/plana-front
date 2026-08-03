import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/common/PageLayout'
import UploadHubPlanModal from '../modals/UploadHubPlanModal';
import UploadSuccessModal from '../modals/UploadSuccessModal';
import modalStore from '../../store/modalStore';
import { oneBtnPreset } from '../../utils/alertModalPreset';

const LoungePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [planData , setPlanData] = useState(null); 
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);

  useEffect(() => {
  if (planData != null){
      setIsSuccessModalOpen(true);
  }
  }, [planData])

  return (
    <PageLayout>
        <UploadHubPlanModal isModalOpen={isModalOpen} handleClose={() => { setIsModalOpen(false);}} onSuccess={(data) => setPlanData(data)} onFail={() => {openOneBtnModal(oneBtnPreset.default); }} />
        <UploadSuccessModal isModalOpen={isSuccessModalOpen} planData={planData} handleClose={() => setIsSuccessModalOpen(false)}/>
    </PageLayout>
  )
}

export default LoungePage
