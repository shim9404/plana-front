import React, { useEffect, useState, useRef } from 'react';
import { LoungePostCard } from '../LoungePostCard';
import { Globe, FolderX, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Select, Input, Spin } from 'antd';

import { getHubPlansApi } from '../../../services/loungeApi';
import regionStore from '../../../store/home/regionStore';
import { fetchWithRetry } from '../../../utils/apiUtil';
import { getRegionApi } from '../../../services/regionApi';
import { getRegionDataForCascader } from '../../../services/regionDataParser';
import { LoungeFilterPopup } from '../LoungeFilterPopup';
import { KEYWORD_OPTIONS } from '../../../constants/keyword';

import '../../../styles/loungePage.css'


const tabContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
};

const fixedHeaderContainerStyle = {
  width: '100%',
  backgroundColor: '#fff',
  flexShrink: 0,
};

const fixedHeaderContentStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '72px',
  padding: '0 40px',
  maxWidth: '1435px', 
  margin: '0 auto',   
  width: '100%',
  borderBottom: '1px solid #e5e7eb',
};

const selectStyle = {
  width: '130px',
  height: '40px',
  borderRadius: '8px',
};

const searchInputStyle = {
  width: '772px',
  height: '40px',
  borderRadius: '8px',
  borderColor: '#cbd5e1',
};

const filterButtonStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  border: `1px solid ${isActive ? '#1e293b' : '#cbd5e1'}`,
  borderRadius: '8px',
  backgroundColor: isActive ? '#f1f5f9' : '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s',
});

const scrollableContentStyle = {
  flex: 1,
  overflowY: 'auto',
  width: '100%',
};

const scrollableInnerStyle = {
  maxWidth: '1248px',
  margin: '0 auto',
  padding: '40px',
  width: '100%',
};

const contentTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1f2937',
  marginBottom: '24px',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', 
  gap: '24px',
};

const emptyContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '320px',
  backgroundColor: '#f1f5f9',
  borderRadius: '12px',
  padding: '40px',
  textAlign: 'center',
};

export const BoardTabContent = ({ onUploadClick }) => {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); 
  const [error, setError] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1100);
  const [searchType, setSearchType] = useState('name'); 
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('LATEST'); 

  const [minNights, setMinNights] = useState(null);
  const [maxNights, setMaxNights] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const regionData = regionStore((state) => state.regionData);
  const updateRegionData = regionStore((state) => state.updateRegionData);

  const observerTarget = useRef(null);
  const isLoadingRef = useRef(isLoading);

