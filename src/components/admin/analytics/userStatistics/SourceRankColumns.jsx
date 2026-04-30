import React from 'react'
import { Col, Empty, Row, Table, Typography } from 'antd'

/**
 * @typedef {{ source: string, count: number }} SourceRow
 */

const columns = [
  {
    title: '순위',
    key: 'rank',
    width: 64,
    align: 'center',
    render: (_, __, i) => i + 1,
  },
  {
    title: '유입 경로',
    dataIndex: 'source',
    key: 'source',
    ellipsis: true,
  },
  {
    title: '건수',
    dataIndex: 'count',
    key: 'count',
    width: 88,
    align: 'right',
    render: (v) => (typeof v === 'number' ? v.toLocaleString() : '—'),
  },
]

/**
 * 일간 / 주간 / 월간 유입 랭킹을 3열로 표시
 * @param {{
 *   daily: SourceRow[],
 *   weekly: SourceRow[],
 *   monthly: SourceRow[],
 *   title?: string,
 * }} props
 */
const SourceRankColumns = ({ daily, weekly, monthly, title = '유입 경로 랭킹' }) => {
  const blocks = [
    { key: 'd', label: '일간', rows: daily },
    { key: 'w', label: '주간', rows: weekly },
    { key: 'm', label: '월간', rows: monthly },
  ]

  return (
    <div style={{ marginTop: 8 }}>
      <Typography.Text strong>{title}</Typography.Text>
      <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
        {blocks.map(({ key, label, rows }) => (
          <Col xs={24} md={8} key={key}>
            <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
              {label}
            </Typography.Text>
            {!rows?.length ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="데이터 없음" />
            ) : (
              <Table
                size="small"
                pagination={false}
                rowKey={(r) =>
                  `${key}-${String(r.source ?? '')}-${Number(r.count)}`
                }
                columns={columns}
                dataSource={rows}
              />
            )}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SourceRankColumns
