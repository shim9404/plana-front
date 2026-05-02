import { useEffect, useRef, useState } from "react";
import { useRegion } from "../../../hooks/home/RegionContext";
import MapMarkerImage from "../area/MapMarkerImage";
import { renderToString } from "react-dom/server";
import { TextButton } from "../../common/PLA_Buttons";
import { usePlaceSearch } from "../../../hooks/trip/PlaceSearchContext";

/**
 * Kakao Maps SDK 로드 함수
 *
 * 개선 포인트:
 * - 이미 window.kakao.maps가 있으면 script를 다시 추가하지 않음
 * - 이미 script 태그가 존재하면 중복 생성하지 않음
 * - Promise 기반으로 SDK 로딩 완료 시점을 안정적으로 제어
 */
const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    // 이미 Kakao Maps SDK가 로드된 경우
    if (window.kakao?.maps) {
      window.kakao.maps.load(resolve);
      return;
    }

    const mapKey = import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY;

    if (!mapKey) {
      reject(new Error("VITE_APP_KAKAO_JAVASCRIPT_KEY가 설정되지 않았습니다."));
      return;
    }

    const scriptId = "kakao-map-sdk";
    const existingScript = document.getElementById(scriptId);

    // 이미 script 태그가 추가되어 있는 경우
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao.maps.load(resolve);
      });

      existingScript.addEventListener("error", () => {
        reject(new Error("Kakao Maps SDK 로드 실패"));
      });

      return;
    }

    // Kakao Maps SDK script 생성
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(resolve);
    };

    script.onerror = () => {
      reject(new Error("Kakao Maps SDK 로드 실패"));
    };

    document.head.appendChild(script);
  });
};

const PlanMap = () => {  
  // map 관련 상태 관리
  const mapContainerRef = useRef(null); // 지도 DOM을 직접 참조하기 위한 ref
  const [map, setMap] = useState(null);
  const markerOverlayRefs = useRef([]); // 현재 생성된 CustomOverlay 마커
  const [isDrag, setisDrag] = useState(true); // 드래그
  const [isZoom, setIsZoom] = useState(true); // 줌
  const [isActive, setIsActive] = useState(false); // UI on/off
  
  // 검색 타입 데이터
  const { isSearched, searchResults } = usePlaceSearch();

  //  지역 데이터(이름 + 좌표)
  const { objRegions } = useRegion();


  // 기존 마커 전체 제거 함수
  const clearMarkers = () => {
    markerOverlayRefs.current.forEach((marker) => {
      marker.setMap(null);
    });

    markerOverlayRefs.current = [];
  };

  // 지도 초기 생성(1번만)
  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        await loadKakaoMapScript();

        // 컴포넌트가 언마운트된 후에는 지도 생성 방지
        if (!isMounted || !mapContainerRef.current) return;

        const createdMap = new window.kakao.maps.Map(mapContainerRef.current, {
          center: new window.kakao.maps.LatLng(36.5, 127.5),
          level: 3,
        });

        setMap(createdMap);
      } catch (error) {
        console.error("Kakao Map 초기화 실패:", error);
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      clearMarkers();
    };
  }, []);


  // 좌표 들어오면 중심 이동
  useEffect(() => {
    if (!map || !objRegions?.mapX || !objRegions?.mapY) return;

    const x = Number(objRegions.mapX); 
    const y = Number(objRegions.mapY); 

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    const center = new window.kakao.maps.LatLng(y, x);

    map.setCenter(center);
    map.relayout();
  }, [map, objRegions]);
  
  // 마커 생성
  useEffect(() => {
    if (!map) return;

    // 전체 마커 제거 (강제 초기화)
    clearMarkers();

    let firstPosition = null;
    
      // 검색 필터링 결과 목록들(""-> 전체 || 키워드 -> 키워드 필터링 or 결과없음 ) 마커 생성
    searchResults.forEach((item, index) => {
      const x = Number(item?.mapPos?.x);
      const y = Number(item?.mapPos?.y);

      // 방어 코드
      if (!x || !y || !Number.isFinite(x) || !Number.isFinite(y)) return;

      const position = new window.kakao.maps.LatLng(y, x);

      if (!firstPosition) {
        firstPosition = position; // 1번재 마커
      }

      const overlay =  new window.kakao.maps.CustomOverlay({
        map,
        position,
        content: renderToString(<MapMarkerImage number={index + 1} />), // 마커 이미지
        yAnchor: 1,
      });

      markerOverlayRefs.current.push(overlay);
    });


    // 렌더링 이후 강제 재계산
    setTimeout(() => {
      map.relayout();

      if (firstPosition) {
        map.setCenter(firstPosition);
        map.panBy(150, -150); // 위치 이동(UI 가운데로)
      }
    }, 0);

    return () => { // 리스트 또는 컴포넌트 언마운트 시 마커 제거
      clearMarkers();
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
      <div id="map" ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute" , zIndex: isActive ? 10 : 0 }} />
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
