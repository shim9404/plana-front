import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import AnalyticsPageFrame from './AnalyticsPageFrame'
import UsagePeriodFilter from './userStatistics/UsagePeriodFilter'
import { getApiDateRange } from './userStatistics/usagePeriodRange'
import KeywordRankPeriodTables from './keywordStatistics/KeywordRankPeriodTables'
import { fetchAdminUsageKeywords } from '../../../services/adminUsageApi'

const DEFAULT_PERIOD = { preset: 'MONTH', customRange: null }

/** 관리자 > 이용현황 > 검색어 통계 */
const SearchKeywordStatistics = () => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const range = getApiDateRange(period)
      const next = await fetchAdminUsageKeywords(range)
      setData(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [period])

  useEffect(() => {
    load()
  }, [load])

  return (
    <AnalyticsPageFrame
      title="검색어 통계"
      description="일·주·월별 인기 검색어 순위입니다. 각 기간 오른쪽에서 근처장소·관광지·맛집 유형을 바꿔 해당 순위만 볼 수 있습니다."
    >
      {loading ? (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Spin size="large" description="불러오는 중…" />
        </div>
      ) : null}

      {!loading && error ? (
        <Alert
          type="error"
          showIcon
          title="데이터를 불러오지 못했습니다"
          description={error}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {!loading && !error && data ? (
        <KeywordRankPeriodTables daily={data.daily} weekly={data.weekly} monthly={data.monthly} />
      ) : null}
    </AnalyticsPageFrame>
  )
}

export default SearchKeywordStatistics
