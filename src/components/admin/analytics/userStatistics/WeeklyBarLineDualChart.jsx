import React, { useMemo } from 'react'
import { Empty, theme } from 'antd'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

/**
 * 주차별 막대 + 선 이중축 차트 컴포넌트
 *
 * 역할:
 * - x축: periodLabel
 * - 막대 차트: 특정 주의 실제 값
 * - 선 차트: 4주 평균 등의 추세 값
 *
 * 사용 예:
 * <WeeklyBarLineDualChart
 *   data={[
 *     { periodLabel: '1주차', count: 100, avg4Weeks: 90 },
 *     { periodLabel: '2주차', count: 120, avg4Weeks: 95 },
 *   ]}
 *   barYField="count"
 *   lineYField="avg4Weeks"
 *   leftAxisTitle="주간 사용자 수"
 *   rightAxisTitle="4주 평균"
 * />
 *
 * @param {{
 *   data: Array<Record<string, unknown>>, // 차트 원본 데이터 배열
 *   barYField: string,                    // 막대 차트에 사용할 y값 필드명
 *   lineYField: string,                   // 선 차트에 사용할 y값 필드명
 *   leftAxisTitle?: string,               // 왼쪽 y축 제목
 *   rightAxisTitle?: string,              // 오른쪽 y축 제목
 *   height?: number,                      // 차트 높이
 * }} props
 */
const WeeklyBarLineDualChart = ({
  data,
  barYField,
  lineYField,
  leftAxisTitle = '막대(해당 주)',
  rightAxisTitle = '4주 평균(선)',
  height = 300,
}) => {
  // antd theme token 사용
  // 빈 화면 배경색, borderRadius 등을 현재 테마 기준으로 가져옴
  const { token } = theme.useToken()

  // data가 배열이 아닐 경우를 대비한 방어 코드
  // 잘못된 값(null, undefined, 객체 등)이 들어와도 차트 오류를 막음
  const chartData = useMemo(() => (Array.isArray(data) ? data : []), [data])

  // 표시할 데이터가 없으면 차트 대신 Empty UI 출력
  if (chartData.length === 0) {
    return (
      <div
        style={{
          height,
          width: '100%',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: token.colorFillAlter,
          borderRadius: token.borderRadius,
        }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="차트 데이터가 없습니다" />
      </div>
    )
  }

  // 데이터가 있으면 이중축 차트 렌더링
  return (
    <div style={{ height, width: '100%', minWidth: 0, minHeight: 0 }}>
      <ResponsiveContainer width="100%" height={height} debounce={50}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 12,
            right: 24,
            left: 8,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={token.colorBorderSecondary} />
          <XAxis dataKey="periodLabel" tick={{ fill: token.colorTextSecondary, fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            tick={{ fill: token.colorTextSecondary, fontSize: 12 }}
            label={{ value: leftAxisTitle, angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: token.colorTextSecondary, fontSize: 12 }}
            label={{ value: rightAxisTitle, angle: 90, position: 'insideRight' }}
          />
          <Tooltip
            formatter={(value) =>
              typeof value === 'number' ? value.toLocaleString() : value
            }
            contentStyle={{ borderRadius: token.borderRadius }}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey={barYField}
            name={leftAxisTitle}
            fill="#1677ff"
            barSize={28}
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="right"
            dataKey={lineYField}
            name={rightAxisTitle}
            type="monotone"
            stroke="#ff4d4f"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyBarLineDualChart


/*
이 컴포넌트는 주차별 데이터 2개를 한 화면에 같이 보여주는 이중축 차트 컴포넌트입니다.

구성은 아래와 같습니다.

막대 차트
barYField에 해당하는 값을 표시
보통 “해당 주 실적”, “해당 주 사용자 수” 같은 값에 사용
선 차트
lineYField에 해당하는 값을 표시
보통 “4주 평균”, “이동 평균” 같은 추세 값에 사용
x축
periodLabel 필드를 사용
예: 1주차, 2주차, 2026-03 1주

핵심 동작은 다음입니다.

data가 배열인지 확인해서 안전하게 처리
데이터가 없으면 차트 대신 Empty 표시
데이터가 있으면 DualAxes로
첫 번째 축: 막대 차트
두 번째 축: 선 차트
를 함께 그림
선 차트는 independent: true로 별도 y축 스케일 사용
*/