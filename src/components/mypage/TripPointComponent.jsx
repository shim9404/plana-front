import React, { useMemo, useState } from 'react'
import '../../styles/mypage.css';
import { GiftOutlined } from '@ant-design/icons';

const TripPointComponent = () => {

  // 포인트 상태 
  const [selectedState, setSelectedState] = useState("전체");
  const statefilter = ["전체", "적립", "사용", "만료"];
  const typeMap = {적립: "EARN", 사용: "USE", 만료: "EXPIRE"};

  // 임의 데이터 (api 연결 예정)
  const myPointLists = [
    {
      pointId: "P12", 
      memberId: "M3",
      tripId: "null",
      content: "여행 계획 생성 슬롯 추가",
      type: "USE",
      amount: 1000,     
      remain: 500,
      orginPointId: "null",
      createDate: "2026.03.12 14:35:54",
    },
    {
      pointId: "P11", 
      memberId: "M3",
      tripId: "null",
      content: "여행 계획 생성 슬롯 추가",
      type: "USE",
      amount: 1000,     
      remain: 1500,
      orginPointId: "null",
      createDate: "2026.03.11 14:35:54",
    },
    {
      pointId: "P10", 
      memberId: "M3",
      tripId: "T2",
      content: "[내 부산 여행2] 공유 삭제(24시간 이내)",
      type: "EXPIRE",
      amount: 1000,     
      remain: 2500,
      orginPointId: "P7",
      createDate: "2026.03.10 14:35:54",
    },
    {
      pointId: "P9", 
      memberId: "M3",
      tripId: "T2",
      content: "[내 부산 여행2] 여행 계획 삭제(24시간 이내)",
      type: "EXPIRE",
      amount: 500,    
      remain: 3500,
      orginPointId: "P3",
      createDate: "2026.03.09 14:35:54",
    },
    {
      pointId: "P8", 
      memberId: "M3",
      tripId: "T1",
      content: "[내 부산 여행1] 생성 - 포인트 만료(60일)",
      type: "EXPIRE",
      amount: 500,     
      remain: 4000,
      orginPointId: "P2",
      createDate: "2026.03.08 14:35:54",
    },
    {
      pointId: "P7", 
      memberId: "M3",
      tripId: "T1",
      content: "[내 부산 여행1] 공유",
      type: "EARN",
      amount: 1000,   
      remain: 4500,
      orginPointId: "null",
      createDate: "2026.03.07 14:35:54",
    },
    {
      pointId: "P6", 
      memberId: "M3",
      tripId: "T5",
      content: "[내 부산 여행5] 생성",
      type: "EARN",
      amount: 500,   
      remain: 3500,
      orginPointId: "null",
      createDate: "2026.03.06 14:35:54",
    },
    {
      pointId: "P5", 
      memberId: "M3",
      tripId: "T4",
      content: "[내 부산 여행4] 생성",
      type: "EARN",
      amount: 500,   
      remain: 3000,
      orginPointId: "null",
      createDate: "2026.03.05 14:35:54",
    },
    {
      pointId: "P4", 
      memberId: "M3",
      tripId: "T3",
      content: "[내 부산 여행3] 생성",
      type: "EARN",
      amount: 500,   
      remain: 2500,
      orginPointId: "null",
      createDate: "2026.03.04 14:35:54",
    },
    {
      pointId: "P3", 
      memberId: "M3",
      tripId: "T2",
      content: "[내 부산 여행2] 생성",
      type: "EARN",
      amount: 500,   
      remain: 2000,
      orginPointId: "null",
      createDate: "2026.03.03 14:35:54",
    },
    {
      pointId: "P2", 
      memberId: "M3",
      tripId: "T1",
      content: "[내 부산 여행1] 생성",
      type: "EARN",
      amount: 500,     
      remain: 1500,
      orginPointId: "null",
      createDate: "2026.03.02 14:35:54",
    },
    {
      pointId: "P1", 
      memberId: "M3",
      tripId: "null",
      content: "회원가입 축하 포인트",
      type: "EARN",
      amount: 1000,     
      remain: 1000,
      orginPointId: "null",
      createDate: "2026.03.01 14:35:54",
    },
  ];
  
  const point = myPointLists[0]?.remain ?? 0;
  const pointLists =
    selectedState === "전체"
      ? myPointLists
      : myPointLists.filter((item) => item.type === typeMap[selectedState]);

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
                    className={item.type === "EARN" ? "plus": "minus"}
                  >
                    {{EARN: "적립", USE: "사용", EXPIRE: "만료"}[item.type]}
                  </div>
                  <div className={item.type === "EARN" ? "plus" : "minus"}>
                    {item.type === "EARN" ? "+" : "-"}
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
