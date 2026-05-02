import { Empty, Pagination } from "antd";
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
  const [searchType, setSearchType] = useState("PLACE");
  // 장소 검색할 키워드
  const [searchKeyword, setSearchKeyword] = useState("");

  // searchType별 페이징 상태
  // searchType별 페이징 상태 - PLACE 추가
  const [pagination, setPagination] = useState({
    PLACE: { current: 1, total: 0 },
    SPOT: { current: 1, total: 0 },
    FOOD: { current: 1, total: 0 },
  });
  const PAGE_SIZE = 15;

  //#region 북마크 팝업
  const listRef = useRef();
  const [popupPosY, setPopupPosY] = useState(0);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  //#endregion

  const onToggleChange = (selected) => {
    // 타입 변경 시 이전 데이터 초기화
    setSearchResults([]);
    setAreas((prev) => ({
      ...prev,
      [selected.toLowerCase()]: null,
    }));
    setPlaces(null);
    
    // 페이지 1로 초기화
    setPagination((prev) => ({
      ...prev,
      [selected]: { current: 1, total: 0, isEnd: false },
    }));

    setSearchType(selected);
  };

  const scrollEvent = () => {
    setSelectedAreaId("");
    setSelectedPlaceId("");
  };

  const openBookmarkPopup = (posY, areaId, placeId) => {
    if (areaId == selectedAreaId) {
      setSelectedAreaId("");
      setSelectedPlaceId("");
      return;
    }
    const parentRect = listRef.current.getBoundingClientRect().top;
    const popupPosY = posY - parentRect + 116;
    setPopupPosY(popupPosY);
    setSelectedPlaceId(placeId);
    setSelectedAreaId(areaId);
  };

  const handleBookmarkChanged = (type) => {
    let data;
    if (selectedAreaId) {
      data = searchResults.find((a) => a.areaId === selectedAreaId);
    } else {
      data = searchResults.find((a) => a.placeId === selectedPlaceId);
    }
    addBookmark(type, data);
    setSelectedAreaId("");
    setSelectedPlaceId("");
  };

  const addBookmark = async (type, areaData) => {
    const result = await addBookmarkApi(tripId, {
      bookmarkType: type,
      area: { ...areaData, regionId: selectedSigu },
    });
    setBookmarks((prev) => [...prev, result.data]);
  };

  // 지역 데이터 호출
  useEffect(() => {
    const getRegionData = async () => {
      try {
        const response = await getRegionByIdApi(selectedSigu);
        setObjRegions(response.data.regions);
      } catch (error) {
        console.log(error);
      }
    };
    getRegionData();
  }, [selectedSigu]);

  // DB 장소 목록 호출 - 페이징
  const loadAreaData = async (type, page = 1) => {
    try {
      const response = await getAreaApi(selectedSigu, type, page, PAGE_SIZE);
      const typeKey = type.toLowerCase();

      setAreas((prev) => ({
        ...prev,
        [typeKey]: response.data.data,  // .data.data
      }));

      setPagination((prev) => ({
        ...prev,
        [type]: {
          current: response.data.data.currentPage,
          total: response.data.data.totalCount,
        },
      }));
    } catch (error) {
      const msg = error?.response?.data?.message || null;
      console.warn(`장소 데이터 호출 오류 >> ${msg}`);
    }
  };

// API 장소 목록 호출 - 페이지 파라미터 추가
const loadPlaceData = async (keyword, page = 1) => {
  try {
    const response = await getPlaceApi(keyword, objRegions.mapX, objRegions.mapY, page);
    const data = response.data;

    console.log("place data", data); 

    setPlaces(data);

    setPagination((prev) => ({
      ...prev,
      PLACE: {
        current: data.currentPage,
        total: data.totalCount,
        isEnd: data.isEnd,  // 마지막 페이지 여부
      },
    }));
  } catch (error) {
    const msg = error?.response?.data?.message || null;
    console.warn(`장소 데이터 호출 오류 >> ${msg}`);
  }
};

  // 검색 필터링 데이터
  const [filteredLists, setFilteredLists] = useState([]);

  // 초기화 (searchType 또는 지역 변경 시)
  useEffect(() => {
    setSearchKeyword("");
    setFilteredLists([]);
    setIsSearched(false);

    if (searchType === "PLACE") {
      loadPlaceData("");
    } else {
      // 페이지 1로 초기화 후 호출
      setPagination((prev) => ({
        ...prev,
        [searchType]: { ...prev[searchType], current: 1 },
      }));
      loadAreaData(searchType, 1);
    }
  }, [searchType, selectedSigu, objRegions]);

  // 페이지 변경
