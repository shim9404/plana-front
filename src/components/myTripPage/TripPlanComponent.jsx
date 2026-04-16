import React from 'react'
import { Card, Empty, Input } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Link2 } from 'lucide-react';
import '../../styles/myTripPage.css';
import { BOOKMARK_COLOR } from "../../Constants/bookmarkColor";

{/* 여행 계획표 */}
const TripPlanComponent = ({tripList, tripDate, bookmarkList, schedulelist, selectedMenu}) => {

    // ! 데이터 표현 함수 모음 !
  // 날짜 변환 함수(yyyy.mm.dd)
  const getFormattedDate = (Date) => {
    if (!Date) return "";

    const year = Date.substring(0, 4);
    const month = Date.substring(5, 7);
    const day = Date.substring(8, 10);

    return `${year}.${month}.${day}`;
  };

  // 날짜 차이 계산(dimmed 처리 여부 확인)
    const getTotalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    return (end - start) / (1000 * 60 * 60 * 24) + 1;
  };

  // 날짜 변환 함수(yyyy.mm.dd + 1day~)
  const getFormattedDateIndex = (startDate, dayIndex) => {
    if (!startDate) return "";

    const year = startDate.substring(0, 4);
    const month = startDate.substring(5, 7);
    const day = startDate.substring(8, 10);

    const date = new Date(year, month, day);

    const days = ["일", "월", "화", "수", "목", "금", "토"];

    date.setDate(date.getDate() + (dayIndex - 1));

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth()).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dayName = days[date.getDay()];

    return `${yyyy}.${mm}.${dd} ${dayName}`;
  };

  // 날짜 계산(00박 00일)
  const getDateCalculation = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    return `${diff}박 ${diff + 1}일`;
  };
  
  // 스케줄 내 가격 합 계산
  const totalPrice = schedulelist.reduce((total, day) => {
    return (
      total +
      day.schedules.reduce((sum, item) => sum + Number(item.price || 0), 0)
    );
  }, 0);

  return (
    <>
      <Card
        className="schedule_head"
        style={{ borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", marginTop: '20px'}}
        // 제목(상단)
        title={
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckSquareOutlined style={{ fontSize: "20px" }} />
              <span style={{ fontWeight: 600 }}>여행 계획표</span>
            </div>
          </div>} >
        {/* 내용 */}
        {schedulelist.length === 0 ? (
          <div> <Empty description= "여행 계획이 없습니다."/> </div>
        ) : (
          <div className="schedule-container">
            {schedulelist.map((day) => {
              const dimmedDate = day.indexSort > (getTotalDays(tripDate.startDate, tripDate.endDate))
              return(
                <div key={day.tripDayId} className={`schedule-day-card ${dimmedDate ? 'dimmed' : ''}`}>
                  <div className="schedule-day-header">
                    <div className="day-badge">Day {day.indexSort}</div>
                    <div className="day-date">
                      {getFormattedDateIndex(tripDate.startDate, day.indexSort)}
                    </div>
                  </div>
                  <div className="schedule-table">
                    <div className="schedule-table-header">
                      <div>
                        <CheckSquareOutlined style={{ fontSize: "16px", color: "#fafafa" }}/>
                      </div>
                      <div>출발 시간</div>
                      <div>도착 시간</div>
                      <div>구분</div>
                      <div>장소</div>
                      <div>메모</div>
                      <div>예산</div>
                      <div>링크</div>
                    </div>
                    <div className="schedule-table-body">
                      {day.schedules.map((item) => {
                        const bookmark = bookmarkList.find((b) => b.bookmarkId === item.bookmarkId);
                        const colorKey = bookmark?.bookmarkType || "default";
                        const color = BOOKMARK_COLOR[colorKey];
                        const url = bookmark?.link || item.link;
                        return (
                          <div key={item.tripScheduleId || item.indexSort} className="schedule-table-row">
                            <div>{item.indexSort}</div>
                            <div>{item.startTime || "-"}</div>
                            <div>{item.endTime || "-"}</div>
                            <div>
                              {bookmark?.category || item.category || "-"}
                            </div>
                            <div style={{width: "100%", borderRadius: "20px", background: color.bg}}>
                              {bookmark?.title || item.context || "-"}
                            </div>
                            <div>{item.memo || "-"}</div>
                            <div>{item.price || "-"}</div>
                            <div>
                              {url ? (
                                <a href={url.startsWith("http")? url: `https://${url}`}
                                  target="_blank" rel="noreferrer" className="link-icon active">
                                  <Link2 size={20}/>
                                </a>
                              ) : (
                                <Link2 size={20} className="link-icon disabled"/>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
            {/* 정리표 */}
            {
              <div className="schedule-summary-sticky">
                <div className="summary-left">
                  {getFormattedDate(tripDate.startDate)} ~ {" "}
                  {getFormattedDate(tripDate.endDate)} (
                  {getDateCalculation(tripDate.startDate, tripDate.endDate)})
                </div>
                <div className="summary-right">
                  <div className="summary-item">
                    <span>참여 인원</span>
                    <Input type="number" style={{ width: "50px" }}
                      value={
                        tripList.find((trip) => trip.tripId === selectedMenu)?.entryCount} />
                  </div>
                  <div className="summary-item">
                    <span>총 예산</span>
                    <Input type="text" readOnly
                      value={`${totalPrice.toLocaleString()} 원`} />
                  </div>
                  <div className="summary-item">
                    <span>인당</span>
                    <Input type="text" readOnly
                      value={`${(totalPrice / tripList.find((trip) => trip.tripId === selectedMenu)?.entryCount).toLocaleString()} 원`}/>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
      </Card>
    </>
  )
}

export default TripPlanComponent
