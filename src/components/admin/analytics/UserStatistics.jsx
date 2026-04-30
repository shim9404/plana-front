import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import AnalyticsPageFrame from './AnalyticsPageFrame'
import UsagePeriodFilter from './userStatistics/UsagePeriodFilter'
import { getApiDateRange } from './userStatistics/usagePeriodRange'
import UserMetricSection from './userStatistics/UserMetricSection'
import { fetchAdminUsageUsers } from '../../../services/adminUsageApi'
// 이용자 통계 샘플 데이터는 adminUsageApi.js 파일에 있습니다.

/**
 * 기본 조회 기간
 * - preset: 미리 정의된 기간 타입
 *   예) DAY, WEEK, MONTH, CUSTOM 같은 값이 올 수 있음
 * - customRange: 사용자가 직접 기간을 지정할 때 사용하는 값
 *
 * 현재는 기본값을 MONTH(월간)으로 설정
 */
const DEFAULT_PERIOD = { preset: 'MONTH', customRange: null }

/**
 * 관리자 > 이용현황 > 이용자 통계 페이지 컴포넌트
 *
 * 이 컴포넌트의 주요 역할:
 * 1. 조회 기간 상태 관리
 * 2. API 호출로 통계 데이터 조회
 * 3. 로딩/에러/정상 데이터 화면 분기 처리
 * 4. 방문자 / 신규 가입자 통계 섹션 렌더링
 */
