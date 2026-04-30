import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Card, Empty, Segmented, Spin, Typography } from 'antd'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { fetchAdminUsageBookmarkTrend } from '../../../../services/adminUsageApi'

const PERIOD_OPTIONS = [
  { label: '최근 7일', value: 7 },
  { label: '최근 30일', value: 30 },
]

/**
 * 관리자 > 이용현황 > 요약의 여행 관심 트렌드 차트
 * - 북마크 카테고리(근처장소/관광지/맛집) 일자별 추이 표시
 * - 기간 필터(7일/30일), 로딩/에러 상태를 함께 처리
 */
const TrendChart = () => {
  const [days, setDays] = useState(7)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // 기간(일 수)을 기준으로 트렌드 API 호출
      const next = await fetchAdminUsageBookmarkTrend({ days })
      setData(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    load()
  }, [load])

  return (
    <Card
      title="여행 관심 트렌드"
      size="small"
      extra={<Segmented size="small" options={PERIOD_OPTIONS} value={days} onChange={setDays} />}
      // 차트 컨테이너가 초기 렌더 단계에서 높이/폭을 측정하지 못해
      // Recharts 경고(width(-1)/height(-1))가 발생할 수 있어, Card 높이 강제는 제거합니다.
      styles={{ body: { paddingTop: 12 } }}
    >
      {loading ? (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Spin />
        </div>
      ) : null}

      {!loading && error ? (
        <Alert
          type="error"
          showIcon
          title="트렌드 데이터를 불러오지 못했습니다"
          description={error}
          style={{ marginBottom: 12 }}
        />
      ) : null}

      {!loading && !error && data?.series?.length ? (
        <>
          <div style={{ width: '100%', height: 280, minWidth: 0, minHeight: 0 }}>
            {/* Recharts ResponsiveContainer로 반응형 LineChart 구성 */}
            <ResponsiveContainer width="100%" height={280} debounce={50}>
              <LineChart data={data.series} margin={{ top: 8, right: 20, bottom: 6, left: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="nearby"
                  name="근처장소"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="attraction"
                  name="관광지"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="restaurant"
                  name="맛집"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Typography.Text type="secondary">
            {data.summary?.insight || '카테고리별 북마크 변동 추이를 확인할 수 있습니다.'}
          </Typography.Text>
        </>
      ) : null}

      {!loading && !error && !data?.series?.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="표시할 트렌드 데이터가 없습니다." />
      ) : null}
    </Card>
  )
}

export default TrendChart