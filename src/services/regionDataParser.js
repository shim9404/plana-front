/**
 * 지역 선택 Cascader 양식으로 가공된 데이터
 * @returns
 */
export const getRegionDataForCascader = (datas) => {
  let regionData = datas;
  if (datas === null || datas === undefined)
  {
    // 임시 데이터 (DB에서 가져온 결과라고 가정)
    let dbDatas = [
      {
        "zdoCode": 32,
        "zdoName": "강원도",
        "sigus": [
          {
            "regionId": "32550",
            "siguCode": 550,
            "siguName": "정선군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32020",
            "siguCode": 20,
            "siguName": "원주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "32030",
            "siguCode": 30,
            "siguName": "강릉시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32600",
            "siguCode": 600,
            "siguName": "고성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32040",
            "siguCode": 40,
            "siguName": "동해시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32070",
            "siguCode": 70,
            "siguName": "삼척시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32060",
            "siguCode": 60,
            "siguName": "속초시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32580",
            "siguCode": 580,
            "siguName": "양구군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32610",
            "siguCode": 610,
            "siguName": "양양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32530",
            "siguCode": 530,
            "siguName": "영월군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32590",
            "siguCode": 590,
            "siguName": "인제군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32560",
            "siguCode": 560,
            "siguName": "철원군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32010",
            "siguCode": 10,
            "siguName": "춘천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32050",
            "siguCode": 50,
            "siguName": "태백시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32540",
            "siguCode": 540,
            "siguName": "평창군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32510",
            "siguCode": 510,
            "siguName": "홍천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32570",
            "siguCode": 570,
            "siguName": "화천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "32520",
            "siguCode": 520,
            "siguName": "횡성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 33,
        "zdoName": "충청북도",
        "sigus": [
          {
            "regionId": "33560",
            "siguCode": 560,
            "siguName": "괴산군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33580",
            "siguCode": 580,
            "siguName": "단양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33520",
            "siguCode": 520,
            "siguName": "보은군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33540",
            "siguCode": 540,
            "siguName": "영동군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33530",
            "siguCode": 530,
            "siguName": "옥천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33570",
            "siguCode": 570,
            "siguName": "음성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33030",
            "siguCode": 30,
            "siguName": "제천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33590",
            "siguCode": 590,
            "siguName": "중평군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33550",
            "siguCode": 550,
            "siguName": "진천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33041",
            "siguCode": 41,
            "siguName": "청주시 상당구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33042",
            "siguCode": 42,
            "siguName": "청주시 서원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33044",
            "siguCode": 44,
            "siguName": "청주시 청원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33043",
            "siguCode": 43,
            "siguName": "청주시 흥덕구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33020",
            "siguCode": 20,
            "siguName": "충주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "33000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 34,
        "zdoName": "충청남도",
        "sigus": [
          {
            "regionId": "34070",
            "siguCode": 70,
            "siguName": "계룡시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34020",
            "siguCode": 20,
            "siguName": "공주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34510",
            "siguCode": 510,
            "siguName": "금산군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34060",
            "siguCode": 60,
            "siguName": "논산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34080",
            "siguCode": 80,
            "siguName": "당진시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34030",
            "siguCode": 30,
            "siguName": "보령시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34530",
            "siguCode": 530,
            "siguName": "부여군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34050",
            "siguCode": 50,
            "siguName": "서산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34540",
            "siguCode": 540,
            "siguName": "서천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34040",
            "siguCode": 40,
            "siguName": "아산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34570",
            "siguCode": 570,
            "siguName": "예산군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34011",
            "siguCode": 11,
            "siguName": "천안시 동남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34012",
            "siguCode": 12,
            "siguName": "천안시 서북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34550",
            "siguCode": 550,
            "siguName": "청양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34580",
            "siguCode": 580,
            "siguName": "태안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34560",
            "siguCode": 560,
            "siguName": "홍성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "34000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 35,
        "zdoName": "전라북도",
        "sigus": [
          {
            "regionId": "35020",
            "siguCode": 20,
            "siguName": "군산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35060",
            "siguCode": 60,
            "siguName": "김제시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35050",
            "siguCode": 50,
            "siguName": "남원시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35530",
            "siguCode": 530,
            "siguName": "무주군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35580",
            "siguCode": 580,
            "siguName": "부안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35560",
            "siguCode": 560,
            "siguName": "순창군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35510",
            "siguCode": 510,
            "siguName": "완주군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35030",
            "siguCode": 30,
            "siguName": "익산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35550",
            "siguCode": 550,
            "siguName": "임실군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35540",
            "siguCode": 540,
            "siguName": "장수군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35012",
            "siguCode": 12,
            "siguName": "전주시 덕진구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35011",
            "siguCode": 11,
            "siguName": "전주시 완산구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35040",
            "siguCode": 40,
            "siguName": "정읍시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35520",
            "siguCode": 520,
            "siguName": "진안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35570",
            "siguCode": 570,
            "siguName": "고창군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "35000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 36,
        "zdoName": "전라남도",
        "sigus": [
          {
            "regionId": "36610",
            "siguCode": 610,
            "siguName": "영암군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36570",
            "siguCode": 570,
            "siguName": "화순군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36590",
            "siguCode": 590,
            "siguName": "강진군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36040",
            "siguCode": 40,
            "siguName": "나주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36560",
            "siguCode": 560,
            "siguName": "보성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36640",
            "siguCode": 640,
            "siguName": "영광군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36580",
            "siguCode": 580,
            "siguName": "장흥군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "36550",
            "siguCode": 550,
            "siguName": "고흥군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36520",
            "siguCode": 520,
            "siguName": "곡성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36060",
            "siguCode": 60,
            "siguName": "광양시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36530",
            "siguCode": 530,
            "siguName": "구례군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36510",
            "siguCode": 510,
            "siguName": "담양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36010",
            "siguCode": 10,
            "siguName": "목포시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36620",
            "siguCode": 620,
            "siguName": "무안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36030",
            "siguCode": 30,
            "siguName": "순천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36680",
            "siguCode": 680,
            "siguName": "신안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36020",
            "siguCode": 20,
            "siguName": "여수시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36660",
            "siguCode": 660,
            "siguName": "완도군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36650",
            "siguCode": 650,
            "siguName": "장성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36670",
            "siguCode": 670,
            "siguName": "진도군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36630",
            "siguCode": 630,
            "siguName": "함평군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "36600",
            "siguCode": 600,
            "siguName": "해남군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 37,
        "zdoName": "경상북도",
        "sigus": [
          {
            "regionId": "37540",
            "siguCode": 540,
            "siguName": "영양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37060",
            "siguCode": 60,
            "siguName": "영주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37050",
            "siguCode": 50,
            "siguName": "구미시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37610",
            "siguCode": 610,
            "siguName": "봉화군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37550",
            "siguCode": 550,
            "siguName": "영덕군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37630",
            "siguCode": 630,
            "siguName": "울릉군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37530",
            "siguCode": 530,
            "siguName": "청송군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "37100",
            "siguCode": 100,
            "siguName": "경산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37020",
            "siguCode": 20,
            "siguName": "경주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37570",
            "siguCode": 570,
            "siguName": "고령군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37510",
            "siguCode": 510,
            "siguName": "군위군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37030",
            "siguCode": 30,
            "siguName": "김천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37090",
            "siguCode": 90,
            "siguName": "문경시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37080",
            "siguCode": 80,
            "siguName": "상주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37580",
            "siguCode": 580,
            "siguName": "성주군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37040",
            "siguCode": 40,
            "siguName": "안동시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37070",
            "siguCode": 70,
            "siguName": "영천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37600",
            "siguCode": 600,
            "siguName": "예천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37620",
            "siguCode": 620,
            "siguName": "울진군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37520",
            "siguCode": 520,
            "siguName": "의성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37560",
            "siguCode": 560,
            "siguName": "청도군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37590",
            "siguCode": 590,
            "siguName": "칠곡군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37011",
            "siguCode": 11,
            "siguName": "포항시 남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "37012",
            "siguCode": 12,
            "siguName": "포항시 북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 38,
        "zdoName": "경상남도",
        "sigus": [
          {
            "regionId": "38113",
            "siguCode": 113,
            "siguName": "창원시 마산합포구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38510",
            "siguCode": 510,
            "siguName": "의령군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38070",
            "siguCode": 70,
            "siguName": "김해시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38570",
            "siguCode": 570,
            "siguName": "산청군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38530",
            "siguCode": 530,
            "siguName": "창녕군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38115",
            "siguCode": 115,
            "siguName": "창원시 진해구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38600",
            "siguCode": 600,
            "siguName": "합천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "38090",
            "siguCode": 90,
            "siguName": "거제시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38590",
            "siguCode": 590,
            "siguName": "거창군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38540",
            "siguCode": 540,
            "siguName": "고성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38550",
            "siguCode": 550,
            "siguName": "남해군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38080",
            "siguCode": 80,
            "siguName": "밀양시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38060",
            "siguCode": 60,
            "siguName": "사천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38100",
            "siguCode": 100,
            "siguName": "양산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38030",
            "siguCode": 30,
            "siguName": "진주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38114",
            "siguCode": 114,
            "siguName": "창원시 마산회원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38112",
            "siguCode": 112,
            "siguName": "창원시 성산구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38111",
            "siguCode": 111,
            "siguName": "창원시 의창구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38050",
            "siguCode": 50,
            "siguName": "통영시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38560",
            "siguCode": 560,
            "siguName": "하동군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38520",
            "siguCode": 520,
            "siguName": "함안군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "38580",
            "siguCode": 580,
            "siguName": "함양군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 39,
        "zdoName": "제주특별차지도",
        "sigus": [
          {
            "regionId": "39020",
            "siguCode": 20,
            "siguName": "서귀포시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "39010",
            "siguCode": 10,
            "siguName": "제주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "39000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 11,
        "zdoName": "서울특별시",
        "sigus": [
          {
            "regionId": "11250",
            "siguCode": 250,
            "siguName": "강동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11240",
            "siguCode": 240,
            "siguName": "송파구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11060",
            "siguCode": 60,
            "siguName": "동대문구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11200",
            "siguCode": 200,
            "siguName": "동작구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11040",
            "siguCode": 40,
            "siguName": "성동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11030",
            "siguCode": 30,
            "siguName": "용산구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11070",
            "siguCode": 70,
            "siguName": "중랑구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "11230",
            "siguCode": 230,
            "siguName": "강남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11090",
            "siguCode": 90,
            "siguName": "강북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11160",
            "siguCode": 160,
            "siguName": "강서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11210",
            "siguCode": 210,
            "siguName": "관악구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11050",
            "siguCode": 50,
            "siguName": "광진구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11170",
            "siguCode": 170,
            "siguName": "구로구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11180",
            "siguCode": 180,
            "siguName": "금천구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11110",
            "siguCode": 110,
            "siguName": "노원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11100",
            "siguCode": 100,
            "siguName": "도봉구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11140",
            "siguCode": 140,
            "siguName": "마포구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11130",
            "siguCode": 130,
            "siguName": "서대문구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11220",
            "siguCode": 220,
            "siguName": "서초구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11080",
            "siguCode": 80,
            "siguName": "성북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11150",
            "siguCode": 150,
            "siguName": "양천구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11190",
            "siguCode": 190,
            "siguName": "영등포구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11120",
            "siguCode": 120,
            "siguName": "은평구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11010",
            "siguCode": 10,
            "siguName": "종로구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "11020",
            "siguCode": 20,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 21,
        "zdoName": "부산광역시",
        "sigus": [
          {
            "regionId": "21070",
            "siguCode": 70,
            "siguName": "남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21050",
            "siguCode": 50,
            "siguName": "부산진구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "21120",
            "siguCode": 120,
            "siguName": "강서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21110",
            "siguCode": 110,
            "siguName": "금정구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21510",
            "siguCode": 510,
            "siguName": "기장군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21030",
            "siguCode": 30,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21060",
            "siguCode": 60,
            "siguName": "동래구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21080",
            "siguCode": 80,
            "siguName": "북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21150",
            "siguCode": 150,
            "siguName": "사상구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21100",
            "siguCode": 100,
            "siguName": "사하구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21020",
            "siguCode": 20,
            "siguName": "서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21140",
            "siguCode": 140,
            "siguName": "수영구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21130",
            "siguCode": 130,
            "siguName": "연제구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21040",
            "siguCode": 40,
            "siguName": "영도구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21010",
            "siguCode": 10,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "21090",
            "siguCode": 90,
            "siguName": "해운대구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 22,
        "zdoName": "대구광역시",
        "sigus": [
          {
            "regionId": "22510",
            "siguCode": 510,
            "siguName": "달성군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22040",
            "siguCode": 40,
            "siguName": "남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "22070",
            "siguCode": 70,
            "siguName": "달서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22020",
            "siguCode": 20,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22050",
            "siguCode": 50,
            "siguName": "북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22030",
            "siguCode": 30,
            "siguName": "서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22060",
            "siguCode": 60,
            "siguName": "수성구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "22010",
            "siguCode": 10,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 23,
        "zdoName": "인천광역시",
        "sigus": [
          {
            "regionId": "23060",
            "siguCode": 60,
            "siguName": "부평구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23040",
            "siguCode": 40,
            "siguName": "연수구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23050",
            "siguCode": 50,
            "siguName": "남동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23080",
            "siguCode": 80,
            "siguName": "서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "23510",
            "siguCode": 510,
            "siguName": "강화군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23070",
            "siguCode": 70,
            "siguName": "계양구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23020",
            "siguCode": 20,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23090",
            "siguCode": 90,
            "siguName": "미추홀구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23520",
            "siguCode": 520,
            "siguName": "옹진군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "23010",
            "siguCode": 10,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 24,
        "zdoName": "광주광역시",
        "sigus": [
          {
            "regionId": "24000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "24050",
            "siguCode": 50,
            "siguName": "광산구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "24030",
            "siguCode": 30,
            "siguName": "남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "24010",
            "siguCode": 10,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "24040",
            "siguCode": 40,
            "siguName": "북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "24020",
            "siguCode": 20,
            "siguName": "서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 25,
        "zdoName": "대전광역시",
        "sigus": [
          {
            "regionId": "25000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "25050",
            "siguCode": 50,
            "siguName": "대덕구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "25010",
            "siguCode": 10,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "25030",
            "siguCode": 30,
            "siguName": "서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "25040",
            "siguCode": 40,
            "siguName": "유성구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "25020",
            "siguCode": 20,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 26,
        "zdoName": "울산광역시",
        "sigus": [
          {
            "regionId": "26040",
            "siguCode": 40,
            "siguName": "북구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "26000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "26020",
            "siguCode": 20,
            "siguName": "남구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "26030",
            "siguCode": 30,
            "siguName": "동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "26510",
            "siguCode": 510,
            "siguName": "울주군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "26010",
            "siguCode": 10,
            "siguName": "중구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 29,
        "zdoName": "세종특별자치시",
        "sigus": [
          {
            "regionId": "29000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "29010",
            "siguCode": 10,
            "siguName": "세종시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      },
      {
        "zdoCode": 31,
        "zdoName": "경기도",
        "sigus": [
          {
            "regionId": "31230",
            "siguCode": 230,
            "siguName": "김포시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31250",
            "siguCode": 250,
            "siguName": "광주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31013",
            "siguCode": 13,
            "siguName": "수원시 팔달구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31210",
            "siguCode": 210,
            "siguName": "이천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31580",
            "siguCode": 580,
            "siguName": "양평군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31280",
            "siguCode": 280,
            "siguName": "여주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31193",
            "siguCode": 193,
            "siguName": "용인시 수지구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31200",
            "siguCode": 200,
            "siguName": "파주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31240",
            "siguCode": 240,
            "siguName": "화성시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31000",
            "siguCode": 0,
            "siguName": "전체",
            "createDate": "2026-04-08 03:09:37",
            "latestDate": "2026-04-08 03:09:37",
            "status": "ACTIVE"
          },
          {
            "regionId": "31570",
            "siguCode": 570,
            "siguName": "가평군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31101",
            "siguCode": 101,
            "siguName": "고양시 덕양구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31103",
            "siguCode": 103,
            "siguName": "고양시 일산동구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31104",
            "siguCode": 104,
            "siguName": "고양시 일산서구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31110",
            "siguCode": 110,
            "siguName": "과천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31060",
            "siguCode": 60,
            "siguName": "광명시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31120",
            "siguCode": 120,
            "siguName": "구리시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31160",
            "siguCode": 160,
            "siguName": "군포시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31130",
            "siguCode": 130,
            "siguName": "남양주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31080",
            "siguCode": 80,
            "siguName": "동두천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31050",
            "siguCode": 50,
            "siguName": "부천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31023",
            "siguCode": 23,
            "siguName": "성남시 분당구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31021",
            "siguCode": 21,
            "siguName": "성남시 수정구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31022",
            "siguCode": 22,
            "siguName": "성남시 중원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31012",
            "siguCode": 12,
            "siguName": "수원시 권선구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31014",
            "siguCode": 14,
            "siguName": "수원시 영통구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31011",
            "siguCode": 11,
            "siguName": "수원시 장안구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31150",
            "siguCode": 150,
            "siguName": "시흥시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31092",
            "siguCode": 92,
            "siguName": "안산시 단원구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31091",
            "siguCode": 91,
            "siguName": "안산시 상록구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31220",
            "siguCode": 220,
            "siguName": "안성시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31042",
            "siguCode": 42,
            "siguName": "안양시 동안구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31041",
            "siguCode": 41,
            "siguName": "안양시 만안구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31260",
            "siguCode": 260,
            "siguName": "양주시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31550",
            "siguCode": 550,
            "siguName": "연천군",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31140",
            "siguCode": 140,
            "siguName": "오산시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31192",
            "siguCode": 192,
            "siguName": "용인시 기흥구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31191",
            "siguCode": 191,
            "siguName": "용인시 처인구",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31170",
            "siguCode": 170,
            "siguName": "의왕시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31030",
            "siguCode": 30,
            "siguName": "의정부시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31070",
            "siguCode": 70,
            "siguName": "평택시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31270",
            "siguCode": 270,
            "siguName": "포천시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          },
          {
            "regionId": "31180",
            "siguCode": 180,
            "siguName": "하남시",
            "createDate": "2026-03-27 06:26:03",
            "latestDate": "2026-04-07 09:53:05",
            "status": "ACTIVE"
          }
        ]
      }
    ];
    regionData = dbDatas;
  }

  const newRegionMap = {};
  
  // Cascader용 데이터 변환
  const newOptions = regionData.map((region) => {
    const zdoKey = String(region.zdoCode);

    // 1. regionMap
    newRegionMap[zdoKey] = region.zdoName;

    // 1. 시군구 배열에서 '전체' 항목과 나머지 항목 분리
    const allOption = region.sigus.find((sigu) => sigu.siguCode == "0");
    const otherSigus = region.sigus.filter((sigu) => sigu.siguCode != "0");

    // 2. '전체'가 존재한다면 맨 앞에 붙이고, 아니면 나머지들만 정렬
    // (가나다순 정렬까지 추가하면 더 깔끔합니다)
    const sortedSigus = allOption
      ? [
          allOption,
          ...otherSigus.sort((a, b) => a.siguName.localeCompare(b.siguName)),
        ]
      : otherSigus.sort((a, b) => a.siguName.localeCompare(b.siguName));

    return {
      value: zdoKey,
      label: region.zdoName,
      children: sortedSigus.map((sigu) => {
        // console.log("region.sigus:: " + sigu.siguName)
        // 2. 시군구 데이터도 regionMap에 추가
        newRegionMap[sigu.regionId] = sigu.siguName;
        return {
          value: sigu.regionId,
          label: sigu.siguName,
        };
      }),
    };
  });

  const processedData = {
    regionMap: newRegionMap,
    cascaderOptions: newOptions,
  };
  return processedData;
};
