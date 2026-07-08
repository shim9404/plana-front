import { Empty, Flex, Pagination, Spin } from "antd";
import { IconButton, ToggleButtonGroup } from "../common/PLA_Buttons";
import { FlexContainer } from "../common/PLA_Containers";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import AreaItem from "./area/AreaItem";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./area/SearchInput";
import { BookmarkPopup } from "./area/BookmarkPopup";
import { ScrollStyle } from "../../styles/planStyles";
import { getAreaApi, getAroundApi, getPlaceApi, getThemeApi } from "../../services/areaApi";
import tripInfoStore from "../../store/trip/tripInfoStore";
import regionStore from "../../store/home/regionStore";
import { getRegionByIdApi } from "../../services/regionApi";
import { addBookmarkApi } from "../../services/tripApi";
import placeSearchStore from "../../store/trip/placeSearchStore";
import planBookmarkStore from "../../store/trip/planBookmarkStore";
import tripRegionStore from "../../store/trip/tripRegionStore";
import tripRecommandStore from "../../store/trip/tripRecommandStore";
import LoadingOverlay from "../common/LoadingOverlay";
import { withMinDelay } from "../../utils/apiUtil";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";
import PlaceFilter from "./area/PlaceFilter";
import ThemeFilter from "./area/ThemeFilter";
import RecommendPopup from "./area/RecommendPopup";
import tripAroundStore from "../../store/trip/tripAroundStore";
import { Leaf, TentTree } from "lucide-react";

// 장소 타입에 따른 필터용 토글 정보
const FILTER_TOGGLES = [
  {
    title: "지도 검색",
    type: "PLACE",
    width: "48%",
    height: "100%",
    fontSize: "16px",
    fontWeight: 500
  },
  {
    title: "맞춤 테마",
    type: "THEME",
    width: "48%",
    height: "100%",
    fontSize: "16px",
    fontWeight: 500
  },
]

