import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/mypage.css';
import { GiftOutlined } from '@ant-design/icons';
import { getPointApi } from '../../services/pointApi';

const TripPointComponent = ({memberId}) => {

  // 포인트 상태 
  const [selectedState, setSelectedState] = useState("전체");
  const statefilter = ["전체", "적립", "사용", "만료"];
  const typeMap = {적립: "EARN", 사용: "USE", 만료: "EXPIRE"};

  // 포인트 정보 초기값
  const [myPointLists, setMyPointLists] = useState([])
  useEffect(() => {
    if (!memberId) return;

    const getPoint = async () => { 
      try {
        const result = await getPointApi(memberId);
        const points = result.data.points;
        setMyPointLists(points);
      } catch (error) {
        console.log(error);
      }
    }
    
    getPoint();

  }, [memberId])

  const point = myPointLists[myPointLists.length - 1]?.remain ?? 0;
  const pointLists =
    selectedState === "전체"
      ? myPointLists
      : myPointLists.filter((item) => item.type === typeMap[selectedState]);

  return (
    <>
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
