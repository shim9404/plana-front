import React from 'react'
import { Card, Col, Progress, Row, Space, Statistic, Tag, Typography } from 'antd'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  MapPinned,
  Search,
  Users,
} from 'lucide-react'

const kpiItems = [
  {
    key: 'todayVisitors',
    title: '오늘 방문자',
    value: 1284,
    suffix: '명',
    delta: 7.2,
    icon: <Users size={18} />,
    helper: '어제 대비 +86명',
  },
  {
    key: 'todayUsage',
    title: '오늘 이용 건수',
    value: 3921,
    suffix: '건',
    delta: -2.4,
    icon: <Activity size={18} />,
    helper: '어제 대비 -96건',
  },
  {
    key: 'topRegionShare',
    title: '인기 지역 점유율',
    value: 36.8,
    suffix: '%',
    delta: 4.9,
    icon: <MapPinned size={18} />,
    helper: '제주·부산·서울 집중',
  },
  {
    key: 'topKeywordShare',
    title: '인기 검색어 점유율',
    value: 28.1,
    suffix: '%',
    delta: 1.7,
    icon: <Search size={18} />,
    helper: '상위 5개 검색어 합산',
  },
]

const KpiCards = () => {
  return (
    <Row gutter={[12, 12]}>
      {kpiItems.map((item) => {
        const isPositive = item.delta >= 0
        return (
          <Col key={item.key} xs={24} sm={12} xl={6}>
            <Card
              size="small"
              style={{ height: '100%' }}
              styles={{
                body: { padding: 14, display: 'flex', flexDirection: 'column', gap: 10 },
              }}
            >
              <Space align="center" size={8}>
                {item.icon}
                <Typography.Text strong>{item.title}</Typography.Text>
              </Space>
              <Statistic
                value={item.value}
                suffix={item.suffix}
                formatter={(value) => <span style={{ fontSize: 24 }}>{value}</span>}
              />
              <Space size={6} wrap>
                <Tag color={isPositive ? 'green' : 'red'} style={{ marginRight: 0 }}>
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} 전일 대비{' '}
                  {isPositive ? '+' : ''}
                  {item.delta}%
                </Tag>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {item.helper}
                </Typography.Text>
              </Space>
              <Progress
                percent={Math.max(8, Math.min(100, Math.round(item.value % 100)))}
                size="small"
                showInfo={false}
                strokeColor={isPositive ? '#16a34a' : '#ef4444'}
              />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default KpiCards