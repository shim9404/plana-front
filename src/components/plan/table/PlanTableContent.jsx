import { useSortable } from "@dnd-kit/react/sortable";
import { FlexContainer } from "../../common/PLA_Containers";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/helpers";
import { DUMMY_DAYS } from "./PLAN_DUMMY";
import { Button, Input, Select, TimePicker } from "antd";
import { CloseCircleFilled, CloseSquareOutlined, HolderOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import { IconButton } from "../../common/PLA_Buttons";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";
import dayjs from "dayjs";

const ScheduleDroppableItem = ({ id, prevValue, onChange }) => {
  const {isDropTarget, ref} = useDroppable({id: 'droppable'});
  const {editingSchedule} = useTripPlan();

  return (
    <FlexBox ref={ref} style={{ border: isDropTarget ? "solid 1px red" : "none"}}>
      <FlexBox w="98%" h="80%" bg="#D9D9D9" settings={{justify: "center"}} 
        style={{borderRadius: "16px", padding: "8px", overflow: "hidden" }}>
          {
            editingSchedule && (editingSchedule.bookmarkId == null || editingSchedule.bookmarkId <= 0) ?
            <Input maxLength={20} value={editingSchedule[id]} placeholder={prevValue || "직접입력"} onChange={e => onChange(e.target.value)}
            style={{width:"100%", height:"auto", border: "none", padding:"0px", textAlign:"center", backgroundColor:"rgba(0,0,0,0)"}}
            /> 
            : <FlexBox>
                <TextBox h="auto" style={{paddingLeft: "16px"}} bg="none">
                  {editingSchedule[id] || "-"}
                </TextBox>
                <IconButton width="auto" height="auto" fontSize="12px" danger style={{margin: "0px", padding: "2px", border:"solid 1px rgba(255,255,255,0.75)"}}>
                  <CloseCircleFilled/>
                </IconButton>
              </FlexBox>
          }
      </FlexBox>
    </FlexBox>
  )
};

const ScheduleCategorySelector = ({ id, prevValue, onChange }) => {
  const {scheduleCategorys, setScheduleCategorys} = useTripPlan();
  const [inputValue, setInputValue] = useState("");
  const {editingSchedule} = useTripPlan();
  // const [value, setValue] = useState("");

  const addItem = () => {
    const existItem = scheduleCategorys.find(category => category == inputValue);
    console.log(inputValue, existItem);
    if (existItem) {
      onChange(inputValue);
      // setValue(inputValue);
      setInputValue("");
    } else {
      setScheduleCategorys(prev => [...prev, inputValue]);
      // setValue(inputValue);
      onChange(inputValue);
      setInputValue("");
    }
  }

  return (
  <Select options={scheduleCategorys.map((item) => {
    return {
        label: item,
        value: item
      }
    })}
    style={{height: "75%", width: "90%", textAlign:"center"}}
    placeholder={prevValue}
    value={editingSchedule[id]}
    onChange={v => onChange(v)}
    popupRender={menu => (
      <FlexBox w="100%" style={{overflow: "hidden"}} settings={{isVertical: true, align:"stretch"}}>
        {menu}
        <FlexBox settings={{isVertical: true}} style={{borderTop: "solid 1px #D9D9D9", padding: "4px 0px"}}>
          <Input
            placeholder="직접입력"
            value={inputValue}
            maxLength={6}
            style={{fontSize: "12px", textAlign: "center", padding:"4px 2px", borderRadius: "8px 8px 0px 0px"}}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={e => e.stopPropagation()}
          />
          <Button type="primary" height="24px" style={{ width:"100%", borderRadius: "0px 0px 8px 8px"}} onClick={addItem} >
            <FlexBox style={{gap: "4px"}}>
              <PlusOutlined style={{fontSize: "12px"}} />
              <TextBox color="#FFFFFF">추가</TextBox>
            </FlexBox>
          </Button>
        </FlexBox>
      </FlexBox>
    )}
  />)
}

const ScheduleMemoInput = ({ id, prevValue, onChange }) => {
  const {editingSchedule} = useTripPlan();
  const [inputValue, setInputValue] = useState(editingSchedule[id]);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  }

  return (
    <Input id={id} placeholder={prevValue} 
    value={inputValue}
    onChange={handleOnChange} 
    style={{height: "75%", width: "90%", textAlign:"center"}}/>
  )
};

const SchedulePriceInput = ({ id, prevValue, onChange }) => {
  const {editingSchedule} = useTripPlan();
  const [inputValue, setInputValue] = useState(editingSchedule[id]);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  }

  return (
    <Input id={id} placeholder={prevValue}
    value={inputValue}
    onChange={handleOnChange} 
    style={{height: "75%", width: "90%", textAlign:"center"}}/>
  )
};

