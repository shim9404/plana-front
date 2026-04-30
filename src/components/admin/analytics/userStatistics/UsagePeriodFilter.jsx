import React from 'react'
import { DatePicker, Radio, Space } from 'antd'
import dayjs from 'dayjs'

/**
 * JSDoc typedef
 * usagePeriodRange 파일에 정의된 UsagePeriodValue 타입을 가져와 문서화에 사용
 *
 * 예상 구조 예:
 * {
 *   preset: 'TODAY' | 'WEEK' | 'MONTH' | 'CUSTOM',
 *   customRange: [dayjs.Dayjs, dayjs.Dayjs] | null
 * }
 */
 /** @typedef {import('./usagePeriodRange').UsagePeriodValue} UsagePeriodValue */

/**
 * 기간 프리셋 버튼 목록
 *
 * value:
 * - 실제 내부 값
 *
 * label:
 * - 화면에 표시되는 텍스트
 */
const PRESET_OPTIONS = [
  { value: 'TODAY', label: '오늘' },
  { value: 'WEEK', label: '최근 7일' },
  { value: 'MONTH', label: '최근 30일' },
  { value: 'CUSTOM', label: '사용자 지정' },
]

/**
 * 기간 선택 필터 컴포넌트
 *
 * props:
 * value
 * - 현재 선택된 기간 값
 *
 * onChange
 * - 기간이 변경될 때 상위 컴포넌트에 새 값을 전달하는 함수
 *
 * 예:
 * {
 *   preset: 'MONTH',
 *   customRange: null
 * }
 */
const UsagePeriodFilter = ({ value, onChange }) => {
  /**
   * 프리셋 라디오 버튼 선택 시 실행
   *
   * 동작:
   * 1. 선택한 preset 값 읽기
   * 2. 상위 컴포넌트에 새 period 값 전달
   *
   * 규칙:
   * - CUSTOM 선택 시 기존 customRange 유지
   * - CUSTOM이 아닌 경우 customRange는 null로 초기화
   *
   * 이유:
   * - 오늘/최근7일/최근30일 같은 프리셋은 별도 날짜 범위가 필요 없음
   * - 사용자 지정 모드로 다시 돌아왔을 때 기존 customRange를 유지할 수 있음
   */
  const handlePreset = (e) => {
    const preset = e.target.value

    onChange({
      preset,
      customRange: preset === 'CUSTOM' ? value.customRange : null,
    })
  }

  /**
   * 날짜 범위 선택기 값 변경 시 실행
   *
   * dates:
   * - [시작일, 종료일] 형태
   * - 값이 지워지면 null 또는 비정상 값이 들어올 수 있음
   *
   * 동작:
   * 1. dates가 없거나 2개가 아니면 customRange를 null로 초기화
   * 2. 정상 범위면 preset을 CUSTOM으로 강제하고 선택 범위를 저장
   *
   * 이유:
   * - RangePicker로 날짜를 선택했다는 것은 사용자 지정 기간이기 때문
   */
  const handleRange = (dates) => {
    if (!dates || dates.length !== 2) {
      onChange({ ...value, customRange: null })
      return
    }

    onChange({ preset: 'CUSTOM', customRange: [dates[0], dates[1]] })
  }

  return (
    /**
     * Space:
     * - 내부 요소를 가로로 정렬
     * - wrap 옵션으로 화면이 좁으면 줄바꿈 가능
     * - 하단 여백 부여
     */
    <Space wrap align="center" style={{ marginBottom: 20 }}>
      {/* 필터 제목 */}
      <span style={{ fontWeight: 500 }}>기간</span>

      {/* 
        기간 프리셋 선택 버튼 그룹
        - 현재 선택값은 value.preset
        - 버튼 스타일은 solid
      */}
      <Radio.Group
        value={value.preset}
        onChange={handlePreset}
        optionType="button"
        buttonStyle="solid"
      >
        {/* PRESET_OPTIONS 배열을 기준으로 버튼 생성 */}
        {PRESET_OPTIONS.map((o) => (
          <Radio.Button key={o.value} value={o.value}>
            {o.label}
          </Radio.Button>
        ))}
      </Radio.Group>

      {/* 
        사용자 지정(CUSTOM) 모드일 때만 날짜 범위 선택기 표시
      */}
      {value.preset === 'CUSTOM' ? (
        <DatePicker.RangePicker
          /**
           * 현재 선택된 사용자 지정 날짜 범위
           * 예: [dayjs('2026-04-01'), dayjs('2026-04-05')]
           */
          value={value.customRange}

          /**
           * 날짜 범위 변경 이벤트 핸들러
           */
          onChange={handleRange}

          /**
           * 선택값 삭제 허용
           * X 버튼으로 기간을 지울 수 있음
           */
          allowClear

          /**
           * 빠른 선택 프리셋
           * 사용자가 직접 달력을 넘기지 않고 빠르게 최근 7일/30일 선택 가능
           *
           * dayjs().subtract(6, 'day') ~ dayjs()
           * => 오늘 포함 최근 7일
           *
           * dayjs().subtract(29, 'day') ~ dayjs()
           * => 오늘 포함 최근 30일
           */
          presets={[
            { label: '최근 7일', value: [dayjs().subtract(6, 'day'), dayjs()] },
            { label: '최근 30일', value: [dayjs().subtract(29, 'day'), dayjs()] },
          ]}
        />
      ) : null}
    </Space>
  )
}

export default UsagePeriodFilter

/*
이 코드는 관리자 통계 화면에서 조회 기간을 선택하는 필터 컴포넌트입니다.
역할은:
사용자가 미리 정의된 기간을 선택할 수 있게 함
- 오늘
- 최근 7일
- 최근 30일
- 사용자 지정
- 사용자 지정을 선택하면 날짜 범위 선택기(RangePicker)를 보여줌
- 사용자가 기간을 바꾸면 상위 컴포넌트에 onChange()로 변경된 값을 전달함

즉, 이 컴포넌트 자체는 데이터를 조회하지 않고,
조회 조건(period state)만 변경하는 UI 컴포넌트입니다.
*/