const onPageChange = (page) => {
  if (searchType === "PLACE") {
    loadPlaceData(searchKeyword, page);  // searchKeyword 넘기고 있는지 확인
  } else {
    loadAreaData(searchType, page);
  }
  if (listRef.current) listRef.current.scrollTop = 0;
};
  const arrDisplay =
    searchType === "SPOT"
      ? areas?.spot?.areas || []
      : searchType === "FOOD"
      ? areas?.food?.areas || []
      : places?.places || [];

  const onKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const onKeywordSearch = (keyword) => {
    const finalKeyword = keyword?.trim();
    setSearchKeyword(finalKeyword);

    if (!finalKeyword) {
      setFilteredLists([]);
      setIsSearched(false);
      return;
    }

    if (searchType === "PLACE") {
      setFilteredLists([]);
      setIsSearched(true);
      loadPlaceData(finalKeyword);
      return;
    }

    const result = arrDisplay.filter((item) => item.name?.includes(finalKeyword));
    setFilteredLists(result);
    setIsSearched(true);
  };

  // 최종 화면 데이터
  useEffect(() => {
    if (!areas && !places) return;

    const result =
      searchType === "PLACE"
        ? places?.places || []
        : isSearched
        ? filteredLists
        : arrDisplay;

    setSearchResults(result);
  }, [searchType, places, filteredLists, isSearched, areas, selectedSigu]);

  // 리스트 스크롤 초기화
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [searchResults]);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.addEventListener("scroll", scrollEvent);
    }
  }, []);
  
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
        <FlexBox h="40px" bg="none">
          <ToggleButtonGroup toggles={FILTER_TOGGLES} onChangedEvent={onToggleChange} />
        </FlexBox>
        <FlexBox h="48px" bg="none">
          <SearchInput
            placeholder={"여행 장소를 검색해 보세요!"}
            value={searchKeyword}
            onSearchEvent={onKeywordSearch}
            onChange={onKeywordChange}
          />
        </FlexBox>
      </FlexBox>

      {/* 리스트 */}
      <FlexBox
        h="70%"
        settings={{ isVertical: true, justify: "flex-start" }}
        style={{ padding: "12px 0px", ...ScrollStyle.scrollY }}
        ref={listRef}
      >
        {searchResults?.length > 0 ? (
          searchResults.map((area, idx) => (
            <AreaItem
              key={area.areaId || area.placeId}
              area={area}
              number={idx + 1}
              margin="4px"
              popupBookmark={openBookmarkPopup}
            />
          ))
        ) : (
          <FlexBox settings={{ isVertical: true, justify: "center" }}>
            <Empty description={"검색 결과가 없습니다😥"} />
          </FlexBox>
        )}
      </FlexBox>

      {/* 페이지네이션 - 검색 중엔 숨김 */}
      {!isSearched && (
        <FlexBox h="40px" bg="none" style={{ justifyContent: "center", padding: "8px 0" }}>
          <Pagination
            current={pagination[searchType]?.current || 1}
            total={pagination[searchType]?.total || 0}
            pageSize={PAGE_SIZE}
            onChange={onPageChange}
            showSizeChanger={false}
            size="small"
            itemRender={(page, type, element) => {
              if (type === "next" && searchType === "PLACE" && pagination[searchType]?.isEnd) {
                return <span style={{ pointerEvents: "none", opacity: 0.3 }}>{element}</span>;
              }
              return element;
            }}
          />
        </FlexBox>
      )}

      {/* 북마크 팝업 */}
      {((selectedAreaId?.length > 0) || (selectedPlaceId?.length > 0)) && (
        <FlexBox
          w="312px"
          h="60px"
          bg="none"
          style={{
            position: "absolute",
            top: "0%",
            right: "0%",
            transform: `translate(85%, ${popupPosY}px)`,
            zIndex: 20,
          }}
        >
          <BookmarkPopup bookmarkEvent={handleBookmarkChanged} />
        </FlexBox>
      )}
    </FlexBox>
  </FlexContainer>
);
};

export default PlanAreaContainer;