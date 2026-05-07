import React, { useMemo, useState } from 'react'
import { Col, Empty, Row, Segmented, Table, Typography } from 'antd'

/** @typedef {{ rowId?: string, keyword: string, count: number }} KeywordSearchRankRow */

/** @typedef {{ nearby: KeywordSearchRankRow[], attraction: KeywordSearchRankRow[], restaurant: KeywordSearchRankRow[] }} KeywordSearchByCategory */

const CATEGORY_OPTIONS = [
  { label: '근처장소', value: 'nearby' },
  { label: '관광지', value: 'attraction' },
  { label: '맛집', value: 'restaurant' },
]

const columns = [
  {
    title: '순위',
    key: 'rank',
    width: 56,
    align: 'center',
    render: (_, __, index) => index + 1,
  },
  {
    title: '검색어',
    dataIndex: 'keyword',
    key: 'keyword',
    ellipsis: true,
  },
  {
    title: '검색',
    dataIndex: 'count',
    key: 'count',
    width: 96,
    align: 'right',
    render: (v) => (typeof v === 'number' ? `${v.toLocaleString()}건` : '—'),
  },
]

/**
 * 일간·주간·월간 중 한 열: 제목 + 오른쪽 유형 선택(Segmented) + 순위 테이블
 *
 * @param {{
 *   periodTitle: string,
 *   periodKey: string,
 *   bucket: KeywordSearchByCategory,
 * }} props
 */
const KeywordPeriodColumn = ({ periodTitle, periodKey, bucket }) => {
  const [category, setCategory] = useState('nearby')

  const rows = useMemo(() => {
    if (!bucket) return []
    const list = bucket[category]
    return Array.isArray(list) ? list : []
  }, [bucket, category])

  return (
    <Col xs={24} lg={8}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          {periodTitle}
        </Typography.Title>
        <Segmented
          size="small"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(v) => setCategory(v)}
        />
      </div>
      {!rows.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="데이터가 없습니다" />
      ) : (
        <Table
          size="small"
          pagination={false}
          rowKey={(r) => `${periodKey}-${category}-${r.rowId ?? r.keyword}`}
          columns={columns}
          dataSource={rows}
        />
      )}
    </Col>
  )
}

/**
 * 검색어 순위: 일간 / 주간 / 월간 3분할, 각 열에서 유형별 순위 전환
 *
 * @param {{
 *   daily: KeywordSearchByCategory,
 *   weekly: KeywordSearchByCategory,
 *   monthly: KeywordSearchByCategory,
 * }} props
 */
const KeywordRankPeriodTables = ({ daily, weekly, monthly }) => (
  <Row gutter={[16, 24]}>
    <KeywordPeriodColumn periodTitle="일간" periodKey="daily" bucket={daily} />
    <KeywordPeriodColumn periodTitle="주간" periodKey="weekly" bucket={weekly} />
    <KeywordPeriodColumn periodTitle="월간" periodKey="monthly" bucket={monthly} />
  </Row>
)

export default KeywordRankPeriodTables
