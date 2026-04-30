import axiosInstance from './axiosInstance'

/**
 * 유입 경로 랭킹 1건
 * 예: { source: '검색', count: 210 }
 *
 * @typedef {Object} SourceRankRow
 * @property {string} source  유입 경로명
 * @property {number} count   집계 건수
 */

/**
 * 관리자 이용자 통계 응답 data 구조
 *
 * visitorSummary      : 방문자 요약 수치
 * visitorWeeklySeries : 주간 방문자 추이(막대/라인 차트용)
 * visitorSources      : 방문자 유입 경로별 랭킹
 * signupSummary       : 회원가입 요약 수치
 * signupWeeklySeries  : 주간 회원가입 추이
 * signupSources       : 회원가입 소스별 랭킹
 *
 * @typedef {Object} AdminUsageUsersData
 * @property {{ dailyCount: number, weeklyCount: number, monthlyCount: number }} visitorSummary
 * @property {Array<{ periodLabel: string, visitorCount: number, fourWeekAvgVisitorCount: number }>} visitorWeeklySeries
 * @property {{ daily: SourceRankRow[], weekly: SourceRankRow[], monthly: SourceRankRow[] }} visitorSources
 * @property {{ dailyCount: number, weeklyCount: number, monthlyCount: number }} signupSummary
 * @property {Array<{ periodLabel: string, newSignupCount: number, fourWeekAvgNewSignupCount: number }>} signupWeeklySeries
 * @property {{ daily: SourceRankRow[], weekly: SourceRankRow[], monthly: SourceRankRow[] }} signupSources
 */

/**
 * 관리자 이용 통계 API 문서
 *
 * 공통 응답 형식:
 * {
 *   success: boolean,
 *   message: string,
 *   data: object
 * }
 *
 * 호출 경로:
 * GET /api/admin/usage/users?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 *
 * 프론트/백엔드에서 data 내부 키 이름을 동일하게 유지하는 것이 중요합니다.
 * 그래야 차트/카드/표 UI 연결 시 혼선이 줄어듭니다.
 */

/**
 * mock 모드 여부 확인
 *
 * - 기본값: mock 모드 사용
 * - .env 에서 VITE_ADMIN_USAGE_MOCK=false 일 때만 실제 API 호출
 *
 * Vite 환경변수는 문자열로 들어오므로
 * 'false' 와 정확히 비교하고 있습니다.
 */
const isMockMode = () => import.meta.env.VITE_ADMIN_USAGE_MOCK !== 'false'

/**
 * 이용자 통계 mock 데이터 생성
 *
 * 백엔드가 준비되지 않았거나,
 * 프론트 차트/UI를 먼저 개발할 때 사용하는 임시 데이터입니다.
 *
 * @returns {AdminUsageUsersData}
 */
