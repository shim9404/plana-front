import React from 'react'
import { Archive, RefreshCw, X } from 'lucide-react';
import '../../styles/myTripPage.css';
import { IconButton } from '../common/PLA_Buttons';

const TripTrashComponent = ({trashPlanItem}) => {
  return (
    <>
      {/* 상단 */}
      <div className="trash-header">
        <div className="trash-header-right">
          <span>보관 여행 ({trashPlanItem.length} / 10)</span>
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
            {trashPlanItem.map((trash) => (
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
                  {trash.latestDate}
                </div>
                <div style={{color: trash.remainDate <= 7 ? "red" : "inherit"}}>
                  {trash.remainDate} 일
                </div>
                <div>
                  <IconButton type="primary" width="50px" height="40px">
                    <RefreshCw size={25} />
                  </IconButton>
                </div>
                <div>
                  <IconButton type="primary" danger width="50px" height="40px">
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
