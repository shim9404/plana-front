import { FlexBox } from "../../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { DUMMY_DAYS } from "./PLAN_DUMMY";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";
import SortableDayItem from "./SortableDayItem";

const PlanTableContent = () => {
  const { planDays, setPlanDays } = useTripPlan();
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    // 초기 데이터 설정
    setPlanDays(DUMMY_DAYS);
  }, []);

  useEffect(() => {
    console.log("editingSchedule ", editingSchedule);
  }, [editingSchedule]);

  /**
   * 스케줄 추가
   * @param {String} dayId 스케줄을 추가할 일자 ID
   */
  const handleAddSchedule = (dayId) => {
    const schedules = planDays.find((d) => d.tripDayId === dayId).schedules;
    const addIndex = schedules.length + 1;
    // TODO: 스케줄 생성 API 연결
    // 성공 시 response를 addData에 담아 아래 코드 실행
    const addData = {
      tripScheduleId: `TS${new Date()}`, // 테스트용 중복방지 KEY
      indexSort: addIndex,
      context: "새 스케줄",
      startTime: "00:00",
      endTime: "00:00",
      category: "숙박",
      memo: "메모",
      price: 0,
      link: "",
    };
    const newSchedules = [...schedules, addData];
    setPlanDays((prev) =>
      prev.map((d) =>
        d.tripDayId === dayId ? { ...d, schedules: newSchedules } : d,
      ),
    );

    // 신규 스케줄 편집 모드
    setEditingSchedule(addData);
    // 실패 시 실패 안내 메세지 혹은 오류 팝업 출력
  };

  /**
   * 스케줄 삭제
   * @param {String} dayId 삭제할 스케줄이 포함된 일자 ID
   * @param {String} scheduleId 삭제할 스케줄 ID
   */
  const handleDeleteSchedule = (dayId, scheduleId) => {
    // TODO: 스케줄 삭제 API 연결
    // 성공 시 아래 코드 실행
    const schedules = planDays.find((d) => d.tripDayId === dayId).schedules;
    const newSchedules = schedules.filter(
      (item) => item.tripScheduleId !== scheduleId,
    );
    setPlanDays((prev) =>
      prev.map((d) =>
        d.tripDayId === dayId ? { ...d, schedules: newSchedules } : d,
      ),
    );

    // 편집 중이던 스케줄 삭제 시 처리
    if (editingSchedule && editingSchedule.tripScheduleId === scheduleId) {
      setEditingSchedule(null);
    }
    // 실패 시 실패 안내 메세지 혹은 오류 팝업 출력
  };

  /**
   * 스케줄 편집 사항 반영
   */
  const handleSaveSchedule = () => {
    const dayId = planDays.find((item) =>
      item.schedules.find(
        (sItem) => sItem.tripScheduleId === editingSchedule.tripScheduleId,
      ),
    ).tripDayId;
    const schedules = planDays.find((d) => d.tripDayId === dayId).schedules;
    const newSchedules = schedules.map((item) =>
      item.tripScheduleId === editingSchedule.tripScheduleId
        ? editingSchedule
        : item,
    );
    setPlanDays((prev) =>
      prev.map((d) =>
        d.tripDayId === dayId ? { ...d, schedules: newSchedules } : d,
      ),
    );

    // 편집 저장 완료 후 선택된 편집 스케줄 비우기
    setEditingSchedule(null);
  };

  return (
    // <DragDropProvider
    //   onDragOver={handleMove} // 드래그 중 실시간 미리보기
    //   onDragEnd={handleMove} // 드롭 시 최종 반영
    // >
    <FlexBox settings={{ isVertical: true }} style={{ gap: "8px" }}>
      {planDays?.map((day, index) => {
        return (
          <SortableDayItem
            key={day.tripDayId}
            id={day.tripDayId}
            index={index}
            schedules={day.schedules}
            editingSchedule={editingSchedule}
            setEditingSchedule={setEditingSchedule}
            /* changeBookmark={handleChangeScheduleBookmark} */
            saveScheduleEvent={handleSaveSchedule}
            addScheduleEvent={handleAddSchedule}
            deleteScheduleEvent={handleDeleteSchedule}
          />
        );
      })}
    </FlexBox>
    // </DragDropProvider>
  );
};

export default PlanTableContent;