const UserStatistics = () => {
  /**
   * 현재 선택된 조회 기간 상태
   * 기본값은 MONTH
   */
  const [period, setPeriod] = useState(DEFAULT_PERIOD)

  /**
   * API 호출 중 여부
   * true이면 로딩 스피너 표시
   */
  const [loading, setLoading] = useState(true)

  /**
   * 에러 메시지 상태
   * API 실패 시 문자열 저장
   */
  const [error, setError] = useState(null)

  /**
   * 서버에서 받은 통계 데이터 상태
   * 성공 시 API 응답 데이터 저장
   */
  const [data, setData] = useState(null)

  /**
   * 통계 데이터를 불러오는 함수
   *
   * useCallback을 사용하는 이유:
   * - 렌더링마다 함수가 새로 만들어지는 것을 줄이기 위함
   * - period가 바뀔 때만 load 함수가 새로 생성됨
   *
   * 동작 순서:
   * 1. loading=true
   * 2. 이전 에러 초기화
   * 3. period를 API 요청용 날짜 범위로 변환
   * 4. API 호출
   * 5. 성공 시 data 저장
   * 6. 실패 시 error 저장, data 초기화
   * 7. 마지막에 loading=false
   */
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      /**
       * 현재 선택된 period를
       * 백엔드 API가 받을 수 있는 시작일/종료일 형태로 변환
       */
      const range = getApiDateRange(period)

      /**
       * 관리자 이용자 통계 API 호출
       * 반환 데이터 예시:
       * {
       *   visitorSummary,
       *   visitorWeeklySeries,
       *   visitorSources,
       *   signupSummary,
       *   signupWeeklySeries,
       *   signupSources
       * }
       */
      const next = await fetchAdminUsageUsers(range)

      /**
       * 조회 성공 시 데이터 상태 저장
       */
      setData(next)
    } catch (e) {
      /**
       * 에러 발생 시 메시지 저장
       * Error 객체면 message 사용
       * 아니면 문자열로 변환
       */
      setError(e instanceof Error ? e.message : String(e))

      /**
       * 실패 시 기존 데이터 제거
       */
      setData(null)
    } finally {
      /**
       * 성공/실패 여부와 관계없이 로딩 종료
       */
      setLoading(false)
    }
  }, [period])

  /**
   * 컴포넌트 최초 렌더링 시 실행
   * 그리고 load 함수가 바뀔 때 다시 실행
   *
   * load는 period에 의존하므로
   * 결국 period가 바뀌면 자동으로 재조회됨
   */
  useEffect(() => {
    load()
  }, [load])

  return (
    <AnalyticsPageFrame
      /**
       * 페이지 상단 타이틀
       */
      title="이용자 통계"
      /**
       * 페이지 설명 문구
       * 어떤 데이터를 보여주는지 사용자에게 안내
       */
      description="방문자·신규 가입자의 일·주·월 요약, 주별 추이(막대·4주 평균 선), 유입 경로 랭킹을 확인합니다."
      enablePrint
      printDocumentTitle="이용자_통계"
    >
      {/* 
        기간 필터 컴포넌트
        - 현재 선택값(value) 전달
        - 사용자가 값을 바꾸면 setPeriod 실행
        - setPeriod가 실행되면 period 상태가 변경되고,
          useEffect를 통해 load()가 다시 실행됨
      */}
      <UsagePeriodFilter value={period} onChange={setPeriod} />

      {/* 
        로딩 중일 때만 스피너 표시
        - padding과 중앙 정렬 스타일 적용
      */}
      {loading ? (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Spin size="large" description="불러오는 중…" />
        </div>
      ) : null}

      {/* 
        로딩이 끝났고 에러가 있을 때만 에러 Alert 표시
        - 사용자가 API 실패 원인을 확인할 수 있음
      */}
      {!loading && error ? (
        <Alert
          type="error"
          showIcon
          title="데이터를 불러오지 못했습니다"
          description={error}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {/* 
        로딩이 끝났고 에러가 없고 데이터가 있을 때만 실제 통계 UI 표시
      */}
      {!loading && !error && data ? (
        <>
          {/* 
            방문자 통계 섹션
            - 요약 데이터
            - 주간 시계열 데이터
            - 막대 그래프 Y축 필드
            - 선 그래프 Y축 필드
            - 유입 경로 랭킹
          */}
          <UserMetricSection
            heading="방문자"
            summary={data.visitorSummary}
            weeklySeries={data.visitorWeeklySeries}
            barYField="visitorCount"
            lineYField="fourWeekAvgVisitorCount"
            barAxisTitle="방문자 수(막대)"
            lineAxisTitle="4주 평균 방문자(선)"
            sources={data.visitorSources}
            sourcesTitle="방문자 유입 경로 (랭킹)"
          />

          {/* 
            신규 가입자 통계 섹션
            - 요약 데이터
            - 주간 시계열 데이터
            - 막대 그래프 Y축 필드
            - 선 그래프 Y축 필드
            - 가입 유입 경로 랭킹
          */}
          <UserMetricSection
            heading="신규 가입자"
            summary={data.signupSummary}
            weeklySeries={data.signupWeeklySeries}
            barYField="newSignupCount"
            lineYField="fourWeekAvgNewSignupCount"
            barAxisTitle="신규 가입자 수(막대)"
            lineAxisTitle="4주 평균 신규 가입(선)"
            sources={data.signupSources}
            sourcesTitle="가입 유입 경로 (랭킹)"
          />
        </>
      ) : null}
    </AnalyticsPageFrame>
  )
}

export default UserStatistics

/*
이 코드는 관리자 페이지의 이용자 통계 화면 컴포넌트입니다.
역할은 다음과 같습니다.
조회 기간 상태를 관리합니다.
기간이 바뀌거나 최초 진입 시 API를 호출합니다.
로딩 중이면 스피너를 보여줍니다.
에러가 나면 에러 알림을 보여줍니다.
정상 데이터가 오면
- 방문자 통계
- 신규 가입자 통계
두 섹션을 화면에 출력합니다.

전체 흐름은 아래와 같습니다.
- period 상태에 현재 조회 기간 저장
- load()에서 기간을 API용 날짜 범위로 변환
- fetchAdminUsageUsers() 호출
- 성공 시 data 저장
- 실패 시 error 저장
- useEffect()로 최초 렌더링 및 기간 변경 시 자동 재조회
- 화면에서는 loading / error / data 상태에 따라 조건부 렌더링
*/