import { useSortable } from "@dnd-kit/react/sortable";
import { HolderOutlined } from "@ant-design/icons";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { FlexContainer } from "../../common/PLA_Containers";
import { Button } from "antd";
import SortableScheduleItem from "./SortableScheduleItem";

const SortableDayItem = ({ id, index, schedules, editingSchedule, setEditingSchedule, saveScheduleEvent, addScheduleEvent, deleteScheduleEvent }) => {
  const { ref, handleRef, isDragging } = useSortable({
    id,
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

  return (
    <FlexBox h="auto" id="day-item" ref={ref}>
      <FlexContainer>
        <FlexBox h="auto" settings={{ justify: "flex-start" }} style={{opacity: isDragging ? 0.75 : 1}}>
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
                key={schedule.tripScheduleId}
                id={schedule.tripScheduleId}
                dayId={id}
                index={index}
                schedule={schedule}
                isOnly={schedules.length <= 1}
                editingSchedule={editingSchedule}
                setEditingSchedule={setEditingSchedule}
                saveScheduleEvent={() => saveScheduleEvent()}
                deleteScheduleEvent={(scheduleId) => deleteScheduleEvent(id, scheduleId)}
              />
            ))}
          {/* ADD BUTTON */}
          <FlexBox h="28px" settings={{justify: "center"}}>
            <Button style={{width:"100%", height: "24px", margin: "1px 2px 2px 1px", padding: "0px", overflow: "hidden"}}
            onClick={() => addScheduleEvent?.(id)} disabled={editingSchedule ? true : false}>
              <FlexBox settings={{isVertical: false}}>
              <FlexBox w="20px" h="100%" bg="#A8a8a8" settings={{justify: "center"}}>
                +
              </FlexBox>
              <FlexBox settings={{justify: "center"}}>
                계획 추가
              </FlexBox>
              </FlexBox>
            </Button>
          </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexContainer>
    </FlexBox>
  );
};

export default SortableDayItem;