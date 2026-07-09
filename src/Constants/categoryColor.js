import { BOOKMARK_COLOR } from "./bookmarkColor";

export const CATEGORY_COLOR = {
  "FD6": { bg: BOOKMARK_COLOR.RED.bg2, text: BOOKMARK_COLOR.RED.color }, // 음식점
  "CE7": { bg: BOOKMARK_COLOR.ORANGE.bg2, text: BOOKMARK_COLOR.ORANGE.color }, // 카페
  "CT1": { bg: BOOKMARK_COLOR.PURPLE.bg2, text: BOOKMARK_COLOR.PURPLE.color }, // 문화시설 
  "AT4": { bg: BOOKMARK_COLOR.GREEN.bg2, text: BOOKMARK_COLOR.GREEN.color }, // 관광명소
  "AD5": { bg: BOOKMARK_COLOR.BLUE.bg2, text: BOOKMARK_COLOR.BLUE.color }, // 숙박

  // 기타
  "ETC": { bg: "#A8A8A8", text: "#565656" }, // 기타
  default: { bg: "#A8A8A8", text: "#565656" } // 미지정
}