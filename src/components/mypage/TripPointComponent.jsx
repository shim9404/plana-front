import React, { useMemo, useState } from 'react'
import '../../styles/mypage.css';
import { GiftOutlined } from '@ant-design/icons';

const TripPointComponent = () => {

  // 포인트 상태 
  const [selectedState, setSelectedState] = useState("전체");
  const statefilter = ["전체", "적립", "사용", "만료"];

  // 임의 데이터 (api 연결 예정)
  const myPointLists = [
    {
      pointId: "P1", 
      memberId: "M3",
      tripId: "null",
      content: "회원가입 축하 포인트",
      status: "적립",
      amount: 1000,     
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P2", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 생성",
      status: "적립",
      amount: 500,     
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유",
      status: "적립",
      amount: 1000,   
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유",
      status: "적립",
      amount: 1000,   
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유",
      status: "적립",
      amount: 1000,   
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유",
      status: "적립",
      amount: 1000,   
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유",
      status: "적립",
      amount: 1000,   
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P4", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 생성 - 포인트 만료(60일)",
      status: "만료",
      amount: -500,     
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P5", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 여행 계획 삭제(24시간 이내)",
      status: "만료",
      amount: -500,    
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P6", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행] 공유 삭제(24시간 이내)",
      status: "만료",
      amount: -1000,     
      createDate: "2026.03.01 14:35:54",
    },
    {
      pointId: "P7", 
      memberId: "M3",
      tripId: "T5",
      content: "여행 계획 생성 슬롯 추가",
      status: "사용",
      amount: -1000,     
      createDate: "2026.03.01 14:35:54",
    },
  ];
  const point = myPointLists.reduce((sum, item) => sum + item.amount, 0);

  const pointLists = (() => {
  let remain = 0;

  // 잔액 계산
  const list = myPointLists.map((item) => {
    remain += item.amount;

    return {
      ...item,
      remain,
    };
  });

  // 상태 필터 처리
  return selectedState === "전체"
    ? list
    : list.filter((item) => item.status === selectedState);
})();

  return (
    <>
      {/* 콘텐츠 상단 */}
      <div className="content-header">
        <GiftOutlined style={{fontSize: 30}}/>
        <span className="content-header__title">여행 포인트</span>
      </div>
      {/* 콘텐츠 내용 */}
      <div className="edit_content_4">
        <div className="point-wrap">
          {/* 상단 */}
          <div className="point-header">
            <div className="point-info">
              <span style={{marginRight: "20px"}}>내 여행 포인트</span>
              <span style={{fontSize: "22px", color: "#707070ff"}}>{point.toLocaleString()}</span>
              <span style={{color: "#707070ff", marginLeft: "7px"}}>포인트</span>
            </div>     
            <div className="point-filter">
              {statefilter.map((item) => (
                <button
                  key={item}
                  className={selectedState === item ? "active" : ""}
                  onClick={() => setSelectedState(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* 테이블 */}
          <div className="point-table">
            {/* 테이블 헤더 */}
            <div className="table-header">
              <div>날짜</div>
              <div>내역</div>
              <div>상태</div>
              <div>금액</div>
              <div>잔액</div>
            </div>
            <div className="table-body">
              {/* 테이블 리스트 */}
              {pointLists.map((item, idx) => (
                <div className="table-row" key={idx}>
                  <div>{item.createDate}</div>
                  <div>{item.content}</div>
                  <div
                    className={
                      item.status === "사용"
                        ? "minus"
                        : item.status === "만료"
                        ? "minus"
                        : "plus"
                    }
                  >
                    {item.status}
                  </div>
                  <div className={item.amount <= 0 ? "minus" : "plus"}>
                    {item.amount.toLocaleString()}
                  </div>
                  <div>{item.remain.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>         
        </div>
      </div>
    </>
  )
}

export default TripPointComponent
