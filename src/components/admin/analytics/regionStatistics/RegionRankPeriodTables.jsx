import React from 'react'
import { Col, Empty, Row, Table, Typography } from 'antd'

/**
 * @typedef {{ regionId: string, regionLabel: string, count: number }} RegionSearchRankRow
 */

const columns = [
  {
    title: '순위',
    key: 'rank',
    width: 56,
    align: 'center',
    render: (_, __, index) => index + 1,
  },
  {
    title: '지역 (광역·시군구)',
    dataIndex: 'regionLabel',
    key: 'regionLabel',
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
 * 일간 / 주간 / 월간 지역 검색 순위를 세로 테이블 3분할

 *

 * @param {{

 *   daily: RegionSearchRankRow[],

 *   weekly: RegionSearchRankRow[],

 *   monthly: RegionSearchRankRow[],

 * }} props

 */

const RegionRankPeriodTables = ({ daily, weekly, monthly }) => {

  const blocks = [

    { key: 'daily', title: '일간', rows: daily },

    { key: 'weekly', title: '주간', rows: weekly },

    { key: 'monthly', title: '월간', rows: monthly },

  ]



  return (

    <Row gutter={[16, 24]}>

      {blocks.map(({ key, title, rows }) => (

        <Col xs={24} lg={8} key={key}>

          <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 12 }}>

            {title}

          </Typography.Title>

          {!rows?.length ? (

            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="데이터가 없습니다" />

          ) : (

            <Table

              size="small"

              pagination={false}

              rowKey={(r) => `${key}-${r.regionId}`}

              columns={columns}

              dataSource={rows}

              scroll={{ x: 'max-content' }}

            />

          )}

        </Col>

      ))}

    </Row>

  )

}



export default RegionRankPeriodTables

