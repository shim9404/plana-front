import { Input } from "antd";
import { useTripInfo } from "../../hooks/TripInfoContext";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import TripDatePicker from "../home/TripDatePicker";
import TripRegionPicker from "../home/TripRegionPicker";
import { CheckCircleTwoTone, SyncOutlined } from "@ant-design/icons";
import { useState } from "react";

const PlanHeader = () => {
  const {
    selectedZdo,
    setSelectedZdo,
    selectedSigu,
    setSelectedSigu,
    tripName,
    setTripName,
  } = useTripInfo();
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
  
  return (
    <FlexBox h="64px" style={{ position: "absolute", zIndex: 100, top: "0px", margin: "18px 0px", minWidth: "708px", pointerEvents: "none" }} settings={{ justify: "center" }}>
      <FlexBox w={`calc(100vw - ${ 120 + 210 + 200 }px)`} bg="none" style={{gap: "12px", minWidth: "708px", pointerEvents: "auto" }}>
        {/* 여행 일정 영역 */}
        <FlexBox w="400px" settings={{isVertical: true}}>
          <TextBox alignW="left" bg="none" style={textboxStyle}>
            여행 일정
          </TextBox>
          <TripDatePicker width="400px" height="48px"/>

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
            <Input showCount maxLength={30} style={{ height: "48px", fontSize:"16px", color:"#565656", padding: "8px 56px 8px 18px"}}
            value={tripName} onChange={(e) => handleChangeTripName(e.target.value)}/>
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