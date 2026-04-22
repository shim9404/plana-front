import { useContext, useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Form, Table } from "antd";
import { SortableScheduleItem } from "./SortableScheduleItem";
import { DragHandle } from "./DragHandle";
import {
  CloseSquareOutlined,
  ExportOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { IconButton } from "../../common/PLA_Buttons";
import { FlexBox } from "../../common/PLA_FlexBox";
import { EditableCell } from "./EditableCell";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";

/**
 * DAY 리스트 내부에 존재하는 SCHEDULE 단위의 테이블 역할
 * @param {} param0
 * @returns
 */
const DayItemTable = ({ dayId, schedules, onSchedulesChange }) => {
  const { isExpanded } = useTripPlan();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.tripScheduleId === editingKey;

  //#region Editing functions
  // 행 편집 시작 - 클릭한 행의 데이터를 Form에 세팅
  const startEdit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.tripScheduleId);
  };

  // 편집 저장 - Form 값을 schedules에 반영
  const save = async (tripScheduleId) => {
    try {
      const values = await form.validateFields();
      const newSchedules = schedules.map((s) =>
        s.tripScheduleId === tripScheduleId ? { ...s, ...values } : s
      );
      onSchedulesChange?.(newSchedules);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
//#endregion

  //#region Table Columns
  // 기본 컬럼
  const defaultColumns = [
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
      // render: (v) => (
      //   <FlexBox h="24px">
      //     <FlexContainer>
      //       <FlexBox settings={{ justify: "center" }} style={{overflow: "hidden"}}>{v}</FlexBox>
      //     </FlexContainer>
      //   </FlexBox>
      // ),
    },
  ];

  // 계획표 확장 시 추가 컬럼
  const collapsedColumns = [
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
    },
  ];

  // 삭제 버튼 컬럼
  const deleteColumn = {
    title: "삭제",
    dataIndex: "delete",
    key: "delete",
    width: "52px",
    align: "center",
    render: (v, record) => (
      <IconButton
        width="24px"
        height="24px"
        fontSize="16px"
        danger
        onClickEvent={() => {
          // 행 삭제 이벤트 연결
          handleDelete(record.tripScheduleId)
        }}
      >
        <CloseSquareOutlined />
      </IconButton>
    ), // 아이콘버튼 => 클릭 시 행 삭제
  };
  
  // 최종 적용을 위해 가공된 테이블 컬럼
  const tableColumns = isExpanded ? 
  [...defaultColumns, ...collapsedColumns, deleteColumn].map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        // 셀 클릭 시 해당 행 편집 모드 진입
        onClick: () => {
          if (!isEditing(record)) {
            startEdit(record)
          };
        },
      }),
    };
  }) : [...defaultColumns, deleteColumn].map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        // 셀 클릭 시 해당 행 편집 모드 진입
        onClick: () => {
          if (!isEditing(record)) {
            startEdit(record)
          };
        },
      }),
    };
  });
//#endregion

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = schedules.findIndex((s) => s.tripScheduleId === active.id);
    const newIdx = schedules.findIndex((s) => s.tripScheduleId === over.id);

    const updateData = arrayMove(schedules, oldIdx, newIdx);
    updateData.map((schedule, idx) => {
      schedule.indexSort = idx + 1;
    });
    // console.log(updateData);
    // TODO: 스케줄 순서 변경 API 연결
    onSchedulesChange?.(updateData);
  };

  const handleDelete = (tripScheduleId) => {
    if (schedules.length <= 1) {
      console.log("스케줄을 모두 삭제할 수 없음");
      return;
    }
    // TODO: 스케줄 삭제 API 연결
    const newData = schedules.filter(item => item.tripScheduleId !== tripScheduleId);
    onSchedulesChange?.(newData);
  };

  const handleAddSchedule = () => {
    const addData = {
      tripScheduleId: `TS${new Date()}`,    // 테스트용 중복방지 KEY
      indexSort: schedules.length + 1,
      context: "새 스케줄",
      startTime: "AM 00:00",
      endTime: "PM 00:00",
      category: "카테고리",
      memo: "메모",
      price: 0,
      link: ""
    }
    const newData = [...schedules, addData];
    // TODO: 스케줄 생성 API 연결
    onSchedulesChange?.(newData);
  }

  return (
    <FlexBox settings={{isVertical: true}}>
      <Form form={form} component={false}>
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
                tableColumns
                // isExpanded
                //   ? [...columns, ...collapsedColumns, deleteColumn]
                //   : [...columns, deleteColumn]
              }
              dataSource={schedules}
              pagination={false}
              size="small"
              // 편집 중인 행 외부 클릭 시 저장
              onRow={(record) => ({
                onBlur: () => {
                  if (isEditing(record)) save(record.tripScheduleId);
                },
              })}
              components={{
                body: {
                  row: (props) => (
                    <SortableScheduleItem
                      rowKey={props["data-row-key"]}
                      {...props}
                    />
                  ),
                  cell: EditableCell,  // cell 컴포넌트 추가
                },
              }}
            />
          </SortableContext>
        </DndContext>
      </Form>
      {/* ADD BUTTON */}
      <FlexBox h="28px" settings={{justify: "center"}}>
        <Button style={{width:"98%", height: "24px", padding: "0px", overflow: "hidden"}}
        onClick={handleAddSchedule}>
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
  );
};

export default DayItemTable;
