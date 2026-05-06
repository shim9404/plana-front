import dayjs from 'dayjs'

/**
 * 기간 프리셋 타입
 *
 * TODAY  : 오늘
 * WEEK   : 최근 7일
 * MONTH  : 최근 30일
 * CUSTOM : 사용자 지정 기간
 */
 /** @typedef {'TODAY'|'WEEK'|'MONTH'|'CUSTOM'} UsagePreset */

/**
 * 기간 선택 값 타입
 *
 * preset:
 * - 현재 선택된 기간 모드
 *
 * customRange:
 * - CUSTOM일 때 사용하는 날짜 범위
 * - [시작일, 종료일] 형태
 * - CUSTOM이 아니면 null
 */
 /**
  * @typedef {{
  *   preset: UsagePreset,
  *   customRange: [import('dayjs').Dayjs, import('dayjs').Dayjs] | null
  * }} UsagePeriodValue
  */

/**
 * 프론트의 기간 선택 상태를
 * 백엔드 API 요청용 시작일/종료일 문자열로 변환하는 함수
 *
 * 반환 형식:
 * {
 *   startDate: 'YYYY-MM-DD',
 *   endDate: 'YYYY-MM-DD'
 * }
 *
 * 예:
 * - TODAY  -> 오늘 ~ 오늘
 * - WEEK   -> 오늘 포함 최근 7일
 * - MONTH  -> 오늘 포함 최근 30일
 * - CUSTOM -> 사용자가 직접 고른 시작일 ~ 종료일
 *
 * @param {UsagePeriodValue} period
 * @returns {{ startDate: string, endDate: string }}
 */
export function getApiDateRange(period) {
  /**
   * 기준 종료일
   * 항상 "지금 시점의 오늘"을 기준으로 계산
   *
   * 예:
   * 오늘이 2026-04-05라면
   * end.format('YYYY-MM-DD') => '2026-04-05'
   */
  const end = dayjs()

  /**
   * TODAY:
   * 시작일과 종료일을 모두 오늘로 맞춤
   *
   * 예:
   * { startDate: '2026-04-05', endDate: '2026-04-05' }
   */
  if (period.preset === 'TODAY') {
    const d = end.format('YYYY-MM-DD')
    return { startDate: d, endDate: d }
  }

  /**
   * WEEK:
   * 오늘 포함 최근 7일
   *
   * end.subtract(6, 'day')를 사용하는 이유:
   * - 오늘 포함 7일 범위를 만들기 위해서
   * - 예: 4/5 기준이면 3/30 ~ 4/5
   *
   * 총 7일:
   * 3/30, 3/31, 4/1, 4/2, 4/3, 4/4, 4/5
   */
  if (period.preset === 'WEEK') {
    return {
      startDate: end.subtract(6, 'day').format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
    }
  }

  /**
   * MONTH:
   * 오늘 포함 최근 30일
   *
   * end.subtract(29, 'day')를 사용하는 이유:
   * - 오늘 포함 30일 범위를 만들기 위해서
   *
   * 예:
   * 4/5 기준이면 3/7 ~ 4/5
   */
  if (period.preset === 'MONTH') {
    return {
      startDate: end.subtract(29, 'day').format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
    }
  }

  /**
   * CUSTOM:
   * 사용자가 직접 선택한 범위를 사용
   *
   * customRange가 [시작일, 종료일] 형태라면
   * 각각 YYYY-MM-DD 문자열로 변환
   * 이 코드는 customRange가 null이어도 에러가 나지 않게 방어합니다.
   */
  const [a, b] = period.customRange || []

  if (a && b) {
    return {
      startDate: a.format('YYYY-MM-DD'),
      endDate: b.format('YYYY-MM-DD'),
    }
  }

  /**
   * 예외 상황 fallback
   *
   * CUSTOM이 선택되었지만 날짜가 비어 있는 경우,
   * 혹은 예상치 못한 상태가 들어온 경우
   * 안전하게 최근 30일 범위를 기본값으로 반환
   *
   * 이유:
   * - API 호출이 깨지지 않게 하기 위함
   * - 빈 날짜로 요청 보내는 것을 방지
   */
  return {
    startDate: end.subtract(29, 'day').format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
  }
}

/*
이 코드는 이용자 통계 화면에서 선택된 기간값을 백엔드 API 요청용 날짜 범위로 변환하는 유틸 함수입니다.

즉, 프론트에서 사용하는 기간 상태는 아래처럼 되어 있습니다.
TODAY
WEEK
MONTH
CUSTOM

1. 이 파일의 역할은 순수 변환 유틸

이 함수는 UI를 그리지 않습니다.
API도 호출하지 않습니다.

오직 하나만 합니다.

기간 상태를 받아서
날짜 문자열 범위로 변환

즉, 책임이 아주 명확합니다.

end.subtract(6, 'day')
end.subtract(29, 'day')

예를 들어 오늘이 2026-04-05이면

WEEK
시작일: 2026-03-30
종료일: 2026-04-05

총 7일입니다.

MONTH
시작일: 2026-03-07
종료일: 2026-04-05

총 30일입니다.

*/