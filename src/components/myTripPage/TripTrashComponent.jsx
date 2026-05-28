import React, { useState } from 'react'
import { Archive, RefreshCw, X } from 'lucide-react';
import '../../styles/myTripPage.css';
import { IconButton } from '../common/PLA_Buttons';
import { message } from 'antd';
import { oneBtnPreset } from '../../utils/alertModalPreset'
import { useModal } from '../../hooks/ModalProvider';
import { changeTripStatusApi, deleteTripApi } from '../../services/tripApi';

const TripTrashComponent = ({getTripbyMemberId, tripList, getTrashPlan, trashList}) => {
  // 모달 창
  const { openTwoBtnModal } = useModal();

  // 여행 복구
  const restoreTrip = (tripId) => {
    /* if (tripList.length >= 5) {
      message.warning("여행 목록이 가득 찼습니다. (5 / 5)")
      return;
    } */
    openTwoBtnModal({
      ...oneBtnPreset.restoreCheck,
      onOk: async() => {
        // 여행 계획 + 북마크 status: 활성화(ACTIVE)
        try {
          await changeTripStatusApi(tripId, { status: "ACTIVE" })
          } catch (error) {
            console.log(error);
        }
        getTrashPlan();
        getTripbyMemberId();
      }
    })
  }

  // 여행 삭제
  const deleteTrip = (tripId) => {
    openTwoBtnModal({
      ...oneBtnPreset.deleteCheck,
      onOk: async() => {
      // 여행 계획 + 북마크 영구삭제
      try {
        await deleteTripApi(tripId);
      } catch (error) {
        console.log(error);
      }
      getTrashPlan();
      getTripbyMemberId();
      }
    })
  }
  // --- 


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
                  <IconButton type="primary" width="50px" height="40px" onClickEvent={()=>restoreTrip(trash.tripId)}>
                    <RefreshCw size={25} />
                  </IconButton>
                </div>
                <div>
                  <IconButton type="primary" danger width="50px" height="40px" onClickEvent={()=>deleteTrip(trash.tripId)}>
                    <X size={25} />
                  </IconButton>
                </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>     
    </>
  )
}

export default TripTrashComponent
