import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { usePlanDays } from "./PlanDaysContext";

/** === 스케줄 편집 ================================
 * EditScheduleContext 구독 컴포넌트 목록
 * - SortableScheduleItem
 * - AddScheduleButton
 =============================================== */

const EditScheduleContext = createContext(null);

export const EditScheduleProvider = ({ children }) => {
  const { setPlanDays } = usePlanDays();

  // 스케줄 삭제
  const isDeleteRef = useRef(false);
  // 북마크 삭제
  const isDeleteBookmarkRef = useRef(false);
  // 편집 포커스 스케줄
  const focusRef = useRef(null);

  // 편집 중인 스케줄
  const [editingSchedule, setEditingSchedule] = useState(null);
  // 스케줄 카테고리(구분)
  const [scheduleCategorys, setScheduleCategorys] = useState([]);

  /**
   * 스케줄 추가
   * @param {String} dayId 스케줄을 추가할 일자 ID
   * @param {{  }} addData 스케줄 추가 API 호출 후 반환된 데이터
   */
  const addSchedule = useCallback((dayId, addData) => {
    setPlanDays((prev) =>
      prev.map((day) =>  (
          day.tripDayId === dayId ? 
          { ...day, schedules: [...day.schedules, addData] } 
          : day
        )
      ),
    );
    
    // 신규 스케줄 편집 모드
    setEditingSchedule(addData);
  }, []);

  /**
   * 스케줄 삭제
   * @param {String} scheduleId 삭제할 스케줄 ID
   */
  const deleteSchedule = useCallback((scheduleId) => {
    setPlanDays((prev) =>
      prev.map((day) => ({
          ...day,
          schedules: day.schedules.filter((s) => s.tripScheduleId !== scheduleId)
      }))
    );
        
    // 편집 중이던 스케줄 삭제 시 처리
    if (editingSchedule && editingSchedule.tripScheduleId === scheduleId) {
      setEditingSchedule(null);
      focusRef.current = null;
    }
  }, [editingSchedule]);

  /**
   * 스케줄 편집 사항 반영
   */
  const saveSchedule = useCallback(() => {
    setPlanDays((prev) =>
      prev.map((day) => ({
          ...day,
          schedules: day.schedules.map((schedule) => (
            schedule.tripScheduleId === editingSchedule.tripScheduleId ? 
            editingSchedule : schedule
          ))
      }))
    );

    // 편집 저장 완료 후 선택된 편집 스케줄 비우기
    setEditingSchedule(null);
    focusRef.current = null;
  }, [editingSchedule]);

  /**
   * 북마크에 스케줄 연결
   * @param {String} scheduleId 
   * @param {String} bookmarkId 
   * @param {String} context 
   */
  const setBookmarkInSchedule = useCallback((scheduleId, bookmarkId, context, link) => {
    console.log(bookmarkId);
    console.log(context);
    console.log(link);
    setPlanDays((prev) =>
      prev.map((day) => ({
        ...day,
        schedules: day.schedules.map((s) =>
          s.tripScheduleId === scheduleId ? { ...s, bookmarkId: bookmarkId, context: context || s.context, link: link || s.link } : s
      )}))
    );
  }, []);

  const editScheduleValue = useMemo(() => ({
    editingSchedule, setEditingSchedule,
    scheduleCategorys, setScheduleCategorys,
    isDeleteRef, isDeleteBookmarkRef, focusRef,
    addSchedule, deleteSchedule, saveSchedule, setBookmarkInSchedule, 
  }), [editingSchedule, scheduleCategorys, isDeleteRef, isDeleteBookmarkRef, focusRef]);
  
  return (
    <EditScheduleContext.Provider value={ editScheduleValue }>
      {children}
    </EditScheduleContext.Provider>
  )
}

export const useEditSchedule = () => {
  const context = useContext(EditScheduleContext);
  if (!context) throw new Error("useEditSchedule must be used within EditScheduleContext");
  return context;
}