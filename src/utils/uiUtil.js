let loadingStartTime = 0;

export const showLoader = () => {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loadingStartTime = Date.now(); // 킨 시점 기록
    loader.style.display = 'flex';
  }
};

export const hideLoader = (minDelay = 1000) => {
  const loader = document.getElementById('global-loader');
  if (!loader) return;

  const currentTime = Date.now();
  const elapsedTime = currentTime - loadingStartTime;

  if (elapsedTime < minDelay) {
    // 0.5초보다 빨리 끝났다면 남은 시간만큼 기다렸다가 끔
    setTimeout(() => {
      loader.style.display = 'none';
    }, minDelay - elapsedTime);
  } else {
    // 이미 0.5초가 지났다면 즉시 끔
    loader.style.display = 'none';
  }
};