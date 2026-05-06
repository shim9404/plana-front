import { tokenStore } from "./tokenStore";

// Access JWT의 payload에서 subject(sub) 값을 추출하는 함수
export function getMemberIdFromAccessToken(accessToken) {
  // 1) 토큰이 없거나 문자열이 아니면 처리 불가
  if (!accessToken || typeof accessToken !== 'string') return null;

  try {
    //Base64 디코딩 후 JSON 문자열을 객체로 변환
    const payload = parseTokenPayload(accessToken);

    // JWT 표준 claim 중 subject(sub) 추출
    //    현재 프로젝트에서는 sub에 memberId가 들어있다고 가정
    const sub = payload.sub;

    // sub가 null/undefined/빈문자열이 아니면 문자열로 변환하여 반환
    // 숫자형으로 들어와도 String() 처리로 안전하게 문자열 통일
    return sub != null && sub !== '' ? String(sub) : null;
  } catch {
    // 8) 디코딩 실패, JSON 파싱 실패 등 예외 발생 시 null 반환
    return null;
  }
}

// 토큰 만료 여부 체크
export const isTokenExpired = () => {
  const token = tokenStore.getRefreshToken();
  if (!token) return true;
  const payload = parseTokenPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
};

// JWT payload를 파싱하는 내부 유틸
const parseTokenPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    // JWT는 일반적으로 "header.payload.signature" 구조
    // split('.') 후 두 번째 요소가 payload
    const part = token.split('.')[1];
    // payload가 없으면 잘못된 JWT 형식이므로 null 반환
    if (!part) return null;

    // JWT payload는 Base64URL 형식일 수 있음
    // atob()는 일반 Base64 형식을 기대하므로 문자 치환 필요
    // - -> +
    // _ -> /
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    //  Base64 문자열 길이는 4의 배수여야 함
    //  부족한 길이만큼 '=' padding 추가
    const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
    return JSON.parse(atob(b64 + pad));
  } catch {
    return null;
  }
};