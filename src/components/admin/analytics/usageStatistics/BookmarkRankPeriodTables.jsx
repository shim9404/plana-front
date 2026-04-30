import React, { useMemo, useState } from 'react'
import { Col, Empty, Row, Segmented, Table, Typography } from 'antd'

const CATEGORY_OPTIONS = [
  { label: '근처장소', value: 'nearby' },
  { label: '관광지', value: 'attraction' },
  { label: '맛집', value: 'restaurant' },
]

const columns = [
  {
    title: '순위',
    key: 'rank',
    width: 52,
    align: 'center',
    render: (_, __, index) => index + 1,
  },
  {
    title: '장소명',
    dataIndex: 'placeLabel',
    key: 'placeLabel',
    ellipsis: true,
  },
  {
    title: '북마크',
    dataIndex: 'count',
    key: 'count',
    width: 88,
    align: 'right',
    render: (v) => (typeof v === 'number' ? `${v.toLocaleString()}건` : '—'),
  },
]

/**
 * @param {{
 *   periodTitle: string,
 *   periodKey: string,
 *   bucket: { nearby?: unknown[], attraction?: unknown[], restaurant?: unknown[] },
 * }} props
 */
const BookmarkPeriodColumn = ({ periodTitle, periodKey, bucket }) => {
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
          rowKey={(r) => `${periodKey}-${category}-${r.placeLabel}`}
          columns={columns}
          dataSource={rows}
          scroll={{ x: 'max-content' }}
        />
      )}
    </Col>
  )
}

/**
 * 북마크 장소 순위: 일간 / 주간 / 월간 + 유형(Segmented)
 *
 * @param {{
 *   daily: object,
 *   weekly: object,
 *   monthly: object,
 * }} props
 */
const BookmarkRankPeriodTables = ({ daily, weekly, monthly }) => (
  <Row gutter={[16, 24]}>
    <BookmarkPeriodColumn periodTitle="일간" periodKey="daily" bucket={daily} />
    <BookmarkPeriodColumn periodTitle="주간" periodKey="weekly" bucket={weekly} />
    <BookmarkPeriodColumn periodTitle="월간" periodKey="monthly" bucket={monthly} />
  </Row>
)

export default BookmarkRankPeriodTables