const SEARCH_TYPE_DROPDOWN_CLASS = 'search-type-select-dropdown';

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 1100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (regionData?.cascaderOptions && regionData.cascaderOptions.length > 0) {
      return;
    }

    async function fetchRegionData() {
      try {
        const response = await fetchWithRetry(() => getRegionApi());
        const parsedData = getRegionDataForCascader(response.data.regions);
        if (parsedData) {
          updateRegionData(parsedData);
        }
      } catch (error) {
        console.error("Lounge 지역 데이터 로드 실패:", error);
      }
    }

    fetchRegionData();
  }, [regionData, updateRegionData]);

  const fetchHubPlans = async (pageNum, keyword = '', isNewSearch = false) => {
    if (isLoadingRef.current && pageNum !== 1) return;
    setIsLoading(true);
    setError(null);

    if (pageNum === 1 || isNewSearch) {
      setPlans([]); 
    }

    try {
      const params = { sortBy, page: pageNum, size: 9 };
      
      // 검색 키워드 조건
      if (keyword.trim()) {
        if (searchType === 'name') {
          params.name = keyword;
        } else if (searchType === 'nickname') {
          params.nickname = keyword;
        } else if (searchType === 'all') {
          // 제목과 닉네임 모두에 검색어 전달 (백엔드 쿼리가 OR 조건으로 처리하도록 설계되어 있어야 함)
          params.name = keyword;
          params.nickname = keyword;
        }
      }

      if (minNights !== null && minNights !== undefined) {
        params.minNights = minNights;
      }
      if (maxNights !== null && maxNights !== undefined) {
        params.maxNights = maxNights;
      }

      if (selectedRegions && selectedRegions.length > 0) {
        const regionIds = selectedRegions.map((item) => item[1]).filter(Boolean);
        if (regionIds.length > 0) {
          params.regionIds = regionIds; // 배열 형태로 전달 (예: ["30000", "41000"])
        }
      }

      // 4. 태그 키워드 ID 목록 (List<String>)
      if (selectedKeywords && selectedKeywords.length > 0) {
        params.keywordIds = selectedKeywords; // 배열 형태로 전달 (예: ["KW1", "KW2"])
      }

      const response = await getHubPlansApi(params);
      const planList = response?.data?.plans || [];
      
      setHasMore(planList.length >= 9);

      if (isNewSearch || pageNum === 1) {
        setPlans(planList);
      } else {
        setPlans((prev) => [...prev, ...planList]);
      }
    } catch (err) {
      console.error('허브 목록을 불러오는 중 에러가 발생했습니다.', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) fetchHubPlans(page, searchKeyword, false);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchHubPlans(1, searchKeyword, true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
      observer.disconnect();
    };
  }, [hasMore, plans]);

  useEffect(() => {
    fetchHubPlans(1, '', true);
  }, []);

  return (
    <div style={tabContainerStyle}>
      <div style={fixedHeaderContainerStyle}>
        <div style={fixedHeaderContentStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Select 
              value={searchType} 
              style={selectStyle}
              popupClassName={SEARCH_TYPE_DROPDOWN_CLASS}
              optionRender={(option) => {
                  return (
                    <div 
                      style={{ textAlign: 'center', width: '100%' }}
                    >
                      {option.label}
                    </div>
                  );
                }}
              onChange={(value) => setSearchType(value)}
            >
              <Select.Option value="name">제목</Select.Option>
              <Select.Option value="nickname">닉네임</Select.Option>
              <Select.Option value="all">제목+닉네임</Select.Option>
            </Select>
            
            <Input 
              placeholder="여행 찾기" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              suffix={
                <Search 
                  size={16} 
                  color="#64748b" 
                  style={{ cursor: 'pointer' }} 
                  onClick={handleSearch}
                />
              }
              style={searchInputStyle}
            />
           {showFilter && (
            <LoungeFilterPopup
                minNights={minNights}
                setMinNights={setMinNights}
                maxNights={maxNights}
                setMaxNights={setMaxNights}
                regionOptions={regionData?.cascaderOptions || []}
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
                selectedKeywords={selectedKeywords}
                setSelectedKeywords={setSelectedKeywords}
              />
            )}

            {/* 필터 버튼 */}
            <button 
              style={filterButtonStyle(showFilter)} 
              type="button" 
              title="상세 필터"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal size={18} color={showFilter ? "#1e293b" : "#64748b"} />
            </button>
          </div>

          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              height: '40px',
              width: isNarrow ? '40px' : 'auto',
              padding: isNarrow ? '0' : '0 16px',
              border: '1px solid #A8A8A8', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              color: '#2D3561',            
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
            }} 
            onClick={onUploadClick} 
            type="button"
            title="내 여행 업로드"
          >
            <Plus size={16} strokeWidth={2.5} />
            {!isNarrow && <span>내 여행 업로드</span>}
          </button>
        </div>
      </div>
      
      <div style={scrollableContentStyle}>
        <div style={scrollableInnerStyle}>
          <div style={contentTitleStyle}>
            <Globe size={20} color="#4b5563" />
            <span>다른 사람들의 여행 계획을 둘러봐요</span>
          </div>

          {isLoading && plans.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <Spin size="large" tip="계획들을 불러오는 중..." />
            </div>
          ) : plans.length === 0 ? (
            <div style={emptyContainerStyle}>
              <FolderX size={48} color="#94a3b8" />
              <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: '600', color: '#64748b' }}>
                조건에 맞는 여행이 없어요...😢
              </div>
            </div>
          ) : (
            <>
              <div style={gridContainerStyle}>
                {plans.map((plan, index) => (
                  <LoungePostCard key={`${plan.id}-${index}`} plan={plan} />
                ))}
              </div>

              <div ref={observerTarget} style={{ height: '40px', paddingTop: '40px', paddingBottom: '40px' ,display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                {isLoading && <Spin tip="추가 계획을 불러오는 중..." />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};