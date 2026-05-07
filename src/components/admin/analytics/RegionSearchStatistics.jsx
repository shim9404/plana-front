import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import AnalyticsPageFrame from './AnalyticsPageFrame'
import { getApiDateRange } from './userStatistics/usagePeriodRange'
import RegionRankPeriodTables from './regionStatistics/RegionRankPeriodTables'
import { fetchAdminUsageRegions } from '../../../services/adminUsageApi'



// 기본 조회 기간 상태
// - preset: 미리 정의된 기간 옵션
// - customRange: 직접 기간 선택 시 사용할 값
const DEFAULT_PERIOD = { preset: 'MONTH', customRange: null }

/** 관리자 > 이용현황 > 지역 검색 통계 */
const RegionSearchStatistics = () => {
  // 현재 조회 기간 상태
  // 예: TODAY, WEEK, MONTH, CUSTOM
  const [period, setPeriod] = useState(DEFAULT_PERIOD)

  // API 호출 중인지 여부
  const [loading, setLoading] = useState(true)

  // 에러 메시지 상태
  const [error, setError] = useState(null)

  // 서버에서 받은 지역 검색 통계 데이터
  // 구조 예: { daily: [...], weekly: [...], monthly: [...] }
  const [data, setData] = useState(null)

  /**
   * 지역 검색 통계 데이터를 불러오는 함수
   * - period가 바뀌면 새로 생성된다.
   * - useCallback으로 감싸서 불필요한 함수 재생성을 줄인다.
   */
  const load = useCallback(async () => {
    // 조회 시작 전 로딩 상태 활성화
    setLoading(true)

    // 이전 에러 초기화
    setError(null)

    try {
      // period 상태를 API 요청용 날짜 범위로 변환
      // 예: { startDate: '2026-04-01', endDate: '2026-04-30' }
      const range = getApiDateRange(period)

      // 관리자 지역 검색 통계 API 호출
      const next = await fetchAdminUsageRegions(range)
      setLoading(false)
      // 성공 시 응답 데이터 저장
      setData(next)
    } catch (e) {
      // 실패 시 에러 메시지를 문자열로 저장
      setError(e instanceof Error ? e.message : String(e))

      // 실패 시 기존 데이터 제거
      setData(null)
    } finally {
      // 성공/실패 여부와 상관없이 로딩 종료
      setLoading(false)
    }
  }, [period])

  /**
   * 컴포넌트 최초 렌더링 시 실행
   * 또는 period가 변경되어 load 함수가 바뀔 때마다 재실행
   */
  useEffect(() => {
    load()
  }, [load])

  return (
    <AnalyticsPageFrame
      // 페이지 제목
      title="지역 검색 통계"

      // 페이지 설명
      description="광역단체 기준 지역의 일·주·월 검색 순위입니다. 지역은 「광역명 > 시·군·구」 형식으로 표시됩니다."
    >

      {/* 로딩 중일 때 스피너 표시 */}
      {loading ? (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Spin size="large" description="불러오는 중…" />
        </div>
      ) : null}

      {/* 로딩이 끝났고 에러가 있으면 에러 경고 표시 */}
      {!loading && error ? (
        <Alert
          type="error"
          showIcon
          title="데이터를 불러오지 못했습니다"
          description={error}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {/* 로딩이 끝났고 에러가 없고 데이터가 있으면 통계 테이블 렌더링 */}
      {!loading && !error && data ? (
        <RegionRankPeriodTables daily={data.daily} weekly={data.weekly} monthly={data.monthly} />
      ) : null}
    </AnalyticsPageFrame>
  )
}

export default RegionSearchStatistics
