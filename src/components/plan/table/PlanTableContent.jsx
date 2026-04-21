import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "antd";
import SortableDayItem from "./SortableDayItem";

// 더미 데이터 (indexSort 기준 정렬)
const DUMMY_DAYS = [
  {
    tripDayId: "TD11",
    indexSort: 1,
    schedules: [
      {
        tripScheduleId: "TS123",
        indexSort: 1,
        context: "있던 1일차 데이터 수정",
        startTime: "AM 10:00",
        endTime: "PM 01:00",
        category: "이동",
        memo: "메모 내용 존재",
        price: 50000,
        link: "https://www.naver.com"
      },
      { tripScheduleId: "TS124",indexSort: 2, startTime: "10:00", endTime: "13:00", category: "이동" },
      {
        tripScheduleId: "TS126",
        indexSort: 3,
        context: "데이터에 없는 장소 직접 입력",
        startTime: "14:00",
        endTime: "15:00",
        category: "식사",
        price: 3040,
        link: "https://www.daum.net"
      },
    ],
  },
  {
    tripDayId: "TD12",
    indexSort: 2,
    schedules: [
      { tripScheduleId: "TS129", indexSort: 2, context: "데이터" },
      { tripScheduleId: "TS135",indexSort: 1, context: "신규생성 2일차 데이터" },
    ],
  },
  {
    tripDayId: "TD13",
    indexSort: 4,
    schedules: [
      {
        tripScheduleId: "TS153",
        indexSort: 1,
        context: "있던 3일차 데이터 수정",
        startTime: "10:00",
        endTime: "13:00",
        category: "이동",
      },
    ],
  },
  {
    tripDayId: "TD18",
    indexSort: 5,
    schedules: [
      {
        tripScheduleId: "TS183",
        indexSort: 1,
        context: "5일차 데이터 수정",
        startTime: "10:00",
        endTime: "13:00",
        category: "이동",
      },
    ],
  },
  {
    tripDayId: "TD14",
    indexSort: 3,
    schedules: [{ tripScheduleId: "TS184", indexSort: 1, context: "ddd" }, { tripScheduleId: "TS186", indexSort: 2 }],
  },
].sort((a, b) => a.indexSort - b.indexSort);

const PlanTableContent = () => {
  const [arrDay, setArrDay] = useState(DUMMY_DAYS);

  // 일자 순서 변경
  const onDayDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setArrDay((prev) => {
      const oldIdx = prev.findIndex((d) => d.tripDayId === active.id);
      const newIdx = prev.findIndex((d) => d.tripDayId === over.id);

      const updateData = arrayMove(prev, oldIdx, newIdx);
      updateData.map((day, idx) => {
        day.indexSort = idx + 1;
      });
      console.log(updateData);
      return updateData;
    });
  };

  // 특정 일자의 스케줄 순서 변경
  const handleSchedulesChange = (tripDayId, newSchedules) => {
    setArrDay((prev) =>
      prev.map((d) =>
        d.tripDayId === tripDayId ? { ...d, schedules: newSchedules } : d,
      ),
    );
  };

  return (
    <DndContext
      id="plan-day-dnd"
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDayDragEnd}
    >
      <SortableContext
        items={arrDay.map((d) => d.tripDayId)}
        strategy={verticalListSortingStrategy}
      >
        <List
          style={{ width: "100%", height: "100%", backgroundColor: "none" }}
          dataSource={arrDay}
          renderItem={(day) => (
            <SortableDayItem
              key={day.tripDayId}
              itemKey={day.tripDayId}
              day={day}
              onSchedulesChange={handleSchedulesChange}
            />
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

export default PlanTableContent;
