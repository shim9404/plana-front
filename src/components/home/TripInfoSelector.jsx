import { FloatingContainer } from '../common/PLA_Containers'
import { FlexBox } from '../common/PLA_FlexBox'
import { Button, Cascader } from 'antd'
import { TextButton } from '../common/PLA_Buttons'
import { flexStyle, labelStyle } from '../../styles/homeStyles'
import { useRef, useState } from 'react'
import { useRegion } from '../../hooks/home/RegionContext'
import styles from "../../styles/TripInfoSelector.module.css"
import TripDatePicker from './TripDatePicker'
import { useTripInfo } from '../../hooks/TripInfoContext'
import { useNavigate } from 'react-router-dom'

const TripInfoSelector = ({ setHoveredId }) => {
  const navigate = useNavigate();
  const { selectedZdo, setSelectedZdo, selectedSigu, setSelectedSigu } = useTripInfo();

  const { regionData } = useRegion();
  const { cascaderOptions } = regionData;

  const hoverTimerRef = useRef(null); // 호버 유예 시간

  const cascaderValue = selectedSigu
    ? [selectedZdo, selectedSigu]     // 시군구까지 선택된 경우
    : selectedZdo
      ? [selectedZdo]                 // 시도만 선택된 경우
      : undefined;                    // 아무것도 선택 안 된 경우

  // plan page로 이동
  const handleStart = () => {
    navigate("/Plan");
  }

  const handleValuesChange = (value) => {
    // value는 [zdoCode, siguId] 배열 형태
    if (value == null || value.length === 0) {
      setSelectedZdo(null);
      setSelectedSigu(null);
      return;
    }

    setSelectedZdo(value[0] ?? null);
    setSelectedSigu(value[1] ?? `${value[0]}000`);
  };

  const handleMouseEnter = (value) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredId(value);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 100);
  };

  return (
    <FlexBox w='100%' h='100%' settings={{ align: "flex-start", justify: "flex-start" }}>
      {/* 어떤 여행을 계획하고 있나요? */}
      <FlexBox w='26%' h='78%' style={{ position: "relative", maxWidth: "500px", maxHeight: "600px" }} >
        <FloatingContainer settings={{ transform: "translate(0%, -25%)", top: "40%", left: "40%", backgroundColor: "#FFFFFF", justify: "center" }} >
          <FlexBox w="85%" h="90%" settings={{ align: "flex-start", justify: "space-around" }} style={flexStyle} >
            <FlexBox w="100%" h="20%" style={{ fontSize: "28px" }}>어떤 여행을 계획하고 있나요?</FlexBox>
            <FlexBox h="50%" style={flexStyle}>
              {/* 어디로 가볼까요? */}
              <FlexBox w="100%" h="50%" settings={{ align: "center", justify: "center" }} style={flexStyle}>
                <FlexBox h="20%" style={{ fontSize: "20px" }}>어디로 가볼까요?</FlexBox>
                <FlexBox h="50%">
                  {cascaderOptions && cascaderOptions.length > 0 ?
                    <Cascader
                      value={cascaderValue}
                      options={cascaderOptions}
                      onChange={handleValuesChange}
                      changeOnSelect={handleValuesChange}
                      popupRender={(menus) => (
                        <div
                          onMouseLeave={() => {
                            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                            setHoveredId(null);
                          }}
                        >
                          {menus}
                        </div>
                      )}
                      // 드롭다운 아이템에 마우스를 올렸을 때 지도에 신호를 보냄
                      optionRender={(option) => (
                        <div
                          onMouseEnter={() => handleMouseEnter(option.value)}
                          onMouseLeave={() => handleMouseLeave}
                          style={{ width: '100%' }}
                        >
                          {option.label}
                        </div>
                      )}
                      rootClassName={styles.customPopup}
                      style={labelStyle}
                      placeholder="여행 지역을 선택해 주세요" />
                    : <p>데이터 로딩중...</p>}
                </FlexBox>
              </FlexBox>
              {/* 언제 출발할까요? */}
              <FlexBox w="100%" h="50%" settings={{ align: "center", justify: "center" }} style={flexStyle}>
                <FlexBox h="20%" style={{ fontSize: "20px" }}>언제 출발할까요?</FlexBox>
                <FlexBox h="50%" >
                  <TripDatePicker />
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox w="100%" h="20%" settings={{ align: "center", justify: "center" }}>
              <TextButton type="primary" disabled={selectedZdo ? false : true} onClickEvent={handleStart} width="400px" height="64px" fontSize="18px">여행 계획 시작하기</TextButton>
            </FlexBox>
          </FlexBox>
        </FloatingContainer>
      </FlexBox>
    </FlexBox>
  )
}

export default TripInfoSelector
