import { useSortable } from "@dnd-kit/react/sortable";
import { FlexContainer } from "../../common/PLA_Containers";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/helpers";
import { DUMMY_DAYS } from "./PLAN_DUMMY";
import { Button, Input } from "antd";
import { CloseSquareOutlined, HolderOutlined } from "@ant-design/icons";
import { IconButton } from "../../common/PLA_Buttons";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";

const ScheduleEditableItem = ({value, isEditing, setIsEditing, ...rest}) => {
  return (
    <FlexBox {...rest}>
      {
        isEditing ?
        <Input value={value}/>
        :
        <TextBox h="75%" color="#565656" style={{backgroundColor: "none"}}
        onClick={() => {setIsEditing(true)}}>
          {value}
        </TextBox>
      }
    </FlexBox>
  );
};

const SortableScheduleItem = ({ id, index, schedule, isOnly }) => {
  const { ref, handleRef, isDragging } = useSortable({ id, index, type: "item" });
  const { isExpanded } = useTripPlan();
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <FlexBox
      ref={ref} h="32px"
      style={{ opacity: isDragging ? 0.75 : 1 }}
      settings={{justify: "flex-start"}}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <FlexBox
        ref={handleRef}
        w="28px"
        h="100%"
        style={{
          cursor: "grab",
          padding: "4px",
          background: "none",
          visibility: !isOnly && isHover ? "visible" : "hidden"
        }}
      >
        <HolderOutlined style={{ color: "#565656" }} />
      </FlexBox>
      <FlexBox w="auto" bg="none">
        <FlexBox w="auto" settings={{justify: "flex-start"}}>
          <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="092px" bg="none" value={"AM 00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="092px" bg="none" value={"AM 00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="088px" bg="none" value={"식사"}/>
          <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="300px" bg="none" value={schedule.context || "-"}/>
        </FlexBox>
        {
          isExpanded ? 
          <FlexBox w="auto" settings={{justify: "flex-start"}}>
            <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="380px" bg="none" value={schedule.memo || "(메모 없음)"}/>
            <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="160px" bg="none" value={"5600"}/>
            <ScheduleEditableItem isEditing={isEditing} setIsEditing={setIsEditing} w="100px" bg="none" value={null}/>
          </FlexBox> : <></>
        }
          
        <FlexBox w="36px" settings={{justify: "center"}}>
          <IconButton
            width="32px"
            height="32px"
            fontSize="10px"
            ghost={isHover ? false : true}
            danger
            onClickEvent={() => {
              // 행 삭제 이벤트 연결
            }}
          >
            <CloseSquareOutlined />
          </IconButton>
        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  );
};

const SortableDayItem = ({ id, index, schedules }) => {
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
    <FlexContainer ref={ref}>
      <FlexBox settings={{ justify: "flex-start" }} style={{opacity: isDragging ? 0.75 : 1}}>
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
            />
          ))}
        {/* ADD BUTTON */}
        <FlexBox h="28px" settings={{justify: "center"}}>
          <Button style={{width:"100%", height: "24px", margin: "1px 2px 2px 1px", padding: "0px", overflow: "hidden"}}
          onClick={null}>
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
  );
};

const PlanTableContent = () => {
  const [days, setDays] = useState(DUMMY_DAYS);

  // 드래그 이벤트 (일자 및 스케줄 통합)
  const handleMove = (event) => {
    const { source, target } = event.operation;
    if (!source || !target) return;
    // console.log("source id:", source.id);
    // console.log("source type:", source.type);
    // console.log("target id:", target.id);
    // console.log("target type:", target.type);

    const sourceId = source.id;
    const targetId = target.id;
    const sourceType = source.type;

    setDays((prev) => {
      // 리스트 재정렬
      if (sourceType === "list") {
        const oldIndex = prev.findIndex((d) => d.tripDayId === sourceId);
        const newIndex = prev.findIndex((d) => d.tripDayId === targetId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
          return prev;
        return arrayMove(prev, oldIndex, newIndex);
      }

      // 아이템 재정렬
      if (sourceType === "item") {
        const sourceDayIndex = prev.findIndex((d) =>
          d.schedules.some((s) => s.tripScheduleId === sourceId),
        );
        const targetDayIndex = prev.findIndex((d) =>
          d.schedules.some((s) => s.tripScheduleId === targetId),
        );
        if (sourceDayIndex === -1 || targetDayIndex === -1) return prev;

        const newDays = prev.map((d) => ({
          ...d,
          schedules: [...d.schedules],
        }));
        const sourceSchedules = newDays[sourceDayIndex].schedules;
        const targetSchedules = newDays[targetDayIndex].schedules;

        const oldIndex = sourceSchedules.findIndex(
          (s) => s.tripScheduleId === sourceId,
        );
        const newIndex = targetSchedules.findIndex(
          (s) => s.tripScheduleId === targetId,
        );
        if (oldIndex === -1 || newIndex === -1) return prev;

        // 같은 리스트 내 이동
        if (sourceDayIndex === targetDayIndex) {
          newDays[sourceDayIndex].schedules = arrayMove(
            sourceSchedules,
            oldIndex,
            newIndex,
          );
        } else {
          // 다른 리스트로 이동
          const [removed] = sourceSchedules.splice(oldIndex, 1);
          targetSchedules.splice(newIndex, 0, removed);
        }

        return newDays;
      }

      return prev;
    });
  };

  return (
    <DragDropProvider
      onDragOver={handleMove} // 드래그 중 실시간 미리보기
      onDragEnd={handleMove} // 드롭 시 최종 반영
    >
      <FlexBox settings={{ isVertical: true }} style={{ gap: "8px" }}>
        {days.map((day, index) => {
          return (
            <SortableDayItem
              key={day.tripDayId}
              id={day.tripDayId}
              index={index}
              schedules={day.schedules}
            />
          );
        })}
      </FlexBox>
    </DragDropProvider>
  );
}

export default PlanTableContent;