function buildMockAdminUsageUsers() {
  return {
    // 방문자 요약 카드 데이터
    visitorSummary: {
      dailyCount: 842,
      weeklyCount: 5120,
      monthlyCount: 22180,
    },

    // 주간 방문자 추이 차트 데이터
    visitorWeeklySeries: [
      { periodLabel: '1주 전', visitorCount: 1180, fourWeekAvgVisitorCount: 1050 },
      { periodLabel: '2주 전', visitorCount: 1320, fourWeekAvgVisitorCount: 1080 },
      { periodLabel: '3주 전', visitorCount: 980, fourWeekAvgVisitorCount: 1100 },
      { periodLabel: '4주 전', visitorCount: 1240, fourWeekAvgVisitorCount: 1125 },
    ],

    // 방문자 유입 경로 랭킹
    visitorSources: {
      daily: [
        { source: '직접 유입', count: 320 },
        { source: '검색', count: 210 },
        { source: 'SNS', count: 156 },
        { source: '기타', count: 156 },
      ],
      weekly: [
        { source: '검색', count: 1820 },
        { source: '직접 유입', count: 1650 },
        { source: 'SNS', count: 980 },
        { source: '이메일', count: 670 },
      ],
      monthly: [
        { source: '검색', count: 8900 },
        { source: '직접 유입', count: 7200 },
        { source: 'SNS', count: 4100 },
        { source: '이메일', count: 1980 },
      ],
    },

    // 회원가입 요약 카드 데이터
    signupSummary: {
      dailyCount: 28,
      weeklyCount: 156,
      monthlyCount: 602,
    },

    // 주간 회원가입 추이 차트 데이터
    signupWeeklySeries: [
      { periodLabel: '1주 전', newSignupCount: 42, fourWeekAvgNewSignupCount: 38 },
      { periodLabel: '2주 전', newSignupCount: 35, fourWeekAvgNewSignupCount: 36 },
      { periodLabel: '3주 전', newSignupCount: 30, fourWeekAvgNewSignupCount: 35 },
      { periodLabel: '4주 전', newSignupCount: 49, fourWeekAvgNewSignupCount: 37 },
    ],

    // 회원가입 소스별 랭킹
    signupSources: {
      daily: [
        { source: 'GOOGLE', count: 12 },
        { source: 'EMAIL', count: 9 },
        { source: 'KAKAO', count: 5 },
        { source: 'NAVER', count: 2 },
      ],
      weekly: [
        { source: 'EMAIL', count: 62 },
        { source: 'GOOGLE', count: 48 },
        { source: 'KAKAO', count: 28 },
        { source: 'NAVER', count: 18 },
      ],
      monthly: [
        { source: 'EMAIL', count: 260 },
        { source: 'GOOGLE', count: 198 },
        { source: 'KAKAO', count: 94 },
        { source: 'NAVER', count: 50 },
      ],
    },
  }
}

/**
 * 이용자 통계 조회
 *
 * 동작 순서:
 * 1) mock 모드면 mock 데이터 반환
 * 2) 실제 모드면 백엔드 API 호출
 * 3) success 검증
 * 4) data 반환
 * 5) 실패 시 사용자 친화적인 에러 메시지 throw
 *
 * @param {{ startDate: string, endDate: string }} range YYYY-MM-DD
 * @returns {Promise<AdminUsageUsersData>}
 */
export async function fetchAdminUsageUsers(range) {
  // 개발 중이면 mock 반환
  if (isMockMode()) {
    // 실제 API 호출처럼 보이게 약간 지연
    await new Promise((r) => {
      setTimeout(r, 280)
    })
    return buildMockAdminUsageUsers()
  }

  try {
    // 실제 백엔드 호출
    const response = await axiosInstance.get('/api/admin/usage/users', {
      params: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    })

    // axios 응답 body
    const body = response.data

    // 공통 응답 규약 검사
    if (!body || body.success !== true) {
      throw new Error(body?.message || '이용자 통계 응답이 올바르지 않습니다.')
    }

    // 실제 통계 데이터 반환
    return body.data
  } catch (err) {
    // 서버 메시지가 있으면 우선 사용
    const msg =
      err.response?.data?.message ||
      err.message ||
      '이용자 통계를 불러오는 중 오류가 발생했습니다.'

    // 상위 컴포넌트에서 catch 할 수 있도록 Error throw
    throw new Error(msg)
  }
}

/**
 * 지역 검색 랭킹 1건
 * 예: "서울특별시 > 강남구"
 *
 * @typedef {Object} RegionSearchRankRow
 * @property {string} regionId Table rowKey용 고유 ID (백엔드 region_id 또는 mock 식별값)
 * @property {string} regionLabel 광역단체 > 시·군·구
 * @property {number} count 검색 건수
 */

/**
 * 지역 검색 통계 API 명세
 * GET /api/admin/regions?startDate=&endDate=
 *
 * 백엔드는 기간 기준 RegionSearchResponse[] 배열을 반환한다.
 * UI는 mock과 동일하게 { daily, weekly, monthly } 를 사용하므로 normalize 에서 맞춘다.
 */

/**
 * 17개 광역단체 예시 라벨
 * 목 데이터 생성용
 */
