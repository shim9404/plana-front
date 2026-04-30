import React, { useState } from 'react'
import { Archive, RefreshCw, X } from 'lucide-react';
import '../../styles/myTripPage.css';
import { IconButton } from '../common/PLA_Buttons';
import { message, Modal } from 'antd';
import axiosInstance from '../../services/axiosInstance';

const TripTrashComponent = ({getTripbyMemberId, tripList, getTrashPlan, trashList}) => {
  // 복구 버튼 선택
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false); // 경고창 모달
  const [selectedRestoreTripId, setSelectedRestoreTripId] = useState(""); // 복구할 여행 목록 id

  const restoreshowModal = (tripId) => { // 모달 open
    if (tripList.length >= 5) {
      message.warning("여행 목록이 가득 찼습니다. (5 / 5)")
      return;
    }
    setSelectedRestoreTripId(tripId);
    setIsRestoreModalOpen(true);
  }; 

  const restorehandleOk = async() => { // 확인
    // 여행 계획 + 북마크 status: 활성화(ACTIVE)
    try {
      const uri = `/api/trips/${selectedRestoreTripId}/status`;
      await axiosInstance.patch(uri, { status: "ACTIVE" });
      } catch (error) {
        console.log(error);
      }
    getTrashPlan();
    getTripbyMemberId();
    setIsRestoreModalOpen(false);
  }; 

  const restorehandleCancel = () => { // 취소
    setIsRestoreModalOpen(false);
  }; 

 // 삭제 버튼 선택
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 경고창 모달
  const [selectedDeleteTripId, setSelectedDeleteTripId] = useState(""); // 완전 삭제할 여행 목록 id

  const deleteshowModal = (tripId) => { // 모달 open
    setSelectedDeleteTripId(tripId);
    setIsDeleteModalOpen(true);
  }; 

  const deletehandleOk = async() => { // 확인
    // 여행 계획 + 북마크 영구삭제
    try {
      const uri = `/api/trips/${selectedDeleteTripId}`;
      await axiosInstance.delete(uri, null);
      } catch (error) {
        console.log(error);
      }
    getTrashPlan();
    getTripbyMemberId();

    setIsDeleteModalOpen(false);
  }; 

  const deletehandleCancel = () => { // 취소
    setIsDeleteModalOpen(false);
  };   


  return (
    <>
      {/* 상단 */}
      <div className="trash-header">
        <div className="trash-header-right">
          <span>보관 여행 ({trashList.length} / 10)</span>
          <Archive size={20} />
        </div>
      </div>
      {/* 내용 */}
      <div className="trash-container">
        <div className="trash-table-wrapper">
          <div className="trash-table-header">
            <div>여행명</div>
            <div>일정</div>
            <div>계획</div>
            <div>북마크</div>
            <div>삭제일</div>
            <div>남은 보관일</div>
            <div>복구</div>
            <div>삭제</div>
            </div>
          <div className="trash-table-body">
            {trashList.map((trash) => (
              <div key={trash.tripId} className="trash-table-row">
                <div>{trash.name}</div>
                <div style={{ width: "100%" }}>
                  <div style={{height: "25px", borderRadius: "20px", background: "#dbdbdb", alignItems: "center"}}>
                    {trash.startDate} ~ {trash.endDate}
                  </div>
                </div>
                <div>{trash.scheduleCount} 행</div>
                <div>{trash.bookmarkCount} 개</div>
                <div>
                  {new Date(trash.latestDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"})
                    .replace(/\s/g, "")
                    .replace(/\.$/, "")
                  }
                </div>
                <div style={{color: trash.remainDate <= 7 ? "red" : "inherit"}}>
                  {trash.remainDate} 일
                </div>
                <div>
                  <IconButton type="primary" width="50px" height="40px" onClickEvent={()=>restoreshowModal(trash.tripId)}>
                    <RefreshCw size={25} />
                  </IconButton>
                </div>
                <div>
                  <IconButton type="primary" danger width="50px" height="40px" onClickEvent={()=>deleteshowModal(trash.tripId)}>
                    <X size={25} />
                  </IconButton>
                </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>

      <Modal
        title="알림창"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isRestoreModalOpen}
        onOk={restorehandleOk}
        onCancel={restorehandleCancel}
        okText="확인"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <p>이 여행 목록을 다시 불러오시겠습니까?</p>
      </Modal>

      <Modal
        title="알림창"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isDeleteModalOpen}
        onOk={deletehandleOk}
        onCancel={deletehandleCancel}
        okText="확인"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <p>삭제 후 복구가 불가능합니다. 이 여행 목록을 영구 삭제하시겠습니까? </p>
      </Modal>
      
    </>
  )
}

export default TripTrashComponent
