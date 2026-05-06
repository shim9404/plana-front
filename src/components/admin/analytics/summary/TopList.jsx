import React from 'react'
import { Card, Col, Flex, Row, Space, Tag, Typography } from 'antd'

const topRegions = [
  { name: '제주', count: 865, change: 12.1 },
  { name: '부산', count: 721, change: 8.7 },
  { name: '서울', count: 694, change: -1.9 },
  { name: '강릉', count: 558, change: 5.2 },
  { name: '여수', count: 513, change: 3.4 },
]

const topKeywords = [
  { keyword: '벚꽃 명소', count: 622, change: 14.8 },
  { keyword: '2박 3일 코스', count: 581, change: 9.3 },
  { keyword: '가족 여행', count: 546, change: -2.6 },
  { keyword: '드라이브 코스', count: 509, change: 4.7 },
  { keyword: '당일치기', count: 472, change: 2.8 },
]

const renderTag = (value) => (
  <Tag color={value >= 0 ? 'green' : 'red'} style={{ marginRight: 0 }}>
    {value >= 0 ? '+' : ''}
    {value}%
  </Tag>
)

const renderTopRows = (items, labelKey) => (
  <Flex vertical gap={0}>
    {items.map((item, index) => (
      <Flex
        key={`${labelKey}-${item[labelKey]}`}
        align="center"
        justify="space-between"
        style={{
          padding: '10px 0',
          borderBottom: index === items.length - 1 ? 'none' : '1px solid #f0f0f0',
        }}
      >
        <Space size={8}>
          <Typography.Text strong>{index + 1}위</Typography.Text>
          <Typography.Text>{item[labelKey]}</Typography.Text>
        </Space>
        <Space size={8}>
          <Typography.Text>{item.count}회</Typography.Text>
          {renderTag(item.change)}
        </Space>
      </Flex>
    ))}
  </Flex>
)

const TopList = () => {
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} lg={12}>
        <Card
          size="small"
          title="인기 지역 TOP 5"
          extra={<Typography.Text type="secondary">검색 수 기준</Typography.Text>}
          style={{ height: '100%' }}
        >
          {renderTopRows(topRegions, 'name')}
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card
          size="small"
          title="인기 검색어 TOP 5"
          extra={<Typography.Text type="secondary">조회 수 기준</Typography.Text>}
          style={{ height: '100%' }}
        >
          {renderTopRows(topKeywords, 'keyword')}
        </Card>
      </Col>
    </Row>
  )
}

export default TopList