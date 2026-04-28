// 더미 데이터 (indexSort 기준 정렬)
export const DUMMY_DAYS = [
  {
    tripDayId: "TD11",
    indexSort: 1,
    schedules: [
      {
        tripScheduleId: "TS123",
        indexSort: 1,
        bookmarkId: "BM43",
        context: "북마크 된 것 테스트",
        startTime: "10:00",
        endTime: "13:00",
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
        bookmarkId:"BM11",
        indexSort: 1,
        context: "북마크 테스트",
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

export const DUMMY_BOOKMARKS = [
  {
    bookmarkId: "BM43",
    bookmarkType: "RED",
    areaId: "A2906",
    areaInfo: {
      name: "뿌리공원과 족보박물관",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "AT4",
      address: null,
      roadAddress: "대전광역시 중구 뿌리공원로 79",
      link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4124&pageIndex=1&ntatcSeq=1057701&categorySeq=488",
      telephone: "042-581-4445",
    },
  },
  {
    bookmarkId: "BM11",
    bookmarkType: "YELLOW",
    areaId: "A5373",
    areaInfo: {
      name: "대전오월드",
      mapPos: {
        x: 127.397754143625,
        y: 36.2893534027601,
      },
      category: "AT4",
      address: "대전 중구 사정동 117-1",
      roadAddress: null,
      link: "http://place.map.kakao.com/11505186",
      telephone: "042-580-4820",
    },
  },
  {
    bookmarkId: "BM12",
    bookmarkType: "YELLOW",
    areaId: "A5374",
    areaInfo: {
      name: "대전 테스트장소 임의 등록",
      mapPos: {
        x: 127.397754143625,
        y: 36.2893534027601,
      },
      category: "AT4",
      address: "대전 중구 테스트 주소",
      roadAddress: "대전 중구 테스트 도로명 주소",
      link: null,
      telephone: "042-0000-0000",
    },
  },
  {
    bookmarkId: "BM17",
    bookmarkType: "YELLOW",
    areaId: "A5375",
    areaInfo: {
      name: "대전 테스트장소 임의 등록",
      mapPos: {
        x: 127.397754143625,
        y: 36.2893534027601,
      },
      category: "CE7",
      address: "대전 중구 테스트 주소",
      roadAddress: "대전 중구 테스트 도로명 주소",
      link: null,
      telephone: "042-0000-0000",
    },
  },
  {
    bookmarkId: "BM41",
    bookmarkType: "RED",
    areaId: "A2909",
    areaInfo: {
      name: "대한민국 3대 빵집 성심당(聖心堂)",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "FD6",
      address: null,
      roadAddress: "대전광역시 중구 대종로 480번길 15",
      link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4124&pageIndex=1&ntatcSeq=1057698&categorySeq=488",
      telephone: "1588-8069",
    },
  },
  {
    bookmarkId: "BM42",
    bookmarkType: "RED",
    areaId: "A2903",
    areaInfo: {
      name: "옛 충남도청과 근현대사전시관",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "AT4",
      address: null,
      roadAddress: "대전광역시 중구 중앙로 101 (선화동)",
      link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4123&pageIndex=2&ntatcSeq=1057671&categorySeq=487",
      telephone: "042-270-6303",
    },
  },
  {
    bookmarkId: "BM44",
    bookmarkType: "RED",
    areaId: "A2930",
    areaInfo: {
      name: "종합테마파크 오-월드",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "CT1",
      address: null,
      roadAddress: "대전광역시 중구 사정공원로 70(사정로)",
      link: "https://www.daejeon.go.kr/tou/gallery40BoardView.do?boardId=tou_0001&menuSeq=4125&pageIndex=1&ntatcSeq=1057710&categorySeq=489",
      telephone: "042-580-4820",
    },
  },
  {
    bookmarkId: "BM45",
    bookmarkType: "YELLOW",
    areaId: "A2922",
    areaInfo: {
      name: "창계숭절사",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "CT1",
      address: null,
      roadAddress: "대전광역시 중구 대둔산로137번길 67",
      link: "https://www.daejeon.go.kr/tou/TouTourView.do?tourSeq=701&viewName=1&menuSeq=962",
      telephone: "042-606-6283",
    },
  },
  {
    bookmarkId: "BM2",
    bookmarkType: "GREEN",
    areaId: "A3049",
    areaInfo: {
      name: "갤러리 광화",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "CT1",
      address: "서울 종로구 신문로1가 2 1층,2층",
      roadAddress: "서울 종로구 새문안로 103 (신문로1가, 갤러리광화) 1층,2층",
      link: "https://korean.visitseoul.net/attractions/Pandemic-X-Design-plus-Future-/KOPj466sq?utm_source=seoulopendata&utm_medium=attractions&utm_content=KOPj466sq",
      telephone: "070-8287-2208",
    },
  },
  {
    bookmarkId: "BM4",
    bookmarkType: "BLUE",
    areaId: "A3053",
    areaInfo: {
      name: "생각꿈틀미술관",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "CT1",
      address: "서울 서초구 양재2동 310 언남고등학교 내 언남문화체육센터",
      roadAddress:
        "서울특별시 서초구 동산로 55, 언남고등학교 내 언남문화체육센터 (양재동)",
      link: "https://korean.visitseoul.net/attractions/생각꿈틀미술관/KOP001962?utm_source=seoulopendata&utm_medium=attractions&utm_content=KOP001962",
      telephone: "02-578-0270",
    },
  },
  {
    bookmarkId: "BM5",
    bookmarkType: "PURPLE",
    areaId: "A3057",
    areaInfo: {
      name: "합덕슈퍼",
      mapPos: {
        x: 0.0,
        y: 0.0,
      },
      category: "MT1",
      address: "서울 용산구 한남동 685-1",
      roadAddress: "서울 용산구 이태원로42길 20 (한남동)",
      link: "https://korean.visitseoul.net/attractions/Hapdeok/KOPfz3wx0?utm_source=seoulopendata&utm_medium=attractions&utm_content=KOPfz3wx0",
      telephone: null,
    },
  },
  {
    bookmarkId: "BM29",
    bookmarkType: "RED",
    areaId: "A5375",
    areaInfo: {
      name: "대전 테스트장소 임의 등록",
      mapPos: {
        x: 127.397754143625,
        y: 36.2893534027601,
      },
      category: "AD5",
      address: "대전 중구 테스트 주소",
      roadAddress: "대전 중구 테스트 도로명 주소",
      link: null,
      telephone: "042-0000-0000",
    },
  },
];
