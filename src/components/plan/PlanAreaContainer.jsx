import { Empty } from "antd";
import { ToggleButtonGroup } from "../common/PLA_Buttons";
import { FlexContainer } from "../common/PLA_Containers";
import { FlexBox } from "../common/PLA_FlexBox";
import AreaItem from "./area/AreaItem";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./area/SearchInput";
import { BookmarkPopup } from "./area/BookmarkPopup";
import { ScrollStyle } from "../../styles/planStyles";
import { getAreaApi, getPlaceApi } from "../../services/areaApi";
import { useTripInfo } from "../../hooks/trip/TripInfoContext";
import { useRegion } from "../../hooks/home/RegionContext";
import { getRegionByIdApi } from "../../services/regionApi";
import { addBookmarkApi } from "../../services/tripApi";
import { usePlaceSearch } from "../../hooks/trip/PlaceSearchContext";
import { usePlanBookmark } from "../../hooks/trip/PlanBookmarkContext";
import { useTripRegion } from "../../hooks/trip/TripRegionContext";

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
  const { tripId } = useTripInfo();
  const { selectedSigu } = useTripRegion();
  const { setBookmarks } = usePlanBookmark();
  const { isSearched, setIsSearched, searchResults, setSearchResults } = usePlaceSearch();
  const { objRegions, setObjRegions } = useRegion();

  // 장소 데이터(DB)
  const [areas, setAreas] = useState([]);
  // 장소 데이터(API)
  const [places, setPlaces] = useState([]);

  // 장소 검색 타입
  const [searchType, setSearchType] = useState("PLACE"); // 초기 '근처 장소' 버튼 선택
  // 장소 검색할 키워드
  const [searchKeyword, setSearchKeyword] = useState("");
  //#region 북마크 팝업
  const listRef = useRef();
  const [popupPosY, setPopupPosY] = useState(0);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  //#endregion

  const onToggleChange = (selected) => {
    console.log(selected);
    setSearchType(selected);
  }

  const scrollEvent = () => {
    setSelectedAreaId("");
    setSelectedPlaceId("");
  }

  const openBookmarkPopup = (posY, areaId, placeId) => {
    console.log(areaId, placeId);
    if (areaId == selectedAreaId) {
      setSelectedAreaId("");
      setSelectedPlaceId("");
      return;
    }
    // console.log("button pos ", posY);
    const parentRect = listRef.current.getBoundingClientRect().top;
    const popupPosY = posY - parentRect + 116;

    // console.log(`BUTTON: ${posY}, popupPosY: ${popupPosY}`);
    setPopupPosY(popupPosY);
    setSelectedPlaceId(placeId);
    setSelectedAreaId(areaId);
  }

  const handleBookmarkChanged = (type) => {
    // TODO: selectedAreaId의 장소 북마크를 param의 type으로 지정
    let data;
    // AREA 테이블에 데이터 존재 여부
    if (selectedAreaId) {
      console.log(`${selectedAreaId}를 ${type} 으로 북마크`);
      data = searchResults.find((a) => a.areaId === selectedAreaId);
    } else {
      console.log(`${selectedPlaceId}에 맞는 데이터를 테이블에 신규 등록하고 ${type} 으로 북마크`);
      console.log(searchResults);
      data = searchResults.find((a) => a.placeId === selectedPlaceId);
    }
    console.log(data);

    addBookmark(type, data);

    setSelectedAreaId("");
    setSelectedPlaceId("");
  }

  const addBookmark = async (type, areaData) => {
    const result = await addBookmarkApi(tripId, {
      bookmarkType: type,
      area: { ...areaData, regionId: selectedSigu }
    });

    setBookmarks(prev => [...prev, result.data]);
  }


  // 지역 데이터(이름 + 좌표) 호출
  useEffect(() => {
    const getRegionData = async () => {
      try {
        const response = await getRegionByIdApi(selectedSigu);
        setObjRegions(response.data.regions)
      } catch (error) {
        console.log(error);
      }
    }
    getRegionData();

  }, [selectedSigu])

  // 장소 목록 API 호출 - DB
  const loadAreaData = async () => {
    // 선택한 지역에 따른 AREA 검색 API 호출
    try {
      const response = await getAreaApi(selectedSigu)
      setAreas(response.data);
    } catch (error) {
      const status = error?.response?.status;
      const body = error?.response?.data;
      const msg = body?.message || body?.detail || null;
      console.warn(`장소 데이터 호출 오류 >> status: ${status}, msg: ${msg}`);
    }
  }

  // 장소 목록 API 호출 - API
  const loadPlaceData = async (keyword) => {
    // 키워드 및 좌표에 따른 검색 API 호출
    try {
      const response = await getPlaceApi(keyword, objRegions.mapX, objRegions.mapY);
      setPlaces(response.data);
    } catch (error) {
      const status = error?.response?.status;
      const body = error?.response?.data;
      const msg = body?.message || body?.detail || null;
      console.warn(`장소 데이터 호출 오류 >> status: ${status}, msg: ${msg}`);
    }
  }

  // 검색 필터링 데이터
  const [filteredLists, setFilteredLists] = useState([]);

  // 초기화 (검색 종류 또는 지역 변경 시)
  useEffect(() => {
    // 관관지, 맛집 데이터 호출
    if (searchType !== "PLACE") {
      loadAreaData();
    }

    // 근처 정보 데이터 호출
    if (searchType === "PLACE") {
      loadPlaceData("");
    }

    // 값 or 목록 전체 초기화
    setSearchKeyword("");
    setFilteredLists([]);
    setIsSearched(false);
  }, [searchType, selectedSigu, objRegions]);

  // 장소 상세 데이터
  const arrSpot = areas?.spot?.areas || [];
  const arrFood = areas?.food?.areas || [];
  const arrDisplay =
    searchType === "SPOT"
      ? arrSpot
      : searchType === "FOOD"
        ? arrFood
        : places?.places || [];

  // 검색 키워드 (입력만)
  const onKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  // 검색 버튼 클릭
  const onKeywordSearch = (keyword) => {
    const finalKeyword = keyword?.trim();

    setSearchKeyword(finalKeyword);

    // 검색어 없음 → 전체 목록
    if (!finalKeyword) {
      setFilteredLists([]);
      setIsSearched(false);
      return;
    }

    // PLACE 필터
    if (searchType === "PLACE") {
      setFilteredLists([]);
      setIsSearched(true);
      loadPlaceData(finalKeyword);
      return;
    }

    // SPOT or FOOD 필터
    const result = arrDisplay.filter(item =>
      item.name?.includes(finalKeyword)
    );

    setFilteredLists(result); // 최종 검색 결과 목록들
    setIsSearched(true);
  };

  // 최종 화면에 보여지는 데이터
  useEffect(() => {
    if (!areas && !places) return;

    const result =
      searchType === "PLACE"
        ? (places?.places || [])
        : (isSearched
          ? filteredLists
          : arrDisplay);

    setSearchResults(result);

  }, [searchType, places, filteredLists, isSearched, areas, selectedSigu]);

  // 초기화
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [searchResults]);

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
            <ToggleButtonGroup toggles={FILTER_TOGGLES} onChangedEvent={onToggleChange} />
          </FlexBox>
          {/* 검색 필터 영역 */}
          <FlexBox h="48px" bg="none">
            <SearchInput placeholder={"여행 장소를 검색해 보세요!"} value={searchKeyword} onSearchEvent={onKeywordSearch} onChange={onKeywordChange} />
          </FlexBox>
        </FlexBox>
        {/* 리스트 콘텐츠 */}
        <FlexBox h="75%" settings={{ isVertical: true, justify: "flex-start" }}
          style={{ padding: "12px 0px", ...ScrollStyle.scrollY }}
          ref={listRef}
        >
          {/* 아이템 map */}
          {
            searchResults?.length > 0 ?
              searchResults?.map((area, idx) => {
                return (
                  <AreaItem area={area} number={idx + 1} margin="4px"
                    popupBookmark={openBookmarkPopup} />
                )
              }) :
              (<FlexBox settings={{ isVertical: true, justify: "center" }}>
                <Empty description={"검색 결과가 없습니다😥"} />
              </FlexBox>)

          }
        </FlexBox>

        {/* absolut */}
        {
          (selectedAreaId != null && selectedAreaId.length > 0) || (selectedPlaceId != null && selectedPlaceId.length > 0) ?
            (<FlexBox w="312px" h="60px" bg="none"
              style={{ position: "absolute", top: "0%", right: "0%", transform: `translate(85%, ${popupPosY}px)`, zIndex: 20 }}>
              <BookmarkPopup bookmarkEvent={handleBookmarkChanged} />
            </FlexBox>) : null
        }
      </FlexBox>
    </FlexContainer>
  );
};

export default PlanAreaContainer;