const MOCK_REGION_BASE_LABELS = [
  '서울특별시 > 강남구',
  '부산광역시 > 해운대구',
  '대구광역시 > 수성구',
  '인천광역시 > 연수구',
  '광주광역시 > 동구',
  '대전광역시 > 유성구',
  '울산광역시 > 남구',
  '세종특별자치시 > 세종시',
  '경기도 > 수원시 영통구',
  '강원특별자치도 > 춘천시',
  '충청북도 > 청주시 흥덕구',
  '충청남도 > 천안시 동남구',
  '전북특별자치도 > 전주시 완산구',
  '전라남도 > 여수시',
  '경상북도 > 포항시 북구',
  '경상남도 > 창원시 성산구',
  '제주특별자치도 > 제주시',
]

/**
 * seed 값을 기반으로 지역 순위 mock 데이터를 생성
 *
 * seed를 바꾸면 일/주/월 데이터가 조금씩 다르게 보이도록 설계
 *
 * @param {number} seed
 * @returns {RegionSearchRankRow[]}
 */
function buildShuffledRegionRanks(seed) {
  const mults = [1, 0.92, 0.88, 0.85, 0.8, 0.76, 0.72, 0.68, 0.64, 0.6, 0.56, 0.52, 0.48, 0.44, 0.4, 0.36, 0.32]

  const rows = MOCK_REGION_BASE_LABELS.map((regionLabel, i) => ({
    regionId: `mock-${seed}-${i}-${regionLabel}`,
    regionLabel,
    count: Math.max(3, Math.round((920 - i * 40 + seed * 17) * mults[(i + seed) % 17])),
  }))

  // 검색 건수 내림차순 정렬
  rows.sort((a, b) => b.count - a.count)
  return rows
}

/**
 * 지역 검색 통계 mock 데이터
 *
 * @returns {{ daily: RegionSearchRankRow[], weekly: RegionSearchRankRow[], monthly: RegionSearchRankRow[] }}
 */
function buildMockAdminUsageRegions() {
  return {
    daily: buildShuffledRegionRanks(1),
    weekly: buildShuffledRegionRanks(3),
    monthly: buildShuffledRegionRanks(5),
  }
}

/**
 * GET /api/admin/regions JSON 배열 → RegionRankPeriodTables 용 구조
 *
 * @param {unknown} body axios response.data (RegionSearchResponse[] 기대)
 * @returns {{ daily: RegionSearchRankRow[], weekly: RegionSearchRankRow[], monthly: RegionSearchRankRow[] }}
 */
function normalizeAdminUsageRegionsPayload(body) {
  const list = Array.isArray(body) ? body : []
  const rows = list.map((row) => ({
    regionId: row.regionId ? String(row.regionId) : `unknown-${row.siguName ?? ''}-${row.searchCount ?? 0}`,
    regionLabel: row.siguName ?? row.regionId ?? '—',
    count: Number(row.searchCount ?? 0),
  }))
  // 현재 API는 기간 한 번 집계만 제공 → 일·주·월 UI 슬롯에 동일 랭킹을 채움 (추후 API 분리 시 조정)
  return {
    daily: rows,
    weekly: rows,
    monthly: rows,
  }
}

/**
 * 지역 검색 통계 조회
 *
 * @param {{ startDate: string, endDate: string }} range
 * @returns {Promise<{ daily: RegionSearchRankRow[], weekly: RegionSearchRankRow[], monthly: RegionSearchRankRow[] }>}
 */
export async function fetchAdminUsageRegions(range) {
  if (isMockMode()) {
    await new Promise((r) => {
      setTimeout(r, 220)
    })
    return buildMockAdminUsageRegions()
  }
  try {
    const response = await axiosInstance.get('/api/admin/regions', {
      params: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    })
    return normalizeAdminUsageRegionsPayload(response.data)
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      '지역 검색 통계를 불러오는 중 오류가 발생했습니다.'
    throw new Error(msg)
  }
}

/**
 * 검색어 랭킹 1건
 *
 * @typedef {Object} KeywordSearchRankRow
 * @property {string} [rowId] Table rowKey용 (API 정규화 시 부여)
 * @property {string} keyword 검색어
 * @property {number} count 검색 횟수
 */

