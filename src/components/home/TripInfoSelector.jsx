import { FloatingContainer } from '../common/PLA_Containers'
import { FlexBox, TextBox } from '../common/PLA_FlexBox'
import { TextButton } from '../common/PLA_Buttons'
import { flexStyle } from '../../styles/homeStyles'
import { useEffect, useRef, useState } from 'react'
import styles from "../../styles/TripInfoSelector.module.css"
import TripDatePicker from './TripDatePicker'
import { useTripInfo } from '../../hooks/trip/TripInfoContext'
import TripRegionPicker from './TripRegionPicker'
import { NAV_PRESET } from '../../utils/protectedNavPreset'
import useProtectedNavigate from '../../hooks/useProtectedNavigate'
import { addTripApi } from '../../services/tripApi'
import { useAuth } from '../../hooks/AuthContext'
import { usePlanDays } from '../../hooks/trip/PlanDaysContext'
import { useTripRegion } from '../../hooks/trip/TripRegionContext'
import { useTripDate } from '../../hooks/trip/TripDateContext'
import { usePlanBookmark } from '../../hooks/trip/PlanBookmarkContext'

const TripInfoSelector = ({ setHoveredId }) => {
  const { selectedZdo, setSelectedZdo, selectedSigu, setSelectedSigu } = useTripRegion();
  const { confirmedDates, setConfirmedDates, setActiveDayCount } = useTripDate();
  const { setTripName, setTripId } = useTripInfo();
  const { setPlanDays } = usePlanDays();
  const { setBookmarks } = usePlanBookmark();
  const { memberId, username } = useAuth();
  const protectedNavigate = useProtectedNavigate();

  const hoverTimerRef = useRef(null); // 호버 유예 시간

  const cascaderValue = selectedSigu
    ? [selectedZdo, selectedSigu]     // 시군구까지 선택된 경우
    : selectedZdo
      ? [selectedZdo]                 // 시도만 선택된 경우
      : undefined;                    // 아무것도 선택 안 된 경우

  // plan page로 이동
  const handleStart = () => {
    handleCreateTrip(() => {
      protectedNavigate(NAV_PRESET.PLAN);
    });
  }

  const handleCreateTrip = async (successCallback) => {
    let data = {
      memberId: memberId,
      name: "새 여행 이름",
      startDate: confirmedDates[0].format("YYYY-MM-DD"),
      endDate: confirmedDates[1].format("YYYY-MM-DD"),
      regionId: selectedSigu
    };

    try {
      const result = await addTripApi(data);
      if (result) {
        const response = result.data;
        setBookmarks([]);
        setTripId(response.tripId);
        setTripName(response.name);
        setPlanDays(response.days);
        setActiveDayCount(response.days.length);
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
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
      <FlexBox w='26%' h='78%' style={{ position: "relative", minWidth:"390px", maxWidth: "500px", minHeight:"480px", maxHeight: "600px" }} >
        <FloatingContainer settings={{ transform: "translate(0%, -20%)", top: "40%", left: "36%", backgroundColor: "#FFFFFF", justify: "center" }} >
          <FlexBox w="85%" h="90%" settings={{ align: "flex-start", justify: "space-around" }} style={flexStyle} >
            <FlexBox w="100%" h="20%" bg="none" settings={{isVertical: true, justify: "flex-start"}} style={{ fontSize: "28px" }}>
              <FlexBox w="100%">
                {`${username} 님 :)`}
              </FlexBox>
              <FlexBox w="100%">
                어떤 여행을 계획하고 있나요?
              </FlexBox>
            </FlexBox>
            <FlexBox h="50%" bg="none" settings={{ isVertical: true, justify: "flex-start"}} style={{gap: "10%"}}>
              {/* 어디로 가볼까요? */}
              <FlexBox w="100%" h="auto" bg="none" settings={{ align: "center", justify: "center" }} style={flexStyle}>
                <FlexBox h="45px" bg="none" style={{ fontSize: "20px" }}>어디로 가볼까요?</FlexBox>
                <FlexBox h="56px">
                  <TripRegionPicker
                    width='100%'
                    value={cascaderValue}
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
                    rootClassName={styles.customPopup} />
                </FlexBox>
              </FlexBox>
              {/* 언제 출발할까요? */}
              <FlexBox w="100%" h="auto" bg="none" settings={{ align: "center", justify: "center" }} style={flexStyle}>
                <FlexBox h="45px" bg="none" style={{ fontSize: "20px" }}>언제 출발할까요?</FlexBox>
                <FlexBox h="56px" >
                  <TripDatePicker width='100%' />
                </FlexBox>
              </FlexBox>
            </FlexBox>
            <FlexBox w="100%" h="16%" bg="none" settings={{ align: "center", justify: "center" }} style={{minHeight: "48px", maxHeight: "64px"}}>
              <TextButton type="primary" disabled={selectedZdo ? false : true} onClickEvent={handleStart} width="100%" height="100%" fontSize="18px">여행 계획 시작하기</TextButton>
            </FlexBox>
          </FlexBox>
        </FloatingContainer>
      </FlexBox>
    </FlexBox>
  )
}

export default TripInfoSelector
