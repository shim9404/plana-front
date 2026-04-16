import { useContext } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table } from "antd";
import { SortableScheduleItem } from "./SortableScheduleItem";
import { DragHandle } from "./DragHandle";
import {
  CloseSquareOutlined,
  ExportOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { PlanTableContext } from "../../../hooks/plan/PlanTableContext";
import { IconButton } from "../../common/PLA_Buttons";
import { FlexContainer } from "../../common/PLA_Containers";
import { FlexBox } from "../../common/PLA_FlexBox";

/**
 * DAY 리스트 내부에 존재하는 SCHEDULE 단위의 테이블 역할
 * @param {} param0
 * @returns
 */
const DayItemTable = ({ dayId, schedules, onSchedulesChange }) => {
  const { isExpanded } = useContext(PlanTableContext);
  const columns = [
    {
      key: "dragHandle",
      width: "32px",
      render: () => <DragHandle icon={<HolderOutlined />} />,
    },
    {
      title: "출발시간",
      dataIndex: "startTime",
      key: "startTime",
      width: "92px",
      align: "center",
      editable: true,
      // render: (v) => v ?? "-",
    },
    {
      title: "도착시간",
      dataIndex: "endTime",
      key: "endTime",
      width: "100px",
      align: "center",
      editable: true,
      // render: (v) => v ?? "-",
    },
    {
      title: "구분",
      dataIndex: "category",
      key: "category",
      width: "88px",
      align: "center",
      editable: true,
      // render: (v) => v ?? "-",
    },
    {
      title: "장소",
      dataIndex: "context",
      key: "context",
      width: "300px",
      align: "center",
      editable: true,
      render: (v) => (
        <FlexBox h="24px">
          <FlexContainer>
            <FlexBox settings={{ justify: "center" }} style={{overflow: "hidden"}}>{v}</FlexBox>
          </FlexContainer>
        </FlexBox>
      ),
    },
  ];

  const collapsedColumn = [
    {
      title: "메모",
      dataIndex: "memo",
      key: "memo",
      width: "380px",
      align: "center",
      editable: true,
      // render: (v) => v ?? "-",
    },
    {
      title: "예산",
      dataIndex: "price",
      key: "price",
      width: "200px",
      align: "center",
      editable: true,
      // render: (v) => v ?? "-",
    },
    {
      title: "링크",
      dataIndex: "link",
      key: "link",
      width: "64px",
      align: "center",
      render: (v) =>
        v ? (
          <IconButton
            width="32px"
            height="24px"
            fontSize="16px"
            onClickEvent={() => {
              window.open(v, "_blank");
            }}
          >
            <ExportOutlined />
          </IconButton>
        ) : null, // 아이콘버튼 => 클릭 시 데이터의 링크로 이동
      editable: true,
    },
  ];

  const deleteColumn = {
    title: "삭제",
    dataIndex: "delete",
    key: "delete",
    width: "52px",
    align: "center",
    render: (v) => (
      <IconButton
        width="24px"
        height="24px"
        fontSize="16px"
        danger
        onClickEvent={() => {
          // 행 삭제 이벤트 연결

        }}
      >
        <CloseSquareOutlined />
      </IconButton>
    ), // 아이콘버튼 => 클릭 시 행 삭제
    editable: true,
  };

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = schedules.findIndex((s) => s.tripScheduleId === active.id);
    const newIdx = schedules.findIndex((s) => s.tripScheduleId === over.id);

    const updateData = arrayMove(schedules, oldIdx, newIdx);
    updateData.map((schedule, idx) => {
      schedule.indexSort = idx + 1;
    });
    // console.log(updateData);
    onSchedulesChange?.(updateData);
  };

  return (
    <DndContext
      id={`schedule-dnd-${dayId}`}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={schedules.map((s) => s.tripScheduleId)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          rowKey="tripScheduleId"
          showHeader={false}
          columns={
            isExpanded
              ? [...columns, ...collapsedColumn, deleteColumn]
              : [...columns, deleteColumn]
          }
          dataSource={schedules}
          pagination={false}
          size="small"
          components={{
            body: {
              row: (props) => (
                <SortableScheduleItem
                  rowKey={props["data-row-key"]}
                  {...props}
                />
              ),
            },
          }}
        />
      </SortableContext>
    </DndContext>
  );
};

export default DayItemTable;
