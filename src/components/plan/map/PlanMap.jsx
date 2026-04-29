import { useEffect, useState } from "react";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";
import { useRegion } from "../../../hooks/home/RegionContext";
import MapMarkerImage from "../area/MapMarkerImage";
import { renderToString } from "react-dom/server";
import { TextButton } from "../../common/PLA_Buttons";

const PlanMap = () => {  
  // map 관련 상태 관리
  const [map, setMap] = useState(null);
  const [isDrag, setisDrag] = useState(true); // 드래그
  const [isZoom, setIsZoom] = useState(true); // 줌
  const [isActive, setIsActive] = useState(false); // UI on/off
  
  // 검색 타입 데이터
  const { isSearched, searchResults } = useTripPlan();

  //  지역 데이터(이름 + 좌표)
  const { objRegions } = useRegion();

  // 지도 초기 생성(1번만)
  useEffect(() => {
    const script = document.createElement("script");
    const mapKey = import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");

        const createdMap = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(36.5, 127.5), // 기본값
          level: 3,
        });

        setMap(createdMap);
      });
    };

    document.head.appendChild(script);
  }, []);


  // 좌표 들어오면 중심 이동
  useEffect(() => {
    if (!map || !objRegions?.mapX || !objRegions?.mapY) return;
    const center = new window.kakao.maps.LatLng( objRegions.mapY, objRegions.mapX);

    map.setCenter(center);
    map.relayout();
  }, [map, objRegions]);
  
  // 마커 생성
  useEffect(() => {
    if (!map) return;

    // 전체 마커 제거 (강제 초기화)
    map.clear && map.clear();

    const markers = [];

    let firstPosition = null;
    
      // 검색 필터링 결과 목록들(""-> 전체 || 키워드 -> 키워드 필터링 or 결과없음 ) 마커 생성
    searchResults.forEach((item, index) => {
      const x = Number(item?.mapPos?.x);
      const y = Number(item?.mapPos?.y);

      // 방어 코드
      if (!x || !y || isNaN(x) || isNaN(y)) return;

      if (index === 0) { // 1번째 마커(해당 기준으로 센터 이동)
        firstPosition = new window.kakao.maps.LatLng(y, x);
      }

      const overlay =  new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(y, x),
        content: renderToString(<MapMarkerImage number={index + 1} />), // 마커 이미지
        yAnchor: 1,
      });

      markers.push(overlay);
    });


    // 렌더링 이후 강제 재계산
    setTimeout(() => {
      map.relayout();

      if (firstPosition) {
        map.setCenter(firstPosition);
        map.panBy(150, -150); // 위치 이동(UI 가운데로)
      }
    }, 0);

    return () => { // 정리 함수
      markers.forEach((m) => m.setMap(null));
  };

  }, [map, searchResults, isSearched]);
  
  // 드래그 on/off
  const toggleDrag = () => {
    if (!map) return;
    map.setDraggable(!isDrag);
    setisDrag(!isDrag);
  };

  // 줌 on/off
  const toggleZoom = () => {
    if (!map) return;
    map.setZoomable(!isZoom);
    setIsZoom(!isZoom);
  };

  // 지도 활성화 (앞으로)
  const activateMap = () => {
    setIsActive(true);
  };

  // UI 모드 (뒤로)
  const deactivateMap = () => {
    setIsActive(false);
  };  

  return (
    <>
    <div style={{ position: "relative", width: "100%", height: "100%"}}>
      <div id="map" style={{ width: "100%", height: "100%", position: "absolute" , zIndex: isActive ? 10 : 0 }} />
      {/* BUTTON UI */}
      <div        
        style={{
          position: "absolute",
          bottom: "10px",
          left: "40%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 15,
        }}
      >
        <TextButton onClickEvent={activateMap} height='25px'>
          지도 조작
        </TextButton>
        <TextButton onClickEvent={deactivateMap} height='25px'>
          UI 모드
        </TextButton>
        <TextButton onClickEvent={toggleDrag} height='25px'>
          드래그 {isDrag ? "ON" : "OFF"}
        </TextButton>
        <TextButton onClickEvent={toggleZoom} height='25px'>
          줌 {isZoom ? "ON" : "OFF"}
        </TextButton>
      </div>
    </div>
    </>
  )
}

export default PlanMap;