/**
 * 검색 카테고리별 랭킹
 *
 * nearby     : 근처장소
 * attraction : 관광지
 * restaurant : 맛집
 *
 * @typedef {Object} KeywordSearchByCategory
 * @property {KeywordSearchRankRow[]} nearby
 * @property {KeywordSearchRankRow[]} attraction
 * @property {KeywordSearchRankRow[]} restaurant
 */

/**
 * 검색어 통계 API 명세
 * GET /api/admin/keywords?startDate=&endDate=
 * 응답: SearchKeywordResponse[] → { searchKeyword, searchCount }
 */
const KEYWORD_MOCK_NEARBY = [
  '카페',
  '주차장',
  '화장실',
  '편의점',
  '지하철역',
  '버스정류장',
  '약국',
  '은행',
  '마트',
  '주유소',
]

const KEYWORD_MOCK_ATTRACTION = [
  '해운대',
  '경복궁',
  '남산타워',
  '제주 올레',
  '한라산',
  '전주 한옥마을',
  '감천문화마을',
  '설악산',
  '안동 하회마을',
  '보문사',
]

const KEYWORD_MOCK_RESTAURANT = [
  '흑돼지',
  '회',
  '냉면',
  '초밥',
  '파스타',
  '삼겹살',
  '치킨',
  '떡볶이',
  '빵',
  '브런치',
]

/**
 * 키워드 목록을 받아 count 기반 랭킹으로 변환
 *
 * @param {string[]} words
 * @param {number} seed
 * @returns {KeywordSearchRankRow[]}
 */
