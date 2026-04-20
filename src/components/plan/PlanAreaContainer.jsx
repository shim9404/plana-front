import { Empty } from "antd";
import { ToggleButtonGroup } from "../common/PLA_Buttons";
import { FlexContainer } from "../common/PLA_Containers";
import { FlexBox } from "../common/PLA_FlexBox";
import AreaItem from "./area/AreaItem";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./area/SearchInput";
import { BookmarkPopup } from "./area/BookmarkPopup";

// API 적용 전 테스트용 더미 데이터
const DUMMY_DATAS = {
    totalCount: 16,
  regionId: "25020",
  place: {
    searchType: "PLACE",
    areaCount: 6,
    areas: [
      {
        areaId: "A5375",
        name: "대전 테스트장소 임의 등록",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 테스트 주소",
        roadAddress: "대전 중구 테스트 도로명 주소",
        link: null,
        telephone: "042-0000-0000",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 5,
        createDate: "2026-04-08 09:34:53",
        latestDate: "2026-04-09 08:23:28",
        status: "ACTIVE",
      },
      {
        areaId: "A5376",
        name: "대전 테스트장소 임의 등록2",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 테스트 주소",
        roadAddress: "대전 중구 테스트 도로명 주소",
        link: null,
        telephone: "042-0000-0000",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 2,
        createDate: "2026-04-09 07:05:19",
        latestDate: "2026-04-09 07:05:19",
        status: "ACTIVE",
      },
      {
        areaId: "A5377",
        name: "대전 테스트장소 임의 등록3",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 테스트 주소",
        roadAddress: "대전 중구 테스트 도로명 주소",
        link: null,
        telephone: "042-0000-0000",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 1,
        createDate: "2026-04-09 07:07:29",
        latestDate: "2026-04-09 07:10:49",
        status: "ACTIVE",
      },
      {
        areaId: "A5378",
        name: "대전 테스트장소 임의 등록4",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 테스트 주소",
        roadAddress: "대전 중구 테스트 도로명 주소",
        link: null,
        telephone: "042-0000-0000",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 2,
        createDate: "2026-04-09 07:15:15",
        latestDate: "2026-04-10 00:53:27",
        status: "ACTIVE",
      },
      {
        areaId: "A5373",
        name: "대전오월드",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 사정동 117-1",
        roadAddress: null,
        link: "http://place.map.kakao.com/11505186",
        telephone: "042-580-4820",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 3,
        createDate: "2026-04-08 08:59:09",
        latestDate: "2026-04-09 07:35:57",
        status: "ACTIVE",
      },
      {
        areaId: "A5374",
        name: "대전 테스트장소 임의 등록",
        mapPos: {
          x: 127.397754143625,
          y: 36.2893534027601,
        },
        category: "관광명소",
        address: "대전 중구 테스트 주소",
        roadAddress: "대전 중구 테스트 도로명 주소",
        link: null,
        telephone: "042-0000-0000",
        description: "신규 근처 장소 북마크 등록 테스트",
        bookmarkCount: 2,
        createDate: "2026-04-08 09:03:24",
        latestDate: "2026-04-09 07:35:57",
        status: "ACTIVE",
      },
    ],
  },
  spot: {
    searchType: "SPOT",
    areaCount: 10,
    areas: [
      {
        areaId: "A2899",
        name: "단재 신채호 선생 생가터",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "역사명소",
        address: null,
        roadAddress: "대전광역시 중구 단재로229번길 47",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4123&pageIndex=1&ntatcSeq=1057676&categorySeq=487",
        telephone: "042-606-6283",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2900",
        name: "옛 대전형무소 망루, 우물",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "역사명소",
        address: null,
        roadAddress: "대전광역시 중구 목중로 34(목동)",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4123&pageIndex=1&ntatcSeq=1057675&categorySeq=487",
        telephone: "042-606-6281",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2903",
        name: "옛 충남도청과 근현대사전시관",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "역사명소",
        address: null,
        roadAddress: "대전광역시 중구 중앙로 101 (선화동)",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4123&pageIndex=2&ntatcSeq=1057671&categorySeq=487",
        telephone: "042-270-6303",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2906",
        name: "뿌리공원과 족보박물관",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "문화명소",
        address: null,
        roadAddress: "대전광역시 중구 뿌리공원로 79",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4124&pageIndex=1&ntatcSeq=1057701&categorySeq=488",
        telephone: "042-581-4445",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2909",
        name: "대한민국 3대 빵집 성심당(聖心堂)",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "문화명소",
        address: null,
        roadAddress: "대전광역시 중구 대종로 480번길 15",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4124&pageIndex=1&ntatcSeq=1057698&categorySeq=488",
        telephone: "1588-8069",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2921",
        name: "유회당",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "문화명소",
        address: null,
        roadAddress: "대전광역시 중구 운남로85번길 32-20",
        link: "https://www.daejeon.go.kr/tou/TouTourView.do?tourSeq=705&viewName=1&menuSeq=962",
        telephone: "042-606-6283",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2922",
        name: "창계숭절사",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "문화명소",
        address: null,
        roadAddress: "대전광역시 중구 대둔산로137번길 67",
        link: "https://www.daejeon.go.kr/tou/TouTourView.do?tourSeq=701&viewName=1&menuSeq=962",
        telephone: "042-606-6283",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2923",
        name: "봉소루",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "문화명소",
        address: null,
        roadAddress: "대전광역시 중구 봉소루로 29",
        link: "https://www.daejeon.go.kr/tou/TouTourView.do?tourSeq=694&viewName=1&menuSeq=962",
        telephone: "042-606-6283",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2930",
        name: "종합테마파크 오-월드",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "생태환경명소",
        address: null,
        roadAddress: "대전광역시 중구 사정공원로 70(사정로)",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4125&pageIndex=1&ntatcSeq=1057710&categorySeq=489",
        telephone: "042-580-4820",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
      {
        areaId: "A2935",
        name: "대전둘레산길 300리",
        mapPos: {
          x: 0.0,
          y: 0.0,
        },
        category: "생태환경명소",
        address: null,
        roadAddress: "대전광역시 중구 보문산공원로 422 (1구간)",
        link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4125&pageIndex=2&ntatcSeq=1057705&categorySeq=489",
        telephone: "042-270-5583",
        description: "공공데이터포털 대전광역시_관광명소 발췌",
        bookmarkCount: 0,
        createDate: "2026-03-27 06:26:03",
        latestDate: "2026-04-09 07:02:25",
        status: "ACTIVE",
      },
    ],
  },
  food: {
    searchType: "FOOD",
    areaCount: 0,
    areas: [],
  },
};

// 장소 타입에 따른 필터용 토글 정보
const FILTER_TOGGLES = [
  {
    title: "근처 장소",
    type: "PLACE",
    width: "35%",
    height: "100%",
    fontSize: "16px",
    fontWeight: 500
  },
  {
    title: "관광지",
    type: "SPOT",
    width: "30%",
    height: "100%",
    fontSize: "16px",
    fontWeight: 500
  },
  {
    title: "맛집",
    type: "FOOD",
    width: "28%",
    height: "100%",
    fontSize: "16px",
    fontWeight: 500
  },
]

const PlanAreaContainer = () => {
  const [searchType, setSearchType] = useState("");
  const [arrPlace, setArrPlace] = useState([]);
  const [arrSpot, setArrSpot] = useState([]);
  const [arrFood, setArrFood] = useState([]);
  const [arrDisplay, setArrDisplay] = useState([]);

  //#region 북마크 팝업
  const listRef = useRef();
  const [popupPosY, setPopupPosY] = useState(0);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  //#endregion

  const onToggleChange = (selected) => {
    console.log(selected);
    setSearchType(selected);
    switch (selected) {
      case "PLACE" :
        setArrDisplay(arrPlace);
        break;
      case "SPOT" :
        setArrDisplay(arrSpot);
        break;
      case "FOOD" :
        setArrDisplay(arrFood);
        break;
    }
  }

  // 검색 필터
  const onKeywordSearch = (keyword) => {
    console.log(keyword);
    let searchData = null;
    switch (searchType) {
      case "PLACE" :
        arrPlace;
        break;
      case "SPOT" :
        searchData = arrSpot;
        break;
      case "FOOD" :
        searchData = arrFood;
        break;
    }
    if (keyword === null || keyword === undefined || keyword.length <= 0)
    {
      setArrDisplay(searchData);
      return;
    }
    setArrDisplay(searchData?.filter(data => data.name.includes(keyword)));
  }

  const scrollEvent = () => {
    setSelectedAreaId("");
  }

  const openBookmarkPopup = (posY, areaId) => {
    if (areaId == selectedAreaId) 
    {
      setSelectedAreaId("");
      return;
    }
    // console.log("button pos ", posY);
    const parentRect = listRef.current.getBoundingClientRect().top;
    const popupPosY = posY - parentRect + 116;
    
    // console.log(`BUTTON: ${posY}, popupPosY: ${popupPosY}`);
    setPopupPosY(popupPosY);
    setSelectedAreaId(areaId);
  }

  const handleBookmarkChanged = (type) => {
    console.log(`${selectedAreaId}를 ${type} 으로 북마크`);
    setSelectedAreaId("");
    // TODO: selectedAreaId의 장소 북마크를 param의 type으로 지정
  }

  // 초기화
  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.addEventListener("scroll", scrollEvent);
    }

    // TODO: 장소 검색 API 호출
    const data = DUMMY_DATAS;
    // 각 배열에 담기
    if (data.place.areaCount > 0) setArrPlace(data.place.areas);
    if (data.spot.areaCount > 0) setArrSpot(data.spot.areas);
    if (data.food.areaCount > 0) setArrFood(data.food.areas);
    // 초기값 설정
    setArrDisplay(data.place.areas);
  }, [])

  useEffect(() => {
    console.log(arrDisplay)
  }, [arrDisplay])

  return (
    <FlexContainer>
      <FlexBox
        settings={{ isVertical: true, justify: "flex-start", position: "relative" }}
        style={{ padding: "12px 20px" }}
        bg="none"
      >
        {/* 헤더 */}
        <FlexBox
          h="108px"
          settings={{ isVertical: true, justify: "space-around" }}
          style={{ borderBottom: "solid 1px #A8A8A8" }}
          bg="none"
        >
          {/* 카테고리 필터 버튼 */}
          <FlexBox h="40px" bg="none">
            <ToggleButtonGroup toggles={FILTER_TOGGLES} onChangedEvent={onToggleChange}/>
          </FlexBox>
          {/* 검색 필터 영역 */}
          <FlexBox h="48px" bg="none">
            <SearchInput placeholder={"여행 장소를 검색해 보세요!"} onSearchEvent={onKeywordSearch}/>
          </FlexBox>
        </FlexBox>
        {/* 리스트 콘텐츠 */}
        <FlexBox h="75%" settings={{ isVertical: true, justify: "flex-start" }} 
          style={{ padding: "12px 0px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.25) transparent", }}
          ref={listRef}
          >
          {/* 아이템 map */}
          {
            arrDisplay?.length > 0 ?
            arrDisplay?.map((area, idx) => {
              return (
                <AreaItem area={area} number={idx + 1} margin="4px"
                popupBookmark={openBookmarkPopup}/>
              )
            }) : 
            (<FlexBox settings={{isVertical: true, justify: "center"}}>
              <Empty description={"검색 결과가 없습니다😥"}/>
            </FlexBox>)
          
          }
        </FlexBox>
                    
        {/* absolut */}
        {
          selectedAreaId != null && selectedAreaId.length > 0 && 
          (<FlexBox w="312px" h="60px" bg="none" 
          style={{ position: "absolute", top: "0%", right: "0%", transform: `translate(85%, ${popupPosY}px)`,  zIndex: 20 }}>
            <BookmarkPopup bookmarkEvent={handleBookmarkChanged}/>
          </FlexBox>)
        }
      </FlexBox>
    </FlexContainer>
  );
};

export default PlanAreaContainer;
