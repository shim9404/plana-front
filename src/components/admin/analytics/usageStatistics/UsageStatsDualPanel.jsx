import React from 'react'
import { Card, Col, Row, theme, Typography } from 'antd'
import WeeklyBarLineDualChart from '../userStatistics/WeeklyBarLineDualChart'

/**
 * @param {{
 *   title: string,
 *   summary: { dailyCount?: number, weeklyCount?: number, monthlyCount?: number },
 *   weeklySeries: Array<Record<string, unknown>>,
 *   barYField: string,
 *   lineYField: string,
 *   barAxisTitle?: string,
 *   lineAxisTitle?: string,
 *   chartHeight?: number,
 * }} props
 */
const UsageStatsDualPanel = ({
  title,
  summary,
  weeklySeries,
  barYField,
  lineYField,
  barAxisTitle,
  lineAxisTitle,
  chartHeight = 240,
}) => {
  const { token } = theme.useToken()
  const s = summary || {}

  const kpi = (label, value) => (
    <div
      style={{
        textAlign: 'center',
        padding: '10px 6px',
        background: token.colorFillAlter,
        borderRadius: token.borderRadius,
        minHeight: 76,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {label}
      </Typography.Text>
      <Typography.Title level={4} style={{ margin: '6px 0 0', fontSize: 18 }}>
        {typeof value === 'number' ? value.toLocaleString() : '—'}
      </Typography.Title>
    </div>
  )

  return (
    <Card size="small" title={title} styles={{ body: { padding: 16 } }}>
      <Row gutter={[12, 12]} align="stretch">
        <Col xs={24} md={8}>
          <Row gutter={[8, 8]}>
            <Col span={24}>{kpi('일간', s.dailyCount)}</Col>
            <Col span={24}>{kpi('주간', s.weeklyCount)}</Col>
            <Col span={24}>{kpi('월간', s.monthlyCount)}</Col>
          </Row>
        </Col>
        <Col xs={24} md={16}>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 6, fontSize: 12 }}>
            주별 추이 — 파란 막대: 해당 주, 빨간 선: 4주 평균
          </Typography.Text>
          <WeeklyBarLineDualChart
            data={weeklySeries}
            barYField={barYField}
            lineYField={lineYField}
            leftAxisTitle={barAxisTitle}
            rightAxisTitle={lineAxisTitle}
            height={chartHeight}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default UsageStatsDualPanel
