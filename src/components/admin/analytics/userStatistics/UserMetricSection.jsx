import React from 'react'
import { Card, Col, Row, theme, Typography } from 'antd'
import WeeklyBarLineDualChart from './WeeklyBarLineDualChart'
import SourceRankColumns from './SourceRankColumns'

/**
 * UserMetricSection 컴포넌트 props 설명
 *
 * heading:
 * - 섹션 제목
 * - 예: "방문자", "신규 가입자"
 *
 * summary:
 * - KPI 요약 데이터
 * - dailyCount / weeklyCount / monthlyCount 형태
 *
 * weeklySeries:
 * - 주별 차트 데이터 배열
 * - 예: [{ week: '1주차', visitorCount: 120, fourWeekAvgVisitorCount: 110 }]
 *
 * barYField:
 * - 막대 그래프에서 사용할 Y축 필드명
 *
 * lineYField:
 * - 선 그래프에서 사용할 Y축 필드명
 *
 * barAxisTitle:
 * - 왼쪽 축(막대)에 대한 제목
 *
 * lineAxisTitle:
 * - 오른쪽 축(선)에 대한 제목
 *
 * sources:
 * - 유입 경로 랭킹 데이터
 * - daily / weekly / monthly 별 배열
 *
 * sourcesTitle:
 * - 유입 경로 랭킹 제목
 */
const UserMetricSection = ({
  heading,
  summary,
  weeklySeries,
  barYField,
  lineYField,
  barAxisTitle,
  lineAxisTitle,
  sources,
  sourcesTitle,
}) => {
  /**
   * antd 테마 토큰 가져오기
   *
   * token을 이용하면 현재 테마에 맞는 색상, radius 등을 사용할 수 있음
   * 하드코딩된 색보다 유지보수에 유리함
   */
  const { token } = theme.useToken()

  /**
   * summary가 null 또는 undefined일 경우를 대비한 안전 처리
   * s.dailyCount, s.weeklyCount, s.monthlyCount 형태로 접근 가능하게 만듦
   */
  const s = summary || {}

  /**
   * KPI 카드 UI를 만드는 내부 함수
   *
   * label:
   * - "일간", "주간", "월간" 같은 제목
   *
   * value:
   * - 실제 수치
   *
   * 처리 내용:
   * - 숫자면 천 단위 콤마로 표시
   * - 숫자가 아니면 "—" 표시
   */
  const kpi = (label, value) => (
    <div
      style={{
        textAlign: 'center',                 // 텍스트 가운데 정렬
        padding: '12px 8px',                // 내부 여백
        background: token.colorFillAlter,   // 테마 배경색
        borderRadius: token.borderRadius,   // 테마 radius 사용
        minHeight: 88,                      // 최소 높이 고정
        display: 'flex',                    // 세로 정렬을 위한 flex
        flexDirection: 'column',            // 세로 방향 배치
        justifyContent: 'center',           // 수직 중앙 정렬
      }}
    >
      {/* KPI 라벨 */}
      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        {label}
      </Typography.Text>

      {/* KPI 숫자 */}
      <Typography.Title level={3} style={{ margin: '8px 0 0', fontSize: 22 }}>
        {typeof value === 'number' ? value.toLocaleString() : '—'}
      </Typography.Title>
    </div>
  )

  return (
    /**
     * 전체 섹션을 감싸는 카드
     * - size="small": 컴팩트한 카드 스타일
     * - body padding 직접 지정
     * - 하단 margin으로 다음 섹션과 간격 확보
     */
    <Card size="small" style={{ marginBottom: 24 }} styles={{ body: { padding: 20 } }}>
      {/* 섹션 제목 */}
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>
        {heading}
      </Typography.Title>

      {/* 
        상단 영역 레이아웃
        좌측: KPI 요약
        우측: 주별 추이 차트
      */}
      <Row gutter={[16, 16]} align="stretch">
        {/* 
          좌측 KPI 영역
          - 모바일(xs)에서는 전체 폭 24
          - 큰 화면(lg)에서는 7칸 차지
        */}
        <Col xs={24} lg={7}>
          <Row gutter={[12, 12]}>
            {/* 일간 KPI */}
            <Col span={24}>{kpi('일간', s.dailyCount)}</Col>

            {/* 주간 KPI */}
            <Col span={24}>{kpi('주간', s.weeklyCount)}</Col>

            {/* 월간 KPI */}
            <Col span={24}>{kpi('월간', s.monthlyCount)}</Col>
          </Row>
        </Col>

        {/* 
          우측 차트 영역
          - 모바일(xs)에서는 전체 폭 24
          - 큰 화면(lg)에서는 17칸 차지
        */}
        <Col xs={24} lg={17}>
          {/* 차트 설명 문구 */}
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            주별 추이 — 파란 막대: 해당 주 수치, 빨간 선: 지난 4주 평균
          </Typography.Text>

          {/* 
            주별 막대 + 선 복합 차트
            data: 주별 데이터
            barYField: 막대값 필드명
            lineYField: 선값 필드명
            leftAxisTitle: 왼쪽 Y축 제목
            rightAxisTitle: 오른쪽 Y축 제목
          */}
          <WeeklyBarLineDualChart
            data={weeklySeries}
            barYField={barYField}
            lineYField={lineYField}
            leftAxisTitle={barAxisTitle}
            rightAxisTitle={lineAxisTitle}
          />
        </Col>
      </Row>

      {/* 
        하단 유입 경로 랭킹 영역
        일간 / 주간 / 월간 소스 데이터를 각각 전달
      */}
      <SourceRankColumns
        daily={sources?.daily}
        weekly={sources?.weekly}
        monthly={sources?.monthly}
        title={sourcesTitle}
      />
    </Card>
  )
}

export default UserMetricSection

/*
이 코드는 이용자 통계 화면 안에서 하나의 통계 블록을 담당하는 재사용 컴포넌트입니다.
즉, 방문자, 신규 가입자 같은 항목 하나를 카드 형태로 출력하는 역할입니다.

이 컴포넌트가 하는 일은 크게 3가지입니다.

KPI 요약 카드 출력
일간
주간
월간
주별 추이 차트 출력
막대: 해당 주 실적
선: 최근 4주 평균
유입 경로 랭킹 출력
일간
주간
월간 기준 소스 랭킹

즉, 상위 컴포넌트에서는 데이터만 넘기면 이 컴포넌트가 공통 UI를 만들어줍니다.

const data = {
  heading: '방문자',
  summary: {
    dailyCount: 320,
    weeklyCount: 2140,
    monthlyCount: 8450,
  },
  weeklySeries: [
    {
      weekLabel: '3월 1주',
      visitorCount: 520,
      fourWeekAvgVisitorCount: 480,
    },
    {
      weekLabel: '3월 2주',
      visitorCount: 610,
      fourWeekAvgVisitorCount: 500,
    },
  ],
  sources: {
    daily: [{ source: '네이버', count: 120 }],
    weekly: [{ source: '구글', count: 430 }],
    monthly: [{ source: '직접유입', count: 980 }],
  },
}
*/