const ScheduleTimePicker = ({ prevValue, onChange }) => {
  useEffect(()=>{
  console.log(prevValue);

  },[])
  return (
    <TimePicker
      format={"HH:mm"}
      defaultValue={dayjs(prevValue, 'HH:mm')}
      minuteStep={5}
      showNow={false}
      placeholder={prevValue}
      onChange={(date, time) => onChange(time)}
      style={{ height: "75%", width: "90%", textAlign: "center" }}
    />
  );
};

const ScheduleEditableItem = ({ columnId, value, isEditing, onClick, onChange, ...rest }) => {
  
  const editInput = () => {
    switch (columnId) {
      case "startTime" :
      case "endTime" :
        return <ScheduleTimePicker id={columnId} prevValue={value} onChange={v => onChange(columnId, v)}/>
      case "category" :
        return <ScheduleCategorySelector id={columnId} prevValue={value} onChange={v => {console.log(columnId, v); onChange(columnId, v)}}/>;
      case "context": 
        return <ScheduleDroppableItem id={columnId} prevValue={value} onChange={v => onChange(columnId, v)}/>;
      case "memo": 
        return <ScheduleMemoInput id={columnId} prevValue={value} onChange={v => onChange(columnId, v)}/>
      case "price":
        return <SchedulePriceInput id={columnId} prevValue={value} onChange={v => onChange(columnId, v)}/>
    }
  }
  return (
    <FlexBox {...rest} settings={{justify:"center"}}>
      {
        isEditing ?
          editInput()
        :
        <TextBox h="75%" color="#565656" style={{backgroundColor: "none"}}
        onClick={onClick}>
          {value}
        </TextBox>
      }
    </FlexBox>
  );
};

const SortableScheduleItem = ({ id, index, schedule, isOnly, editScheduleEvent, deleteScheduleEvent }) => {
  const { ref, handleRef, isDragging } = useSortable({ id, index, type: "item" });
  const { isExpanded, editingSchedule, setEditingSchedule, setPlanDays } = useTripPlan();
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectEditing = () => {
    console.log(editingSchedule);
    if (editingSchedule && editingSchedule.tripScheduleId !== schedule.tripScheduleId) {
      editScheduleEvent?.();
    }
    // TODO: 저장 후 성공 시 편집 시작
    setEditingSchedule({...schedule});
    // console.log(schedule);
  };

  const handleChangeEditing = (key, value) => {
    setEditingSchedule(prev => {
      const schedule = {...prev}
      schedule[key] = value;
      console.log(schedule);
      return schedule;
    });
  };

  useEffect(() => {
    setIsEditing(schedule.tripScheduleId === editingSchedule?.tripScheduleId);
    // console.log(editingSchedule);
  }, [editingSchedule?.tripScheduleId])

  return (
    <FlexBox
      ref={ref} 
      id="schedule-item"
      h="32px"
      style={{ borderBottom: "solid 1px #F4F4F4", opacity: isDragging ? 0.75 : 1 }}
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
          <ScheduleEditableItem isEditing={isEditing} columnId="startTime" onChange={handleChangeEditing} onClick={handleSelectEditing} w="092px" bg="none" value={schedule.startTime || "00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} columnId="endTime"   onChange={handleChangeEditing} onClick={handleSelectEditing} w="092px" bg="none" value={schedule.endTime || "00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} columnId="category"  onChange={handleChangeEditing} onClick={handleSelectEditing} w="108px" bg="none" value={schedule.category}/>
          <ScheduleEditableItem isEditing={isEditing} columnId="context"   onChange={handleChangeEditing} onClick={handleSelectEditing} w="280px" bg="none" value={schedule.context || "-"}/>
          {/* <FlexBox w="280px" >
            <ScheduleDroppableItem  value={schedule.context || "-"}/>
          </FlexBox> */}
        </FlexBox>
        {
          isExpanded ? 
          <FlexBox w="auto" settings={{justify: "flex-start"}}>
            <ScheduleEditableItem isEditing={isEditing} columnId="memo"  onChange={handleChangeEditing} onClick={handleSelectEditing} w="380px" bg="none" value={schedule.memo || "(메모 없음)"}/>
            <ScheduleEditableItem isEditing={isEditing} columnId="price" onChange={handleChangeEditing} onClick={handleSelectEditing} w="160px" bg="none" value={schedule.price || "0"}/>
            <FlexBox w="100px" settings={{justify: "center"}}>
              <IconButton
                width="32px"
                height="28px"
                fontSize="12px"
                disabled={isOnly ? true : false}
                ghost={isHover ? false : true}
                style={{visibility: schedule.link?.length > 0 ? "visible" : "hidden"}}
                onClickEvent={() => {
                  // 행 삭제 이벤트 연결
                  window.open(schedule.link, "_blank");
                }}
              >
                <LinkOutlined />
              </IconButton>
            </FlexBox>  
          </FlexBox> : <></>
        }
          
        <FlexBox w="36px" settings={{justify: "center"}}>
          <IconButton
            width="32px"
            height="28px"
            fontSize="12px"
            disabled={isOnly ? true : false}
            ghost={isHover ? false : true}
            danger
            onClickEvent={() => {
              // 행 삭제 이벤트 연결
              deleteScheduleEvent?.(id);
            }}
          >
            <CloseSquareOutlined />
          </IconButton>
        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  );
};

