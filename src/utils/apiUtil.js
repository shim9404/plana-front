
// retries 만큼 요청 재시도 후 실패 처리하는 함수
export async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLast = i === retries - 1;
      if (isLast) throw error; // 마지막 시도면 에러 던지기
      console.warn(`요청 실패, ${i + 1}번째 재시도 중...`, error);
      await new Promise(res => setTimeout(res, delay * (i + 1))); // 점진적 대기 (1s, 2s, 3s)
    }
  }
}


// delay 만큼 최소 시간 기다리고 결과값을 반환하는 함수
export const withMinDelay = (promise, delay = 1500) => {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, delay)),
  ]).then(([result]) => result);
};