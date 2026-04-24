// 더미 데이터 (indexSort 기준 정렬)
export const DUMMY_DAYS = [
  {
    tripDayId: "TD11",
    indexSort: 1,
    schedules: [
      {
        tripScheduleId: "TS123",
        indexSort: 1,
        context: "있던 1일차 데이터 수정",
        startTime: "AM 10:00",
        endTime: "PM 01:00",
        category: "이동",
        memo: "메모 내용 존재",
        price: 50000,
        link: "https://www.naver.com"
      },
      { tripScheduleId: "TS124",indexSort: 2, startTime: "10:00", endTime: "13:00", category: "이동" },
      {
        tripScheduleId: "TS126",
        indexSort: 3,
        context: "데이터에 없는 장소 직접 입력",
        startTime: "14:00",
        endTime: "15:00",
        category: "식사",
        price: 3040,
        link: "https://www.daum.net"
      },
    ],
  },
  {
    tripDayId: "TD12",
    indexSort: 2,
    schedules: [
      { tripScheduleId: "TS129", indexSort: 2, context: "데이터" },
      { tripScheduleId: "TS135",indexSort: 1, context: "신규생성 2일차 데이터" },
    ],
  },
  {
    tripDayId: "TD13",
    indexSort: 4,
    schedules: [
      {
        tripScheduleId: "TS153",
        indexSort: 1,
        context: "있던 3일차 데이터 수정",
        startTime: "10:00",
        endTime: "13:00",
        category: "이동",
      },
    ],
  },
  {
    tripDayId: "TD18",
    indexSort: 5,
    schedules: [
      {
        tripScheduleId: "TS183",
        indexSort: 1,
        context: "5일차 데이터 수정",
        startTime: "10:00",
        endTime: "13:00",
        category: "이동",
      },
    ],
  },
  {
    tripDayId: "TD14",
    indexSort: 3,
    schedules: [{ tripScheduleId: "TS184", indexSort: 1, context: "ddd" }, { tripScheduleId: "TS186", indexSort: 2 }],
  },
].sort((a, b) => a.indexSort - b.indexSort);