const PlanAreaContainer = () => {
  const tripId = tripInfoStore((state) => state.tripId);

  const selectedSigu = tripRegionStore((state) => state.selectedSigu);
  
  const objRegions = regionStore((state) => state.objRegions);
  const setObjRegions = regionStore((state) => state.setObjRegions);

  const setBookmarks = planBookmarkStore((state) => state.setBookmarks);

  const setIsSearched = placeSearchStore((state) => state.setIsSearched);
  const searchResults = placeSearchStore((state) => state.searchResults);
  const setSearchResults = placeSearchStore((state) => state.setSearchResults);

  // 추전 장소 팝업
  // 추천 장소 팝업 열기/닫기
  const setIsRecommendPopup = tripRecommandStore((state) => state.setIsRecommendPopup)
  // 중심 여행지 정보
  const setFocusPlace = tripRecommandStore((state) => state.setFocusPlace);
 // 연관 여행지 이름
  const relatedPlaceKeyword = tripRecommandStore((state) => state.relatedPlace);
  const setRelatedPlaceKeyword = tripRecommandStore((state) => state.setRelatedPlaceKeyword);

  // 주변 장소 데이터
  // 캠핑
  const isFilterCamp = tripAroundStore((state) => state.isFilterCamp);
  const setIsFilterCamp = tripAroundStore((state) => state.setIsFilterCamp);
  //웰니스
  const isFilterWellness = tripAroundStore((state) => state.isFilterWellness);
  const setIsFilterWellness = tripAroundStore((state) => state.setIsFilterWellness);

  // 초기 렌더링 방지
  const isFirstRender = useRef(true);
  const isChangingType = useRef(false);

  // 장소 데이터(DB)
  const [areaCache, setAreaCache] = useState({
    SPOT: { pages: {}, totalCount: 0 },
    FOOD: { pages: {}, totalCount: 0 },
  });
  // 장소 데이터(카카오 API)
  const [placeCache, setPlaceCache] = useState({
    pages: {}, totalCount: 0
  });
  // 장소 데이터(관광포털 API)
  const [themeCache, setThemeCache] = useState({
    pages: {}, totalCount: 0
  });
  // 주변 장소 데이터(관광포털 API)
  const [aroundCache, setAroundCache] = useState({
    pages: {}, totalCount: 0,
  });

  // 장소 검색 타입
  const [searchType, setSearchType] = useState("PLACE");
  // 장소 검색할 키워드
  const [searchKeyword, setSearchKeyword] = useState("");

  // searchType별 페이징 상태
  const [pagination, setPagination] = useState({
    PLACE: { current: 1, total: 0 },
    SPOT: { current: 1, total: 0 },
    FOOD: { current: 1, total: 0 },
    THEME: { current: 1, total: 0 },
    AROUND: { current: 1, total: 0 },
  });
  const PAGE_SIZE = 10;

  //#region 북마크 팝업
  const listRef = useRef();
  const [popupPosY, setPopupPosY] = useState(0);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  //#endregion

  const onToggleChange = (selected) => {
    isChangingType.current = true;

    setSearchKeyword("");
    setIsSearched(false);
    setSearchType(selected);
    closeBookmarkPopup();
    setIsFilterCamp(false);
    setIsFilterWellness(false);
    setSelectedAroundFilter("");
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

  const handleBookmarkChanged = async (type) => {
    let data;
    if (selectedAreaId) {
      // SPOT, FOOD - areaId만 있으면 됨
      data = { areaId: selectedAreaId };
    } else {
      // PLACE - area 전체 데이터 필요
      data = searchResults.find((a) => a.placeId === selectedPlaceId);
    }

    const result = await addBookmark(type, data);

    // 추천 장소 팝업 열기
    setFocusPlace(result.data)
    setIsRecommendPopup(true);
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

    closeBookmarkPopup();    // 북마크한 데이터 저장

    return result;
  };

  const [loading, setLoading] = useState(false);
  // 지역 데이터 호출
  useEffect(() => {
    if (selectedSigu == null || selectedSigu.length <= 0) return;
    
    const getRegionData = async () => {
      try {
        setLoading(true);
        // 이전 좌표 먼저 초기화해야 두번 렌더링 막음
        setObjRegions(null);
        const response = await getRegionByIdApi(selectedSigu);
        const data = response.data;
        setObjRegions(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
  const loadAreaData = async (type, page = 1, keyword = '') => {
    // 키워드 검색 시 캐시 안 씀
    if (keyword) {
      try {
        setLoading(true);
        const response = await withMinDelay(getAreaApi(selectedSigu, type, page, PAGE_SIZE, keyword));
        const data = response.data.data;
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
      return;
    }

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

    // 키워드 없이 검색
    try {
      setLoading(true);
      const response = await withMinDelay(getAreaApi(selectedSigu, type, page, PAGE_SIZE));
      const data = response.data.data;

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

  // 카테고리 필터링 데이터
  const [selectedPlaceFilters, setSelectedPlaceFilters] = useState(["CT1","FD6","AT4","CE7","AD5"]); // 지도 검색용
  const [selectedThemeFilters, setSelectedThemeFilters] = useState(["PET","BF"]);                    // 맞춤 테마용
  const [selectedAroundFilter, setSelectedAroundFilter] = useState("");                              // 주변 여행용(CAMP/WELLNESS)

  const [showFilter, setShowFilter] = useState(false);
    const handleFilter = () => {
    setShowFilter(prev => !prev);
  };
  
  // 카카오 API 장소 목록 호출 - 페이지 파라미터 추가
  const loadPlaceData = async (keyword, page = 1, category = selectedPlaceFilters) => {
    // 정보 로드 전 접근 차단
    if (!objRegions?.mapX || !objRegions?.mapY) return;

    // 페이지 및 옵션 캐시 키
    const cacheKey = `${page}-${category.join(",")}`;

    // 키워드 검색은 캐시 안 씀
    if (keyword) {
      try {
        setLoading(true);
        const response = await withMinDelay(getPlaceApi(category, keyword, objRegions.mapX, objRegions.mapY, page));
        setSearchResults(response.data.places);
        setPagination(prev => ({
          ...prev,
          PLACE: { current: page, total: response.data.totalCount }
        }));
      } catch (error) {
        console.warn(`장소 데이터 호출 오류`);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 키워드 없으면 캐시 확인
    if (placeCache.pages[cacheKey]) {
      setSearchResults(placeCache.pages[cacheKey]);
      setPagination(prev => ({
        ...prev,
        PLACE: { current: page, total: placeCache.totalCount }
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await withMinDelay(getPlaceApi(category, "", objRegions.mapX, objRegions.mapY, page));
      const data = response.data;

      // 캐시에 저장
      setPlaceCache(prev => ({
        ...prev,
        pages: { ...prev.pages, [cacheKey]: data.places },
        totalCount: data.totalCount,
      }));

      setSearchResults(data.places);
      setPagination(prev => ({
        ...prev,
        PLACE: { current: page, total: data.totalCount }
      }));
    } catch (error) {
      console.warn(`장소 데이터 호출 오류`);
    } finally {
      setLoading(false);
    }
  };

  // 관광포털 API 장소 목록 호출 - 페이지 파라미터 추가
  const loadThemeData = async (keyword, page = 1, theme = selectedThemeFilters) => { 
    // 정보 로드 전 접근 차단
    if (!objRegions || !objRegions?.mapX || !objRegions?.mapY) return;

    // 페이지 및 옵션 캐시 키
    const cacheKey = `${page}-${theme.join(",")}`;

    // 키워드 검색은 캐시 안 씀
    if (keyword) {
      try {
        setLoading(true);
        const response = await withMinDelay(getThemeApi(theme, keyword, objRegions.mapX, objRegions.mapY, selectedSigu, page));
        setSearchResults(response.data.themes);
        setPagination(prev => ({
          ...prev,
          THEME: { current: page, total: response.data.totalCount }
        }));
      } catch (error) {
        console.warn(`장소 데이터 호출 오류`);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 키워드 없으면 캐시 확인
    if (themeCache.pages[cacheKey]) {
      setSearchResults(themeCache.pages[cacheKey]);
      setPagination(prev => ({
        ...prev,
        THEME: { current: page, total: themeCache.totalCount }
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await withMinDelay(getThemeApi(theme, "", objRegions.mapX, objRegions.mapY, selectedSigu, page));
      const data = response.data;

      // 캐시에 저장
      setThemeCache(prev => ({
        ...prev,
        pages: { ...prev.pages, [cacheKey]: data.themes },
        totalCount: data.totalCount,
      }));

      setSearchResults(data.themes);
      setPagination(prev => ({
        ...prev,
        THEME: { current: page, total: data.totalCount }
      }));
    } catch (error) {
      console.warn(`장소 데이터 호출 오류`);
    } finally {
      setLoading(false);
    }
  }

  // 관광포털 API 주변 장소(CAMP/WELLNESS) 목록 호출 
  const loadAroundData = async (filter, page = 1,) => {
    // 정보 로드 전 접근 차단
    if (!objRegions?.mapX || !objRegions?.mapY) return;

    // 페이지 및 옵션 캐시 키
    const cacheKey = `${filter}-${page}`;

    // 키워드 없으면 캐시 확인
    if (aroundCache.pages[cacheKey]) {
      setSearchResults(aroundCache.pages[cacheKey]);
      setPagination(prev => ({
        ...prev,
        AROUND: { current: page, total: aroundCache.totalCount }
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await withMinDelay(getAroundApi(filter, objRegions.mapX, objRegions.mapY, page));
      const data = response.data;
      
      // 캐시에 저장
      setAroundCache(prev => ({
        ...prev,
        pages: { ...prev.pages, [cacheKey]: data.themes },
        totalCount: data.totalCount,
      }));

      setSearchResults(data.themes);
      setPagination(prev => ({
        ...prev,
        AROUND: {current: page, total: data.totalCount }
      }));
    } catch (error) {
      console.warn("장소 데이터 호출 오류");
    } finally {
      setLoading(false);
    }
};

  // 초기화 (searchType 또는 지역 변경 시)
  useEffect(() => {
    if (!objRegions || !objRegions?.mapX || !objRegions?.mapY) return;

    setIsRecommendPopup(false);

    setIsFilterCamp(false);
    setIsFilterWellness(false);
    setSelectedAroundFilter("");

    setSearchKeyword("");
    setIsSearched(false);

    setPlaceCache({
      pages: {},
      totalCount: 0,
    });

    setThemeCache({
      pages: {},
      totalCount: 0,
    });

    setPagination(prev => ({
      ...prev,
      PLACE: {
        current: 1,
        total: 0,
      },
      THEME: {
        current: 1,
        total: 0,
      }
    }));

    setSearchResults([]);
    
    if (searchType === "PLACE") {
      setSelectedPlaceFilters(["CT1","FD6","AT4","CE7","AD5"]);
      loadPlaceData("", 1, ["CT1","FD6","AT4","CE7","AD5"]);
    } else {
      setSelectedThemeFilters(["PET","BF"]);
      loadThemeData("", 1, ["PET","BF"]);
    }
  }, [searchType, objRegions]);

  // 페이지 변경
  const onPageChange = (page) => {
    if (selectedAroundFilter) {
      loadAroundData(selectedAroundFilter, page);
      return;
    }

    if (searchType === "PLACE") {
      loadPlaceData(searchKeyword, page, selectedPlaceFilters);
    } else {
      loadThemeData(searchKeyword, page, selectedThemeFilters);
    }

    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const onKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const onKeywordSearch = (keyword) => {
    setIsFilterCamp(false);
    setIsFilterWellness(false);
    setSelectedAroundFilter("");

    const finalKeyword = keyword?.trim();
    setSearchKeyword(finalKeyword);

    if (!finalKeyword) {
      setIsSearched(false);
      const currentPage = pagination[searchType]?.current || 1;
      if (searchType === "PLACE") {
        loadPlaceData("", currentPage, selectedPlaceFilters);
      } else {
        loadThemeData("", currentPage, selectedThemeFilters);
      }
      return;
    }

    setIsSearched(true);

    if (searchType === "PLACE") {
      loadPlaceData(finalKeyword, 1, selectedPlaceFilters);
      return;
    } else {
      loadThemeData(finalKeyword, 1, selectedThemeFilters);
    }

    // SPOT, FOOD는 API로 키워드 검색
    // loadAreaData(searchType, 1, finalKeyword);
  };

  // 옵션 변경
  useEffect(() => {
    if (!objRegions || !objRegions?.mapX || !objRegions?.mapY) return;
    
    // 초기 렌더링 무시
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // searchType 변경 중이면 실행 막기
    if (isChangingType.current) {
      isChangingType.current = false;
      return;
    }

    setSearchKeyword("");
    if (searchType === "PLACE") {
      if (selectedPlaceFilters.length === 0) return;
      loadPlaceData("", 1, selectedPlaceFilters);
    } else {
      if (selectedThemeFilters.length === 0) return;
      loadThemeData("", 1, selectedThemeFilters);
    }
  
  }, [selectedPlaceFilters, selectedThemeFilters]);

  // 주변 장소 버튼 선택(캠핑, 웰니스)
  useEffect(() => {
    if (!objRegions || !objRegions?.mapX || !objRegions?.mapY) return;

    if (isFilterCamp) {
      setSelectedAroundFilter("CAMP");
      loadAroundData("CAMP");
    }

    if (isFilterWellness) {
      setSelectedAroundFilter("WELLNESS");
      loadAroundData("WELLNESS");
    }

  }, [isFilterCamp, isFilterWellness]);

  // 주변 장소 검색 종료
  const closeAroundFilter = () => {

    setIsFilterCamp(false);
    setIsFilterWellness(false);

    setSelectedAroundFilter("");

    if (searchType == "PLACE") {
      loadPlaceData("", 1, selectedPlaceFilters);
    }
    else {
      loadThemeData("", 1, selectedThemeFilters);
    }
  }

  // 연관 여행지 키워드 검색
  useEffect(() => {
    // 키워드 없으면 무시
    if (!relatedPlaceKeyword?.trim()) return;

    // 검색창 값도 같이 변경
    setSearchKeyword(relatedPlaceKeyword);

    // 검색 상태 변경
    setIsSearched(true);

    // PLACE 검색
    setSearchType("PLACE")
    loadPlaceData(relatedPlaceKeyword, 1, selectedPlaceFilters);
    setRelatedPlaceKeyword("");
    
}, [relatedPlaceKeyword]);

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
            h="auto"
            settings={{ isVertical: true, justify: "flex-start" }}
            style={{ 
              borderBottom: "solid 1px #A8A8A8",
              minHeight: "108px",
              gap: "15px",
              overflow: "visible",
              paddingBottom: "5px",
              flex: "none",
            }}
            bg="none"
          >
            <FlexBox h="40px" bg="none" style={{ minHeight: "40px" }}>
              <ToggleButtonGroup toggles={FILTER_TOGGLES} onChangedEvent={onToggleChange} />
            </FlexBox>
              {
                selectedAroundFilter ? (
                <FlexBox h="48px"  bg="none" style={{ gap: "10px" }}>
                  {selectedAroundFilter === "CAMP" ? (
                    <TextBox size="20px" color="#565656">
                      <TentTree size={25} style={{marginRight: "15px", position: "relative", top: "0px"}}/> 
                        캠핑
                      </TextBox> 
                    ) : ( 
                    <TextBox size="20px" color="#565656">
                      <Leaf size={25} style={{marginRight: "15px", position: "relative", top: "0px"}}/> 
                        웰니스
                    </TextBox>)
                  }
                  <CloseOutlined style={{cursor:"pointer"}} onClick={closeAroundFilter}/>
                </FlexBox>
                ) : ( 
                  (!showFilter ? (
                    <FlexBox h="48px"  bg="none" style={{ gap: "10px" }}>
                      <SearchInput
                        placeholder={"여행 장소를 검색해 보세요!"}
                        value={searchKeyword}
                        onSearchEvent={onKeywordSearch}
                        onChange={onKeywordChange}
                      />
                      <IconButton width="38px" height="38px" fontSize="12px" type={"default"} onClickEvent={handleFilter}>
                        <UnorderedListOutlined style={{ fontSize: "16px" }}/>
                      </IconButton>
                    </FlexBox>
                    ) : (
                    searchType === "PLACE" ? (
                      <FlexBox w="320px">
                        <PlaceFilter setShowFilter = {setShowFilter} selectedPlaceFilters={selectedPlaceFilters} setSelectedPlaceFilters={setSelectedPlaceFilters}/>
                      </FlexBox>
                      ) : (
                      <FlexBox w="320px">
                        <ThemeFilter setShowFilter = {setShowFilter} selectedThemeFilters={selectedThemeFilters} setSelectedThemeFilters={setSelectedThemeFilters}/>
                      </FlexBox>
                      )
                    )
                  )
                )
              }
          </FlexBox>
          {/* 리스트 */}
          <FlexBox
            h="100%"
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
          <FlexBox h="40px" bg="none"
            settings={{justify: "center"}}
            style={{ minHeight:"40px", padding: "8px 0" }}>
            <Pagination
              current={selectedAroundFilter? pagination.AROUND.current: pagination[searchType]?.current || 1}
              total={selectedAroundFilter? pagination.AROUND.total: pagination[searchType]?.total || 0}
              pageSize={PAGE_SIZE}
              onChange={onPageChange}
              showSizeChanger={false}
              size="small"
              itemRender={(page, type, element) => {
                if (type === "next" && searchType === "PLACE") {
                  return <span style={{ pointerEvents: "none", opacity: 0.3 }}>{element}</span>;
                }
                return element;
              }}
            />
          </FlexBox>
          {/* 북마크 팝업 */}
          {((selectedAreaId?.length > 0) || (selectedPlaceId?.length > 0)) && (
            <FlexBox
              w="240px"
              h="80px"
              bg="none"
              style={{
                position: "absolute",
                top: "0%",
                right: "0%",
                zIndex: 2,
                transform: `translate(-10%, ${popupPosY - 48 }px)`,
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