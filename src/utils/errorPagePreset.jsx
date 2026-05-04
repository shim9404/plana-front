import { WifiOff, FileSearch, ShieldAlert, ServerCrash } from 'lucide-react';

export const ERROR_CONFIG = {
  REDIS_CONNECTION_FAILURE: {
    status: "500",
    icon: WifiOff,
    title: "데이터베이스 연결 오류",
    message: "현재 서버의 Redis 설정이 올바르지 않습니다. 관리자에게 문의하세요.",
  },
  // 404 페이지 없음
  NOT_FOUND: {
    status: "404",
    icon: FileSearch,
    title: "페이지를 찾을 수 없습니다",
    message: "요청하신 주소가 변경되었거나 삭제되었을 수 있습니다.",
  },
  // 권한 없음
  FORBIDDEN: {
    status: "403",
    icon: ShieldAlert,
    title: "접근 권한이 없습니다",
    message: "해당 페이지에 접근할 수 있는 권한이 부족합니다.",
  },
  // 기본 에러 (Fallback)
  DEFAULT: {
    status: "500",
    icon: ServerCrash,
    title: "서버 내부 오류",
    message: "잠시 후 다시 시도해 주세요.",
  }
};