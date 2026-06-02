import { create } from 'zustand';
import usePlanDaysStore from "./usePlanDaysStore";
import { SCHEDULE_CATEGORYS } from "../../constants/scheduleCategory";

const useEditScheduleStore = create((set, get) => ({
  // 스케줄 삭제
  isDeleteRef: { current: false },
  // 북마크 삭제
  isDeleteBookmarkRef: { current: false },
  // 편집 포커스 스케줄
  focusRef: { current: null },

  // 편집 중인 스케줄
  editingSchedule: null,
  setEditingSchedule: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        editingSchedule: value(state.editingSchedule)
      }));
    } else {
      set({
        editingSchedule: value
      });
    }
  },

  // 스케줄 카테고리(구분)
  scheduleCategorys: SCHEDULE_CATEGORYS,
  setScheduleCategorys: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        scheduleCategorys: value(state.scheduleCategorys)
      }));
    } else {
      set({
        scheduleCategorys: value
      });
    }
  },

  /**
   * 스케줄 추가
   * @param {String} dayId 스케줄을 추가할 일자 ID
   * @param {{  }} addData 스케줄 추가 API 호출 후 반환된 데이터
   */
  addSchedule: (dayId, addData) => {
    const setPlanDays = usePlanDaysStore.getState().setPlanDays;

    setPlanDays((prev) =>
      prev.map((day) =>
        day.tripDayId === dayId ? 
          { ...day, schedules: [...day.schedules, addData] }
          : day
      )
    );
    // 신규 스케줄 편집 모드
    set({
      editingSchedule: addData
    });
  },


  /**
   * 스케줄 삭제
   * @param {String} scheduleId 삭제할 스케줄 ID
   */
  deleteSchedule: (scheduleId) => {
    const setPlanDays =
      usePlanDaysStore.getState().setPlanDays;

    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.filter((s) => s.tripScheduleId !== scheduleId)
      }))
    );

    // 편집 중이던 스케줄 삭제 시 처리
    const { editingSchedule, focusRef } = get();
    if ( editingSchedule && editingSchedule.tripScheduleId === scheduleId) {
      set({
        editingSchedule: null
      });
      focusRef.current = null;
    }
  },


  /**
   * 스케줄 편집 사항 반영
   */
  saveSchedule: () => {
    const setPlanDays =
      usePlanDaysStore.getState().setPlanDays;

    const { editingSchedule, focusRef } = get();
    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.map((schedule) =>
          schedule.tripScheduleId === editingSchedule.tripScheduleId ? 
            editingSchedule : schedule
        )
      }))
    );

    // 편집 저장 완료 후 선택된 편집 스케줄 비우기
    set({
      editingSchedule: null
    });
    focusRef.current = null;
  },


    /**
   * 북마크에 스케줄 연결
   * @param {String} scheduleId 
   * @param {String} bookmarkId 
   * @param {String} context 
   */
  setBookmarkInSchedule: (scheduleId, bookmarkId, context, link) => {
    const setPlanDays =
      usePlanDaysStore.getState().setPlanDays;

    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.map((s) =>
          s.tripScheduleId === scheduleId ? 
            { ...s, bookmarkId, context: context || s.context, link: link || s.link }
            : s
        )
      }))
    );
  }

}));

export default useEditScheduleStore;