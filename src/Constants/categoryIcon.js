import { LayoutDashboard, Store, Utensils, School, Hospital, Building, House, CircleParking, BatteryCharging, TramFront, Landmark, BadgeDollarSign, Coffee } from 'lucide-react';

export const CATEGORY_ICON = {
  "MT1": Store, // 대형마트
  "CS2": Store, // 편의점
  "PS3": School, // 어린이집, 유치원
  "SC4": School, // 학교
  "AC5": School, // 학원
  "PK6": CircleParking, // 주차장
  "OL7": BatteryCharging, // 주유소, 충전소
  "SW8": TramFront, // 지하철역
  "BK9": BadgeDollarSign, // 은행
  "CT1": Landmark, // 문화시설
  "AG2": Building, // 중개업소
  "PO3": Building, // 공공기관
  "AT4": Landmark, // 관광명소
  "AD5": House, // 숙박
  "FD6": Utensils, // 음식점
  "CE7": Coffee, // 카페
  "HP8": Hospital, // 병원
  "PM9": Hospital, // 약국
  "etc": LayoutDashboard, // 기타
  default: LayoutDashboard,
}