const SortableDayItem = ({ id, index, schedules, editScheduleEvent, addScheduleEvent, deleteScheduleEvent }) => {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    type: "list",
    accept: ["list"],
  });

  const {editingSchedule} = useTripPlan();

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
                editScheduleEvent={() => editScheduleEvent()}
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

const PlanTableContent = () => {
  const {planDays, setPlanDays, editingSchedule, setEditingSchedule} = useTripPlan();
  // const [days, setDays] = useState(DUMMY_DAYS);   // 
  // const [editingId, setEditingId] = useState(""); 

  useEffect(() => {
    // 초기 데이터 설정
    setPlanDays(DUMMY_DAYS);
  }, [])

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

    setPlanDays((prev) => {
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

  /**
   * 스케줄 추가
   * @param {String} dayId 스케줄을 추가할 일자 ID
   */
  const handleAddSchedule = (dayId) => {
    const schedules = planDays.find(d => d.tripDayId === dayId).schedules;
    const addIndex = schedules.length + 1;
    // TODO: 스케줄 생성 API 연결
    // 성공 시 response를 addData에 담아 아래 코드 실행
    const addData = {
      tripScheduleId: `TS${new Date()}`,    // 테스트용 중복방지 KEY
      indexSort: addIndex,
      context: "새 스케줄",
      startTime: "00:00",
      endTime: "00:00",
      category: "숙박",
      memo: "메모",
      price: 0,
      link: ""
    }
    const newSchedules = [...schedules, addData];
    setPlanDays((prev) => prev.map((d) => d.tripDayId === dayId ? {...d, schedules: newSchedules} : d))

    // 신규 스케줄 편집 모드
    setEditingSchedule(addData);
    // 실패 시 실패 안내 메세지 혹은 오류 팝업 출력
  }

  /**
   * 스케줄 삭제
   * @param {String} dayId 삭제할 스케줄이 포함된 일자 ID
   * @param {String} scheduleId 삭제할 스케줄 ID
   */
  const handleDeleteSchedule = (dayId, scheduleId) => {
    // TODO: 스케줄 삭제 API 연결
    // 성공 시 아래 코드 실행
    const schedules = planDays.find(d => d.tripDayId === dayId).schedules;
    const newSchedules = schedules.filter(item => item.tripScheduleId !== scheduleId);
    setPlanDays((prev) => prev.map((d) => d.tripDayId === dayId ? {...d, schedules: newSchedules} : d))
    
    // 편집 중이던 스케줄 삭제 시 처리
    if (editingSchedule.tripScheduleId === scheduleId) {
      setEditingSchedule(null);
    }
    // 실패 시 실패 안내 메세지 혹은 오류 팝업 출력
  };

  const handleEditSchedule = () => {
    const dayId = planDays.find((item) => item.schedules.find(sItem => sItem.tripScheduleId === editingSchedule.tripScheduleId)).tripDayId;
    console.log(dayId);
    const schedules = planDays.find(d => d.tripDayId === dayId).schedules;
    const newSchedules = schedules.map((item) => item.tripScheduleId === editingSchedule.tripScheduleId ? editingSchedule : item )
    setPlanDays((prev) => prev.map((d) => d.tripDayId === dayId ? {...d, schedules : newSchedules} : d));

    // 편집 저장 완료 후 선택된 편집 스케줄 비우기
    setEditingSchedule(null);
  }

  return (
    <DragDropProvider
      onDragOver={handleMove} // 드래그 중 실시간 미리보기
      onDragEnd={handleMove} // 드롭 시 최종 반영
    >
      <FlexBox settings={{ isVertical: true }} style={{ gap: "8px" }}>
        {planDays?.map((day, index) => {
          return (
            <SortableDayItem
              key={day.tripDayId}
              id={day.tripDayId}
              index={index}
              schedules={day.schedules}
              editScheduleEvent={handleEditSchedule}
              addScheduleEvent={handleAddSchedule}
              deleteScheduleEvent={handleDeleteSchedule}
            />
          );
        })}
      </FlexBox>
    </DragDropProvider>
  );
}

export default PlanTableContent;
