import { useEffect, useRef, useState } from "react";
import { useRegion } from "../../../hooks/home/RegionContext";
import MapMarkerImage from "../area/MapMarkerImage";
import { renderToString } from "react-dom/server";
import { IconButton, TextButton } from "../../common/PLA_Buttons";
import { usePlaceSearch } from "../../../hooks/trip/PlaceSearchContext";
import { Button, Flex } from "antd";
import { Eye, EyeOff, MouseLeft, MouseOff, SearchX, ZoomIn, ZoomOut } from "lucide-react";
import { usePlanBookmark } from "../../../hooks/trip/PlanBookmarkContext";
import { getBookmarkColor, getBookmarkSubColor } from "../../../utils/plan/bookmarkUtils";
import { StarTwoTone } from "@ant-design/icons";

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
  const [isHide, setIsHide] = useState(false); // UI on/off
  
  // 검색 결과 + 클릭 여부 데이터
  const { isSearched, searchResults } = usePlaceSearch();

  // 북마크 + 북마크 타입 데이터
  const { bookmarks, getBookmarkType } = usePlanBookmark();

  //  지역(이름 + 좌표) 데이터
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
    console.log("맵 초기화");
    return () => {
      isMounted = false;
      clearMarkers();
      console.log("맵 삭제");
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
    
      // 검색 필터링 결과 목록들(""-> 전체 || 키워드 -> 키워드 필터링 or 결과없음 ) 마커 생성
    searchResults.forEach((item, index) => {
      const x = Number(item?.mapPos?.x);
      const y = Number(item?.mapPos?.y);

      // 방어 코드
      if (!x || !y || !Number.isFinite(x) || !Number.isFinite(y)) return;

      const position = new window.kakao.maps.LatLng(y, x);
      const bookmarkType = getBookmarkType(item.areaId || item.placeId)

      const overlay =  new window.kakao.maps.CustomOverlay({
        map,
        position,
        content: renderToString( // 마커 이미지
          <>
          {(bookmarkType && bookmarkType !== "NONE") && (
            <>
            <IconButton width="25px" height="25px" 
              style={{ 
                backgroundColor: bookmarkType === "NONE"? "#FFFFFF": getBookmarkColor(bookmarkType),
                position: "absolute", top: "-14px", right: "-12px"
                }}>
              <StarTwoTone twoToneColor={getBookmarkSubColor(bookmarkType)} style={{fontSize: "20px"}}/>
            </IconButton>
            </>
          )}
          <div style={{ position: "absolute", top: "-42px", right: "-41px", pointerEvents: "none" }}>
            <MapMarkerImage number={index + 1} />
          </div>
          </>
        ), 
        yAnchor: 1,
      });

      markerOverlayRefs.current.push(overlay);
    });

    return () => { // 리스트 또는 컴포넌트 언마운트 시 마커 제거
      clearMarkers();
    };

  }, [map, searchResults, isSearched, bookmarks]);
  
  // 지도 이동(1번째 마커 중심)
  const prevPositionRef = useRef(null);
  useEffect(() => {
    if (!map || !searchResults.length) return;

    let firstPosition = null;

    searchResults.forEach((item, index) => {
      const x = Number(item?.mapPos?.x);
      const y = Number(item?.mapPos?.y);

      // 방어 코드
      if (!x || !y || !Number.isFinite(x) || !Number.isFinite(y)) return;

      // 1번째 좌표
      const position = new window.kakao.maps.LatLng(y, x);
      if (!firstPosition) {
        firstPosition = position; // 1번재 마커
      }
    })
    
    // 이전 좌표와 비교
    if (
      prevPositionRef.current &&
      prevPositionRef.current.getLat() === firstPosition.getLat() &&
      prevPositionRef.current.getLng() === firstPosition.getLng()
    ) {
      return; // 동일 시, 이동 안함
    }
    setTimeout(() => {
      map.relayout();
      map.setCenter(firstPosition);
      map.panBy(150, -150);
    });

    prevPositionRef.current = firstPosition;
  }, [map, searchResults]);

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


  return (
    <>
    <div style={{ position: "relative", width: "100%", height: "100%"}}>
      <div id="map" ref={mapContainerRef}
        style={{ width: "100%", height: "100%", position: "absolute" , zIndex: isHide ? 1 : 0 }} />
      {/* BUTTON UI */}
      <Flex  
        style={{
          flexDirection: "column",
          position: "absolute",
          bottom: "40px",
          left: isHide ? "40px " : "450px",
          display: "flex",
          gap: "10px",
          zIndex: isHide ? 1 : 0,
        }}
      >
        <Button 
          icon={isHide ? <EyeOff size={20}/> : <Eye size={20} /> } 
          onClick={() => setIsHide(!isHide)}
          style={{ width:'40px', height: '40px',  borderRadius: '50%', display: 'flex', alignItems: 'center' }}
        />
        <Button 
          icon={isDrag ? <MouseLeft size={20}/> : <MouseOff size={20} /> } 
          onClick={toggleDrag}
          style={{ width:'40px', height: '40px',  borderRadius: '50%', display: 'flex', alignItems: 'center' }}
        />
        <Button 
          icon={isZoom ? <ZoomIn size={20}/> : <SearchX size={20} /> } 
          onClick={toggleZoom}
          style={{ width:'40px', height: '40px', borderRadius: '50%' , display: 'flex', alignItems: 'center' }}
        />
      </Flex>
    </div>
    </>
  )
}

export default PlanMap;
