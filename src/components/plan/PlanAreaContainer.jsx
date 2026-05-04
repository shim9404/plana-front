import { Empty, Flex, Pagination, Spin } from "antd";
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
import LoadingOverlay from "../common/LoadingOverlay";
import { withMinDelay } from "../../utils/apiUtil";

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
  const [areaCache, setAreaCache] = useState({
    SPOT: { pages: {}, totalCount: 0 },
    FOOD: { pages: {}, totalCount: 0 },
  });
  // 장소 데이터(API)
  const [placeCache, setPlaceCache] = useState({
    pages: {}, totalCount: 0
  });

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
    setSearchKeyword("");
    setIsSearched(false);
    setSearchType(selected);
    closeBookmarkPopup();
  };

  const scrollEvent = () => {
    closeBookmarkPopup();
  };

  const closeBookmarkPopup = () => {
    setSelectedAreaId("");
    setSelectedPlaceId("");
  }

  const openBookmarkPopup = (posY, areaId, placeId) => {
    if (areaId == selectedAreaId || placeId == selectedPlaceId) {
      closeBookmarkPopup();
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
      // SPOT, FOOD - areaId만 있으면 됨
      data = { areaId: selectedAreaId };
    } else {
      // PLACE - area 전체 데이터 필요
      data = searchResults.find((a) => a.placeId === selectedPlaceId);
    }

    addBookmark(type, data);
  };

  const addBookmark = async (type, areaData) => {
    const result = await addBookmarkApi(tripId, {
      bookmarkType: type,
      // areaId 있으면 area 객체 안 보냄
      ...(areaData.areaId
        ? { areaId: areaData.areaId }
        : { area: { ...areaData, regionId: selectedSigu } }
      ),
    })
    setBookmarks((prev) => [...prev, result.data]);
    closeBookmarkPopup();
  };

  const [loading, setLoading] = useState(false);
  // 지역 데이터 호출
  useEffect(() => {
    const getRegionData = async () => {
      try {
        // 이전 좌표 먼저 초기화해야 두번 렌더링 막음
        setObjRegions(null);
        const response = await getRegionByIdApi(selectedSigu);
        const data = response.data.regions;
        setObjRegions(data);

      } catch (error) {
        console.log(error);
      }
    };
    setAreaCache({
      SPOT: { pages: {}, totalCount: 0 },
      FOOD: { pages: {}, totalCount: 0 },
    });
    setPlaceCache({ pages: {}, totalCount: 0 });

    getRegionData();

  }, [selectedSigu]);

  // DB 장소 목록 호출 - 페이징
  const loadAreaData = async (type, page = 1) => {
    // 캐시에 있으면 재요청 안 함
    if (areaCache[type]?.pages[page]) {
      const cached = areaCache[type].pages[page];
      setSearchResults(cached);
      setPagination(prev => ({
        ...prev,
        [type]: { current: page, total: areaCache[type].totalCount }
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await withMinDelay(getAreaApi(selectedSigu, type, page, PAGE_SIZE));
      const data = response.data.data;

      // 캐시에 저장
      setAreaCache(prev => ({
        ...prev,
        [type]: {
          pages: { ...prev[type].pages, [page]: data.areas },
          totalCount: data.totalCount,
        }
      }));

      setSearchResults(data.areas);
      setPagination(prev => ({
        ...prev,
        [type]: { current: page, total: data.totalCount }
      }));
    } catch (error) {
      console.warn(`장소 데이터 호출 오류`);
    } finally {
      setLoading(false);
    }
  };

  // API 장소 목록 호출 - 페이지 파라미터 추가
  const loadPlaceData = async (keyword, page = 1) => {
    // 정보 로드 전 접근 차단
    if (!objRegions || !objRegions?.mapX || !objRegions?.mapY) return;

    // 키워드 검색은 캐시 안 씀
    if (keyword) {
      try {
        setLoading(true);
        const response = await withMinDelay(getPlaceApi(keyword, objRegions.mapX, objRegions.mapY, page));
        setSearchResults(response.data.places);
        setPagination(prev => ({
          ...prev,
          PLACE: { current: page, total: response.data.totalCount, isEnd: response.data.isEnd }
        }));
      } catch (error) {
        console.warn(`장소 데이터 호출 오류`);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 키워드 없으면 캐시 확인
    if (placeCache.pages[page]) {
      setSearchResults(placeCache.pages[page]);
      setPagination(prev => ({
        ...prev,
        PLACE: { current: page, total: placeCache.totalCount }
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await withMinDelay(getPlaceApi("", objRegions.mapX, objRegions.mapY, page));
      const data = response.data;

      // 캐시에 저장
      setPlaceCache(prev => ({
        ...prev,
        pages: { ...prev.pages, [page]: data.places },
        totalCount: data.totalCount,
      }));

      setSearchResults(data.places);
      setPagination(prev => ({
        ...prev,
        PLACE: { current: page, total: data.totalCount, isEnd: data.isEnd }
      }));
    } catch (error) {
      console.warn(`장소 데이터 호출 오류`);
    } finally {
      setLoading(false);
    }
  };

  // 검색 필터링 데이터
  const [filteredLists, setFilteredLists] = useState([]);

  // 초기화 (searchType 또는 지역 변경 시)
  useEffect(() => {
    if (!objRegions) return;

    setSearchKeyword("");
    setFilteredLists([]);
    setIsSearched(false);

    if (searchType === "PLACE") {
      loadPlaceData("", 1);
    } else {
      loadAreaData(searchType, 1);
    }
  }, [searchType, objRegions]);

  // 페이지 변경
  const onPageChange = (page) => {
    if (searchType === "PLACE") {
      loadPlaceData(searchKeyword, page);
    } else {
      loadAreaData(searchType, page);
    }
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const onKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const onKeywordSearch = (keyword) => {
    const finalKeyword = keyword?.trim();
    setSearchKeyword(finalKeyword);

    if (!finalKeyword) {
      setFilteredLists([]);
      setIsSearched(false);
      // 캐시에서 현재 페이지 데이터 복원
      const currentPage = pagination[searchType]?.current || 1;
      if (searchType === "PLACE") {
        loadPlaceData("", currentPage);
      } else {
        loadAreaData(searchType, currentPage);
      }
      return;
    }

    if (searchType === "PLACE") {
      setIsSearched(true);
      loadPlaceData(finalKeyword);
      return;
    }

    // SPOT, FOOD는 캐시에서 꺼내서 필터링
    const currentPage = pagination[searchType]?.current || 1;
    const cachedAreas = areaCache[searchType]?.pages[currentPage] ?? [];
    const result = cachedAreas.filter((item) => item.name?.includes(finalKeyword));
    setFilteredLists(result);
    setSearchResults(result);
    setIsSearched(true);
  };

  // 리스트 스크롤 초기화
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [searchResults]);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.addEventListener("scroll", scrollEvent);
      return () => listRef.current?.removeEventListener("scroll", scrollEvent);
    }
  }, []);

  useEffect(() => {
    return () => {
      // 언마운트 시 초기화
      setObjRegions(null);
    };
  }, []);

  return (
    <FlexContainer >
      <LoadingOverlay loading={loading}>
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
      </LoadingOverlay>
    </FlexContainer>
  );
};

export default PlanAreaContainer;