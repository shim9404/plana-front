import React from 'react'
import { Card, Col, Flex, Row, Typography } from 'antd'
import AnalyticsPageFrame from './AnalyticsPageFrame'
import KpiCards from './summary/KpiCards'
import TopList from './summary/TopList'
import QuickLinks from './summary/QuickLinks'
import TrendChart from './summary/TrendChart'
/** 관리자 > 이용현황 > 요약 */
const UsageOverview = ({ onNavigate }) => {
  return (
    <AnalyticsPageFrame
      title="요약 대시보드"
      description="오늘 방문자, 인기 지역/검색어 TOP 5, 전일 대비 증감률을 한 화면에서 먼저 확인하고 이상 징후가 있을 때 상세 통계 페이지로 빠르게 이동할 수 있습니다."
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} xxl={18}>
          <Flex vertical gap={12}>
            <Card size="small" title="KPI 카드 영역" styles={{ body: { padding: 12 } }}>
              <KpiCards />
            </Card>
            <TrendChart />
            <Card size="small" title="TOP 리스트 영역" styles={{ body: { padding: 12 } }}>
              <TopList />
            </Card>
          </Flex>
        </Col>
        <Col xs={24} xxl={6}>
          <Flex vertical gap={12}>
            <QuickLinks onNavigate={onNavigate} />
          </Flex>
        </Col>
      </Row>
    </AnalyticsPageFrame>
  )
}

export default UsageOverview
