import { useSortable } from "@dnd-kit/react/sortable";
import { CloseSquareOutlined, HolderOutlined } from "@ant-design/icons";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { FlexContainer } from "../../common/PLA_Containers";
import SortableScheduleItem from "./SortableScheduleItem";
import AddScheduleButton from "./AddScheduleButton";
import { TextButton } from "../../common/PLA_Buttons";
import { deleteDayApi } from "../../../services/tripApi";
import { useTripInfo } from "../../../hooks/trip/TripInfoContext";
import { usePlanDays } from "../../../hooks/trip/PlanDaysContext";

const SortableDayItem = ({ id, dayId, index, schedules, isDimmed, }) => {
  const { tripId } = useTripInfo();
  const { removePlanDay } = usePlanDays();

  const { ref, handleRef, isDragging } = useSortable({
    id: dayId,
    index,
    type: "list",
    accept: ["list"],
  });

  const rotateStyle = {
    minWidth: "32px",
    maxHeight: "20px",
    lineHeight: "100%",
    fontSize: "12px",
    fontWeight: "500",
    color: "#FFFFFF",
    transform: "rotate(-90deg) translate(0, 0%)",
  };

  const handleDeleteDay = () => {
    requestDeleteDay(removePlanDay);
  }

  /**
   * 일자 삭제 API 요청
   * @param {*} successCallback 
   */
  const requestDeleteDay = async(successCallback) => {
    try {
      const isSuccess = await deleteDayApi(tripId, dayId);
      console.log("deleteDayApi", isSuccess);
      if (isSuccess) {
        successCallback?.(dayId);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <FlexBox h="auto" id={id} ref={ref}>
      <FlexContainer>
        <FlexBox h="auto" settings={{ justify: "flex-start" }} style={{opacity: isDragging ? 0.75 : 1, position: "relative"}}>
          {/* 비활성화된 일자 표기 - absolute */}
          <FlexBox bg="rgba(0,0,0,0.5)" settings={{ isVertical: true, justify: "center", align: "center" }} 
            style={{ position: "absolute", zIndex: 1, borderRadius: "6px", visibility: isDimmed ? "visible" : "hidden"}}>
            <TextButton width="152px" height="40px" fontSize="14px" danger style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
            onClickEvent={() => handleDeleteDay() }>
              <FlexBox settings={{justify: "flex-end"}}>
                {`${index + 1}일차 삭제하기`}
                <CloseSquareOutlined style={{marginLeft: "8px"}}/>
              </FlexBox>
            </TextButton>
            
          </FlexBox>
          {/* 드래그 가능한 핸들 영역 */}
          <FlexBox w="56px" bg="rgba(168, 168, 168, 1)">
            <FlexBox
              w="28px"
              ref={handleRef}
              style={{
                cursor: "grab",
                background: "none",
              }}
              settings={{ justify: "center" }}
            >
              <HolderOutlined style={{ width:"16px", fontSize:"16px", color: "#FFFFFF", backgroundColor:"none" }} />
            </FlexBox>
            <FlexBox w="28px" bg="none">
              <TextBox justify="center" align="left" style={rotateStyle} bg="none">
                {`${index + 1}일차`}
              </TextBox>
            </FlexBox>
          </FlexBox>
          {/* 스케줄 리스트 영역 */}
          <FlexBox 
            w="auto"
            settings={{ isVertical: true, justify: "flex-start" }}
            style={{ gap: "2px" }}
            bg="none"
          >
            {schedules.map((schedule, index) => (
              <SortableScheduleItem
                id={`schedule-item-${schedule.tripScheduleId}`}
                key={schedule.tripScheduleId}
                scheduleId={schedule.tripScheduleId}
                dayId={dayId}
                index={index}
                schedule={schedule}
                isOnly={schedules.length <= 1}
              />
            ))}
          {/* ADD BUTTON */}
          <FlexBox h="28px" settings={{justify: "center"}}>
            <AddScheduleButton dayId={dayId}/>
          </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexContainer>
    </FlexBox>
  );
};

export default SortableDayItem;