function buildKeywordRanks(words, seed) {
  return words
    .map((keyword, i) => ({
      keyword,
      count: Math.max(5, Math.round(2100 - i * 180 + seed * 37 + ((i * seed) % 200))),
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * 카테고리별 키워드 랭킹 묶음 생성
 *
 * @param {number} seed
 * @returns {KeywordSearchByCategory}
 */
function buildKeywordCategoryBucket(seed) {
  return {
    nearby: buildKeywordRanks(KEYWORD_MOCK_NEARBY, seed),
    attraction: buildKeywordRanks(KEYWORD_MOCK_ATTRACTION, seed + 2),
    restaurant: buildKeywordRanks(KEYWORD_MOCK_RESTAURANT, seed + 4),
  }
}

/**
 * 검색어 통계 mock 데이터 생성
 *
 * @returns {{ daily: KeywordSearchByCategory, weekly: KeywordSearchByCategory, monthly: KeywordSearchByCategory }}
 */
function buildMockAdminUsageKeywords() {
  return {
    daily: buildKeywordCategoryBucket(1),
    weekly: buildKeywordCategoryBucket(4),
    monthly: buildKeywordCategoryBucket(8),
  }
}

/**
 * GET /api/admin/keywords 배열 → KeywordRankPeriodTables 용 구조
 *
 * 백엔드는 기간·검색어별 집계만 제공(유형 구분 없음).
 * UI는 일·주·월 × 근처/관광/맛집 슬롯이 있어 동일 랭킹을 채운다.
 *
 * @param {unknown} body axios response.data
 * @returns {{ daily: KeywordSearchByCategory, weekly: KeywordSearchByCategory, monthly: KeywordSearchByCategory }}
 */
function normalizeAdminUsageKeywordsPayload(body) {
  const list = Array.isArray(body) ? body : []
  const rows = list.map((row, i) => ({
    rowId: `kw-${i}-${String(row.searchKeyword ?? '')}`,
    keyword: row.searchKeyword != null ? String(row.searchKeyword) : '',
    count: Number(row.searchCount ?? 0),
  }))
  const bucket = {
    nearby: rows,
    attraction: rows,
    restaurant: rows,
  }
  return {
    daily: bucket,
    weekly: bucket,
    monthly: bucket,
  }
}

/**
 * 검색어 통계 조회
 *
 * @param {{ startDate: string, endDate: string }} range
 * @returns {Promise<{ daily: KeywordSearchByCategory, weekly: KeywordSearchByCategory, monthly: KeywordSearchByCategory }>}
 */
export async function fetchAdminUsageKeywords(range) {
  if (isMockMode()) {
    await new Promise((r) => {
      setTimeout(r, 220)
    })
    return buildMockAdminUsageKeywords()
  }

  try {
    const response = await axiosInstance.get('/api/admin/keywords', {
      params: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    })
    return normalizeAdminUsageKeywordsPayload(response.data)
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      '검색어 통계를 불러오는 중 오류가 발생했습니다.'
    throw new Error(msg)
  }
}

/**
 * 북마크 장소 랭킹 1건
 *
 * @typedef {Object} BookmarkPlaceRankRow
 * @property {string} placeLabel 장소명
 * @property {number} count 북마크 수
 */

/**
 * 북마크 카테고리별 랭킹
 *
 * @typedef {Object} BookmarkRankByCategory
 * @property {BookmarkPlaceRankRow[]} nearby
 * @property {BookmarkPlaceRankRow[]} attraction
 * @property {BookmarkPlaceRankRow[]} restaurant
 */

/**
 * 이용 통계 API 명세
 * GET /api/admin/usage/statistics?startDate=&endDate=
 *
 * newTripPlans   : 새 여행 계획 관련 통계
 * bookmarkPlaces : 북마크 수 통계
 * bookmarkRanks  : 북마크 장소 순위
 */

/**
 * 공통 주간 시계열 mock 생성 함수
 *
 * barKey  : 막대 차트 값 키
 * lineKey : 평균선 값 키
 *
 * @param {string} barKey
 * @param {string} lineKey
 * @param {number} seed
 */
function buildUsageWeeklySeries(barKey, lineKey, seed) {
  const base = [
    { periodLabel: '1주 전', o: 1 },
    { periodLabel: '2주 전', o: 2 },
    { periodLabel: '3주 전', o: 3 },
    { periodLabel: '4주 전', o: 4 },
  ]

  return base.map(({ periodLabel, o }) => {
    const v = 48 + seed * 3 + o * 11
    const avg = Math.round(v * 0.88 + o * 2 + seed)

    return {
      periodLabel,
      [barKey]: v + o * 5,
      [lineKey]: avg,
    }
  })
}

const BOOKMARK_NEARBY_PLACES = ['스타벅스 강남점', '이마트 역삼점', 'CGV 코엑스', '올리브영', 'GS25 본점']
const BOOKMARK_ATTR_PLACES = ['해운대 해수욕장', '북촌 한옥마을', '제주 성산일출봉', '경복궁', '남이섬']
const BOOKMARK_REST_PLACES = ['원조할매국밥', '미진뼈해장국', '진미식당', '대흥식당', '목멱산방']

/**
 * 북마크 장소 랭킹 생성
 *
 * @param {string[]} places
 * @param {number} seed
 * @returns {BookmarkPlaceRankRow[]}
 */
function buildPlaceRanks(places, seed) {
  return places
    .map((placeLabel, i) => ({
      placeLabel,
      count: Math.max(2, Math.round(420 - i * 55 + seed * 19 + ((i + seed) % 80))),
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * 북마크 랭킹 카테고리 묶음 생성
 *
 * @param {number} seed
 * @returns {BookmarkRankByCategory}
 */
function buildBookmarkRankBucket(seed) {
  return {
    nearby: buildPlaceRanks(BOOKMARK_NEARBY_PLACES, seed),
    attraction: buildPlaceRanks(BOOKMARK_ATTR_PLACES, seed + 3),
    restaurant: buildPlaceRanks(BOOKMARK_REST_PLACES, seed + 6),
  }
}

/**
 * 이용 통계 mock 데이터 생성
 *
 * @returns {Object}
 */
function buildMockAdminUsageStatistics() {
  return {
    newTripPlans: {
      summary: { dailyCount: 14, weeklyCount: 86, monthlyCount: 312 },
      weeklySeries: buildUsageWeeklySeries('planCount', 'fourWeekAvgPlanCount', 2),
    },
    bookmarkPlaces: {
      summary: { dailyCount: 128, weeklyCount: 742, monthlyCount: 2890 },
      weeklySeries: buildUsageWeeklySeries('bookmarkCount', 'fourWeekAvgBookmarkCount', 5),
    },
    bookmarkRanks: {
      daily: buildBookmarkRankBucket(1),
      weekly: buildBookmarkRankBucket(4),
      monthly: buildBookmarkRankBucket(7),
    },
  }
}

/**
 * 이용 통계 조회
 *
 * - 새 여행 계획 수
 * - 북마크 수
 * - 북마크 장소 순위
 *
 * @param {{ startDate: string, endDate: string }} range
 */
export async function fetchAdminUsageStatistics(range) {
  if (isMockMode()) {
    await new Promise((r) => {
      setTimeout(r, 240)
    })
    return buildMockAdminUsageStatistics()
  }

  try {
    const response = await axiosInstance.get('/api/admin/usage/statistics', {
      params: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
    })

    const body = response.data

    if (!body || body.success !== true) {
      throw new Error(body?.message || '이용 통계 응답이 올바르지 않습니다.')
    }

    return body.data
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      '이용 통계를 불러오는 중 오류가 발생했습니다.'
    throw new Error(msg)
  }
}

/**
 * YYYY-MM-DD 형식 날짜 라벨 생성
 *
 * @param {number} days 최근 N일
 * @returns {string[]}
 */
function buildDateLabels(days) {
  const labels = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    labels.push(d.toISOString().slice(0, 10))
  }
  return labels
}

/**
 * 요약 대시보드 > 여행 관심 트렌드 mock 데이터 생성
 * - 날짜별 카테고리(근처장소/관광지/맛집) 북마크 건수를 반환
 *
 * @param {number} days 최근 N일
 * @returns {{
 *   series: Array<{ date: string, nearby: number, attraction: number, restaurant: number }>,
 *   summary: { insight: string }
 * }}
 */
function buildMockBookmarkTrend(days) {
  const labels = buildDateLabels(days)
  const series = labels.map((date, index) => {
    const wave = Math.sin(index / 3)
    const nearby = Math.max(10, Math.round(48 + wave * 8 + index * 0.7))
    const attraction = Math.max(10, Math.round(42 + Math.cos(index / 2.7) * 9 + index * 0.65))
    const restaurant = Math.max(10, Math.round(45 + Math.sin(index / 2.4) * 7 + index * 0.8))
    return { date, nearby, attraction, restaurant }
  })

  const last = series[series.length - 1]
  const insight = last
    ? `${last.date} 기준 ${last.nearby >= last.attraction && last.nearby >= last.restaurant ? '근처장소' : last.attraction >= last.restaurant ? '관광지' : '맛집'} 관심이 가장 높고, 3개 카테고리 모두 안정적인 증가 흐름을 보입니다.`
    : '최근 기간의 관심 추이를 확인하세요.'

  return { series, summary: { insight } }
}

/**
 * 요약 대시보드 > 여행 관심 트렌드 조회
 *
 * 요구 데이터:
 * - series: [{ date, nearby, attraction, restaurant }]
 * - summary: { insight }
 *
 * @param {{ days: number }} params
 * @returns {Promise<{ series: Array<{ date: string, nearby: number, attraction: number, restaurant: number }>, summary: { insight: string } }>}
 */
export async function fetchAdminUsageBookmarkTrend({ days }) {
  const safeDays = days === 30 ? 30 : 7

  if (isMockMode()) {
    await new Promise((r) => {
      setTimeout(r, 260)
    })
    return buildMockBookmarkTrend(safeDays)
  }

/*

  try {
    const response = await axiosInstance.get('/api/admin/usage/bookmark-trend', {
      params: { days: safeDays },
    })

    const body = response.data
    if (!body || body.success !== true) {
      throw new Error(body?.message || '여행 관심 트렌드 응답이 올바르지 않습니다.')
    }

    return {
      series: Array.isArray(body.data?.series) ? body.data.series : [],
      summary: {
        insight:
          typeof body.data?.summary?.insight === 'string'
            ? body.data.summary.insight
            : '카테고리별 북마크 추이를 확인할 수 있습니다.',
      },
    }
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      '여행 관심 트렌드를 불러오는 중 오류가 발생했습니다.'
    throw new Error(msg)
  }
*/

}