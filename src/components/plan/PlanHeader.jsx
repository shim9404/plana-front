import { Input } from "antd";
import { useTripInfo } from "../../hooks/trip/TripInfoContext";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import TripDatePicker from "../home/TripDatePicker";
import TripRegionPicker from "../home/TripRegionPicker";
import { CheckCircleTwoTone, SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { editTripDateApi, editTripInfoApi } from "../../services/tripApi";
import dayjs from "dayjs";
import { usePlanDays } from "../../hooks/trip/PlanDaysContext";
import { useTripRegion } from "../../hooks/trip/TripRegionContext";
import { useTripDate } from "../../hooks/trip/TripDateContext";
import { DebounceInput } from "../common/PLA_Input";

const PlanHeader = () => {
  const { selectedZdo, setSelectedZdo, selectedSigu, setSelectedSigu } = useTripRegion();
  const { tripName, setTripName, tripId } = useTripInfo();
  const { setActiveDayCount } = useTripDate();
  const { addPlanDays } = usePlanDays();
  const [isSaving, setIsSaving] = useState(false);

  const cascaderValue = selectedSigu
  ? [selectedZdo, selectedSigu]     // 시군구까지 선택된 경우
  : selectedZdo
    ? [selectedZdo]                 // 시도만 선택된 경우
    : undefined;                    // 아무것도 선택 안 된 경우

  const textboxStyle = { minWidth: "60px", marginLeft: "8px" };

  const handleChangeRegion = (value) => {
    // value는 [zdoCode, siguId] 배열 형태
    if (value == null || value.length === 0) {
      setSelectedZdo(null);
      setSelectedSigu(null);
      return;
    }

    setSelectedZdo(value[0] ?? null);
    setSelectedSigu(value[1] ?? `${value[0]}000`);
  };

  const handleChangeTripName = (value) => {
    setTripName(value);
  }

  const handleSaveTripName = () => {
    setIsSaving(true);
    requestUpdateTripName(() => {
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    })
  }

  const handleSaveTripDate = (dates) => {
    // TODO: 팝업 확인 및 로딩 추가 필요
    requestUpdateTripDate(dates, (addDays, activeDayCount) => { 
      if (addDays && addDays.length > 0) {
        addPlanDays(addDays); 
      }
      
      setActiveDayCount(activeDayCount);
    });
  }

  /**
   * 여행명 수정 API 요청
   * @param {*} successCallback 
   */
  const requestUpdateTripName = async(successCallback) => {
    try {
      const request = { name: tripName };
      const isSuccess = await editTripInfoApi(tripId, request);
      if (isSuccess) {
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 여행 일정 수정 API 요청
   * @param {*} successCallback 
   */
  const requestUpdateTripDate = async(dates, successCallback) => {
    console.log(dates);
    try {
      const request = { startDate: dates[0].format("YYYY-MM-DD"), endDate: dates[1].format("YYYY-MM-DD")};
      const result = await editTripDateApi(tripId, request);
      if (result) {
        const addDays = result.data.addDays;
        const activeDayCount = result.data.activeDayCount;
        successCallback?.(addDays, activeDayCount);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <FlexBox h="64px" style={{ position: "absolute", zIndex: 100, top: "0px", margin: "18px 0px", minWidth: "708px", pointerEvents: "none" }} settings={{ justify: "center" }}>
      <FlexBox w={`calc(100vw - ${ 120 + 210 + 200 }px)`} bg="none" style={{gap: "12px", minWidth: "708px", pointerEvents: "auto" }}>
        {/* 여행 일정 영역 */}
        <FlexBox w="400px" settings={{isVertical: true}}>
          <TextBox alignW="left" bg="none" style={textboxStyle}>
            여행 일정
          </TextBox>
          <TripDatePicker width="400px" height="48px" handleSave={(dates) => handleSaveTripDate(dates)}/>

        </FlexBox>
        {/* 검색 지역 영역 */}
        <FlexBox w="220px" settings={{isVertical: true}} bg="none">
          <TextBox alignW="left" bg="none" style={textboxStyle}>
            검색 지역
          </TextBox>
          <TripRegionPicker
            width="220px" height="48px"
            value={cascaderValue}
            onChange={handleChangeRegion}
            changeOnSelect={handleChangeRegion}
            />
        </FlexBox>
        {/* 여행명 영역 */}
        <FlexBox settings={{ isVertical: true }} bg="none">
          <TextBox alignW="left" bg="none" style={textboxStyle}>
            여행 이름
          </TextBox>
          <FlexBox h="48px" style={{ position: "relative" }}>
            <DebounceInput showCount maxLength={30} style={{ height: "48px", fontSize:"16px", color:"#565656", padding: "8px 56px 8px 18px"}}
            defaultValue={tripName} onChangeEvent={handleChangeTripName} onBlur={() => {handleSaveTripName()}}/>
            <FlexBox w="52px" h="52px" settings={{ justify:"center" }} style={{ fontSize:"20px", right: "0%", position: "absolute", zIndex: 10 }}>
              {
                isSaving?
                <SyncOutlined spin /> : <CheckCircleTwoTone twoToneColor="#52c41a" />
              }
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default PlanHeader;