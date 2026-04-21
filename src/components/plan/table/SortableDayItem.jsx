import { createContext, useContext, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HolderOutlined } from "@ant-design/icons";
import { Button, Flex, List } from "antd";
import { FlexContainer } from "../../common/PLA_Containers";
import DayItemTable from "./DayItemTable";

const dayStyle = {
  backgroundColor: "rgba(168, 168, 168, 1)",
  width: "48px",
  alignItems: "center",
  overflow: "hidden",
};

const textRotateStyle = {
  // backgroundColor: "rgba(128, 64, 12, 0.75)",
  padding: "0px",
  margin: "0px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#FFFFFF",
  transform: "rotate(-90deg)",
};

const SortableListItemContext = createContext({});

/**
 * DAY 아이템 전용 Drag Handle
 * @param {*} param0 
 * @returns 
 */
const DayDragHandle = ({ dayIndex }) => {
  const { setActivatorNodeRef, listeners, attributes } = useContext(SortableListItemContext);
  return (
    <Button
      type="text"
      size="small"
      style={{ cursor: "move", width: "100%", height: "100%" }}
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
    >
      <Flex>
        <HolderOutlined style={{ color: "#FFFFFF" }}/>
        <Flex style={textRotateStyle} justify="center" align="center">
          {`${dayIndex}일차`}
        </Flex>
      </Flex>
      </Button>
  );
};

/**
 * 드래그&드롭으로 정렬 가능한 DAY 아이템
 * 일자 하위의 스케줄이 Table 컴포넌트로 삽입
 * @param {*} param0 
 * @returns 
 */
const SortableDayItem = ({ itemKey, day, onSchedulesChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemKey });

  const listStyle = {
    display: "block",
    marginTop: "4px",
    marginBottom: "4px",
    padding: "0px",
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes]
  );

  return (
    <SortableListItemContext.Provider value={memoizedValue}>
      <List.Item ref={setNodeRef} style={listStyle}>
        <FlexContainer>
          {/* Day 핸들 영역 */}
          <Flex style={dayStyle}>
            <DayDragHandle dayIndex={day?.indexSort}/>
          </Flex>
          {/* 하위 스케줄 테이블 리스트 영역 */}
          <DayItemTable
            dayId={day?.tripDayId}
            schedules={day?.schedules}
            onSchedulesChange={(newSchedules) =>
              onSchedulesChange?.(day?.tripDayId, newSchedules)
            }
          />
      </FlexContainer>
      </List.Item>
    </SortableListItemContext.Provider>
  );
};


export default SortableDayItem;