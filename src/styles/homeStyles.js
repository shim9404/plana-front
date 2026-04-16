


export const slideVariants = {
  enter: {
    x: '100%', // 처음 나타날 때 오른쪽 밖에서 시작
    opacity: 0,
  },
  center: {
    x: 0,      // 화면 중앙 정위치
    opacity: 1,
  },
  exit: {
    x: '100%', // 사라질 때 다시 오른쪽으로 나감
    opacity: 0,
  },
};

export const mapStyle = {
  position: "absolute",
  transform: "translate(0,-13%)",
  width: "57%",
  height: "110%",
  overflow: "hidden",
  // backgroundColor: "red"
}

export const siguStyle = {
  width: "auto",
  height: "70%",
  cursor: 'pointer',
  scale: 1.2
}

export const zdoStyle = {
  width: "auto",
  height: "80%",
  cursor: 'pointer',
  scale: 1.3
}

export const animDivStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute'
}

export const tooltipStyle = (tooltip) => {

  const style = {
    position: 'absolute',
    left: tooltip.x,
    top: tooltip.y,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#ffffff',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '13px',
    zIndex: 9999,
    pointerEvents: 'none', // 툴팁 때문에 마우스 이벤트가 끊기지 않게 함
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  }

  return style
}

export const flexStyle = {
  flexDirection: "column"
}

export const labelStyle = {
  justifyContent: "flex-start",
  color: "#A8A8A8",
  width: "400px",
  height: "52px",
  fontSize: "16px"
}

