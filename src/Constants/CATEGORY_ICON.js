import { LayoutDashboard, Store, Utensils, School, Hospital, Building, House, CircleParking, BatteryCharging, TramFront, Landmark, BadgeDollarSign, Coffee } from 'lucide-react';

export const CATEGORY_ICON = {
  "대형마트": Store,
  "편의점": Store,
  "어린이집, 유치원": School,
  "학교": School,
  "학원": School,
  "주차장": CircleParking,
  "주유소, 충전소": BatteryCharging,
  "지하철역": TramFront,
  "은행": BadgeDollarSign,
  "문화시설": Landmark,
  "중개업소": Building,
  "공공기관": Building,
  "관광명소": Landmark,
  "숙박": House,
  "음식점": Utensils,
  "카페": Coffee,
  "병원": Hospital,
  "약국": Hospital,
  "기타": LayoutDashboard,
  default: LayoutDashboard,
}
