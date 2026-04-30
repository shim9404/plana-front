import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Col, Row, Spin, Typography } from 'antd'
import AnalyticsPageFrame from './AnalyticsPageFrame'
import UsagePeriodFilter from './userStatistics/UsagePeriodFilter'
import { getApiDateRange } from './userStatistics/usagePeriodRange'
import UsageStatsDualPanel from './usageStatistics/UsageStatsDualPanel'
import BookmarkRankPeriodTables from './usageStatistics/BookmarkRankPeriodTables'
import { fetchAdminUsageStatistics } from '../../../services/adminUsageApi'

const DEFAULT_PERIOD = { preset: 'MONTH', customRange: null }

/** 관리자 > 이용현황 > 이용 통계 */
const UsageStatistics = () => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const range = getApiDateRange(period)
      const next = await fetchAdminUsageStatistics(range)
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
      title="이용 통계"
      description="새 여행 계획·북마크 장소 요약과 주별 추이(막대·4주 평균 선)를 확인하고, 하단에서 유형별 북마크 장소 순위를 볼 수 있습니다."
    >
      <UsagePeriodFilter value={period} onChange={setPeriod} />

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
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <UsageStatsDualPanel
                title="새 여행 계획"
                summary={data.newTripPlans?.summary}
                weeklySeries={data.newTripPlans?.weeklySeries}
                barYField="planCount"
                lineYField="fourWeekAvgPlanCount"
                barAxisTitle="계획 수(막대)"
                lineAxisTitle="4주 평균(선)"
              />
            </Col>
            <Col xs={24} lg={12}>
              <UsageStatsDualPanel
                title="북마크 장소"
                summary={data.bookmarkPlaces?.summary}
                weeklySeries={data.bookmarkPlaces?.weeklySeries}
                barYField="bookmarkCount"
                lineYField="fourWeekAvgBookmarkCount"
                barAxisTitle="북마크(막대)"
                lineAxisTitle="4주 평균(선)"
              />
            </Col>
          </Row>

          <Typography.Title level={5} style={{ marginTop: 28, marginBottom: 12 }}>
            북마크 장소 순위
          </Typography.Title>
          <BookmarkRankPeriodTables
            daily={data.bookmarkRanks?.daily}
            weekly={data.bookmarkRanks?.weekly}
            monthly={data.bookmarkRanks?.monthly}
          />
        </>
      ) : null}
    </AnalyticsPageFrame>
  )
}

export default UsageStatistics
