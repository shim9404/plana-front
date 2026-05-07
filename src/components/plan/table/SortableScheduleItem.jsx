import { useSortable } from "@dnd-kit/react/sortable";
import { useDroppable } from "@dnd-kit/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, InputNumber, Select, TimePicker } from "antd";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { IconButton } from "../../common/PLA_Buttons";
import { CloseCircleFilled, CloseSquareOutlined, HolderOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getBookmarkActiveColor, getBookmarkColor } from "../../../utils/plan/bookmarkUtils";
import { deleteScheduleApi, editScheduleApi } from "../../../services/tripApi";
import { usePlanBookmark } from "../../../hooks/trip/PlanBookmarkContext";
import { useEditSchedule } from "../../../hooks/trip/EditScheduleContext";
import { usePlanUI } from "../../../hooks/trip/PlanUIContext";
import { useTripInfo } from "../../../hooks/trip/TripInfoContext";
import { DebounceInput, DebounceInputNumber } from "../../common/PLA_Input";

const ScheduleDroppableItem = ({ scheduleId, bookmarkId, value, isEditing, onChange, onClick, deleteBookmarkEvent }) => {
  const { isDropTarget, ref } = useDroppable({id: scheduleId, accept: ["bookmark"]});
  const { bookmarks } = usePlanBookmark();
  const [defaultValue, setDefaultValue] = useState(value);
  const [isHover, setIsHover] = useState(false);

  const getBookmarkType = () => {
    return bookmarks.find(b => b.bookmarkId === bookmarkId).bookmarkType;
  }

  useEffect(() => {
    if (isEditing) {
      setDefaultValue(value);
    }
  }, [isEditing]);

  return (
    <FlexBox ref={ref} bg="none">
      <FlexBox w="98%" h="80%" bg={bookmarkId ? `${getBookmarkColor(getBookmarkType())}` : "#d9d9d9"} settings={{justify: "center"}} 
        style={{borderRadius: "16px", padding: "8px", overflow: "hidden",
          border: isHover || isEditing || isDropTarget ? `solid 1px ${bookmarkId ? getBookmarkActiveColor(getBookmarkType()) : "#A8A8A8"}`: "none"
        }}
        onClick={onClick}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
          { 
            (bookmarkId == null || bookmarkId <= 0) ? 
            isEditing ?
            <DebounceInput maxLength={20} placeholder={value || "직접 입력"} defaultValue={defaultValue} onChangeEvent={(v) => { onChange('context', v); }}
            style={{width:"100%", height:"auto", border: "none", padding:"0px", textAlign:"center", backgroundColor:"rgba(0,0,0,0)"}}
            /> : <TextBox size="12px" color="#565656">{value}</TextBox>
            : <FlexBox>
                <TextBox h="auto" style={{paddingLeft: "16px"}} color={ `${getBookmarkActiveColor(getBookmarkType())}` } bg="none">
                  {value || "-"}
                </TextBox>
                <IconButton width="auto" height="auto" fontSize="12px" danger 
                style={{ 
                  margin: "0px", padding: "2px", 
                  border:"solid 1px rgba(255,255,255,0.75)",
                  visibility:  isHover ? "visible" : "hidden"
                }}
                onClick={deleteBookmarkEvent}
                >
                  <CloseCircleFilled style={{}}/>
                </IconButton>
              </FlexBox>
          }
      </FlexBox>
    </FlexBox>
  )
};

const ScheduleTimePicker = ({ prevValue, onChange, containerRef }) => {
  return (
    <TimePicker
      format={"HH:mm"}
      defaultValue={dayjs(prevValue, 'HH:mm')}
      minuteStep={5}
      showNow={false}
      placeholder={prevValue}
      onChange={(date, time) => onChange(time)}
      style={{ height: "75%", width: "90%", textAlign: "center" }}
      onOk={(date) => {
        // confirm 후 포커스를 컴포넌트로 복구
        containerRef?.current?.focus();
      }}
    />
  );
};

const ScheduleCategorySelector = ({ prevValue, onChange, containerRef }) => {
  const { scheduleCategorys, setScheduleCategorys } = useEditSchedule();
  const [selectValue, setSelectValue] = useState(prevValue);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  const addItem = () => {
    if (!inputValue || inputValue.trim().length == 0) {
      setInputValue("");
      return;
    }
    const existItem = scheduleCategorys.find(category => category == inputValue);
    console.log(inputValue, existItem);
    if (!existItem) {
      setScheduleCategorys(prev => [...prev, inputValue]);
    }
    selectItem(inputValue);
    containerRef?.current?.focus();
  }

  const selectItem = (item) => {
    onChange(item); 
    setSelectValue(item);
    setIsOpen(false);
    setInputValue("");
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
      value={selectValue || ""}
      open={isOpen}                     // 열림 상태 제어
      onOpenChange={setIsOpen}  // 외부 클릭 등으로 닫힐 때 동기화
      onChange={v => {
        selectItem(v);
      }}
      popupRender={menu => (
        <FlexBox w="100%" style={{overflow: "hidden"}} settings={{isVertical: true, align:"stretch"}}>
          {menu}
          <FlexBox settings={{isVertical: true}} style={{borderTop: "solid 1px #D9D9D9", padding: "4px 0px"}}>
            <Input
              placeholder="직접 입력"
              value={inputValue}
              maxLength={6}
              style={{fontSize: "12px", textAlign: "center", padding:"4px 2px", borderRadius: "8px 8px 0px 0px"}}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={e => {
                e.stopPropagation();
                if (e.key === "Enter") addItem();
              }}
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
    />
  );
}

const ScheduleMemoInput = ({ id, prevValue, onChange }) => {
  
  return (
    <DebounceInput 
    id={id} 
    placeholder={prevValue} 
    defaultValue={prevValue}
    maxLength={30}
    onChangeEvent={(v) => { onChange(v); }}
    style={{height: "75%", width: "90%", textAlign:"center"}}/>
  )
};

const SchedulePriceInput = ({ id, prevValue, onChange }) => {

  return (
    <DebounceInputNumber 
    id={id} 
    placeholder={prevValue}
    defaultValue={prevValue}
    min={0} max={999999999} step={100}
    onChangeEvent={(v) => { onChange(v); }}
    style={{height: "75%", width: "90%", textAlign:"center"}}/>
  )
};

const ScheduleEditableItem = ({ columnId, value, isEditing, onClick, onChange, ...rest }) => {
  
  const editInput = () => {
    switch (columnId) {
      case "startTime" :
      case "endTime" :
        return <ScheduleTimePicker id={columnId} prevValue={value} containerRef={rest.containerRef} onChange={v => onChange(columnId, v)}/>
      case "category" :
        return <ScheduleCategorySelector id={columnId} prevValue={value} containerRef={rest.containerRef} onChange={v => {console.log(columnId, v); onChange(columnId, v)}}/>;
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
          {value || " "}
        </TextBox>
      }
    </FlexBox>
  );
};

const SortableScheduleItem = ({ id, dayId, scheduleId, index, schedule, isOnly, }) => {
  const { ref: sortableRef, handleRef, isDragging } = useSortable({ id: scheduleId, index, type: "item" });
  const itemRef = useRef(null);
  const { tripId } = useTripInfo();
  const { isExpandTable } = usePlanUI();
  const { isDeleteRef, isDeleteBookmarkRef, editingSchedule, setEditingSchedule, focusRef, saveSchedule, deleteSchedule, setBookmarkInSchedule } = useEditSchedule();
  const { setLinkedCountBookmark } = usePlanBookmark();
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 다중 ref 사용 시 merge util (*추후 utils 폴더로 이동 필요)
  const mergeRefs = (...refs) => (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);  // 함수형 ref면 호출
      else if (ref) ref.current = node;          // 객체형 ref면 current에 할당
    });
  };

  /**
   * 편집할 스케줄 선택 시 실행
   */
  const handleSelectEditing = () => {
    console.log("SELECT");
    setTimeout(() => {
      // 북마크 삭제 버튼으로 편집 스케줄 선택 판단된 경우 예외 처리
      if (isDeleteRef.current) {
        isDeleteRef.current = false;
        return;
      }

      // 북마크 삭제 버튼으로 편집 스케줄 선택 판단된 경우 예외 처리 (포커스 재설정은 Blur에서 처리)
      if (isDeleteBookmarkRef.current) {
        console.log("SelectEdit 에서 isDeleteBookmark");
        isDeleteBookmarkRef.current = false;
        return;
      }

      // 선택된 스케줄이 없는 경우 즉시 편집
      if (!editingSchedule) {
        setEditingSchedule({...schedule});
        return;
      }

      // 선택되어 있던 스케줄과 선택 하려는 스케줄이 동일하지 않음
      // if (editingSchedule.tripScheduleId !== schedule.tripScheduleId) {
      //   // 이전 스케줄 저장
      //   handleSaveSchedule(() => {
      //     // 저장 성공 시 선택 하려는 스케줄의 편집 시작
      //     setEditingSchedule({...schedule});
      //   });
      //   return;
      // }
    }, 150);
  };

  /**
   * 편집 중인 스케줄의 값 변경 연결 이벤트
   * @param {String} key 
   * @param {String} value 
   */
  const handleChangeEditing = (key, value) => {
    setEditingSchedule(prev => {
      const schedule = {...prev}
      schedule[key] = value;
      console.log(schedule);
      return schedule;
    });
  };

  /**
   * 스케줄 저장
   */
  const handleSaveSchedule = (savedCallback) => {
    requestUpdateSchedule(() => {
      saveSchedule?.(editingSchedule);
      savedCallback?.();
    })
  }

  /**
   * 북마크 삭제
   */
  const handleDeleteBookmarkEvent = () => {
    isDeleteBookmarkRef.current = true;
    requestUnlinkBookmark((bookmarkId) => {
      setBookmarkInSchedule(scheduleId);
      setLinkedCountBookmark(bookmarkId, -1);
    });

    // 편집 중인 스케줄의 북마크를 삭제한 경우 editingSchedule 갱신
    if (editingSchedule && editingSchedule.tripScheduleId == scheduleId) {
      handleChangeEditing("bookmarkId", null);
    }
  }
  
  /**
   * 스케줄 삭제
   */
  const handleDeleteSchedule = () => {
    isDeleteRef.current = true;  // 삭제 전 플래그 설정
    requestDeleteSchedule(() => {
      deleteSchedule?.(scheduleId);
      if (schedule?.bookmarkId) setLinkedCountBookmark(schedule.bookmarkId, -1); // 북마크 연결 수 감소 처리
    })
  }

  /**
   * Focus out : 스케줄 편집 완료
   * @param {*} e 
   */
  const handleBlur = (e) => {
    console.log("BLUR");
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      // 북마크 삭제 버튼으로 Blur 판단된 경우 경우 포커스 유지
      if (isDeleteBookmarkRef.current) {
        console.log("BLUR에서 isDeleteBookmark");
        focusRef?.current?.focus();
        return;
      }
      // 스케줄 삭제 버튼으로 Blur 판단된 경우 경우 포커스 유지
      if (isDeleteRef.current) {
        focusRef?.current?.focus();
        isDeleteRef.current = false;
        return;
      }

      const active = document.activeElement;

      // 1. 현재 컴포넌트 내부로 포커스 이동 시 유지
      if (currentTarget.contains(active)) return;

      // 2. antd 포털 영역으로 포커스 이동 시 유지
      //    (Select, TimePicker 드롭다운 등)
      const antdPopups = [
        ".ant-select-dropdown",
        ".ant-picker-dropdown",
        ".ant-picker-panel-container",
        ".ant-picker-footer",      // TimePicker 하단 confirm 버튼 영역
        ".ant-picker-ok",          // confirm 버튼
        ".ant-select-item",
      ];
      const isAntdPopup = antdPopups.some((selector) =>
        active?.closest(selector)
      );
      if (isAntdPopup) return;
      
      const isOtherScheduleItem = active?.closest("#schedule-item");
      if (isOtherScheduleItem) return;  // 별도로 저장 처리를 하고 있음
        handleSaveSchedule();
        // saveSchedule?.();
    }, 150);
  };

  /**
   * 스케줄 삭제 API 요청
   * @param {*} successCallback 
   */
  const requestDeleteSchedule = async(successCallback) => {
    try {
      const isSuccess = await deleteScheduleApi(tripId, dayId, scheduleId);
      console.log("requestDeleteSchedule", isSuccess);
      if (isSuccess) {
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 스케줄 수정 API 요청
   * @param {*} successCallback 
   */
  const requestUpdateSchedule = async(successCallback) => {
    try {
      const { bookmarkId, ...request } = editingSchedule;
      const isSuccess = await editScheduleApi(tripId, dayId, scheduleId, request);
      if (isSuccess) {
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 북마크 제거 API 요청
   * @param {*} successCallback 
   */
  const requestUnlinkBookmark = async(successCallback) => {
    const { bookmarkId } = schedule;
    try {
      const request = { bookmarkId: "" };
      const isSuccess = await editScheduleApi(tripId, dayId, scheduleId, request);
      if (isSuccess) {
        successCallback?.(bookmarkId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsEditing(schedule.tripScheduleId === editingSchedule?.tripScheduleId);
    // console.log(editingSchedule);
  }, [editingSchedule?.tripScheduleId]);

  useEffect(() => {
    if (isEditing) {
      console.log("changeEditing");
      focusRef.current = itemRef.current;
      focusRef?.current?.focus();
    }
  }, [isEditing]);

  return (
    <FlexBox
      ref={mergeRefs(sortableRef, itemRef)}
      onBlur={handleBlur}
      tabIndex={-1}
      id={id}
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
          <ScheduleEditableItem isEditing={isEditing} columnId="startTime" onChange={handleChangeEditing} onClick={handleSelectEditing} w="092px" containerRef={itemRef} value={schedule.startTime || "00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} columnId="endTime"   onChange={handleChangeEditing} onClick={handleSelectEditing} w="092px" containerRef={itemRef} value={schedule.endTime || "00:00"}/>
          <ScheduleEditableItem isEditing={isEditing} columnId="category"  onChange={handleChangeEditing} onClick={handleSelectEditing} w="108px" containerRef={itemRef} value={schedule.category}/>
          <FlexBox w="280px" >
            <ScheduleDroppableItem scheduleId={scheduleId} isEditing={isEditing} value={schedule.context || ""} bookmarkId={schedule.bookmarkId}
            deleteBookmarkEvent={handleDeleteBookmarkEvent}
            onChange={handleChangeEditing}
            onClick={handleSelectEditing}/>
          </FlexBox>
        </FlexBox>
        {
          isExpandTable ? 
          <FlexBox w="auto" settings={{justify: "flex-start"}}>
            <ScheduleEditableItem isEditing={isEditing} columnId="memo"  onChange={handleChangeEditing} onClick={handleSelectEditing} w="380px" value={schedule.memo}/>
            <ScheduleEditableItem isEditing={isEditing} columnId="price" onChange={handleChangeEditing} onClick={handleSelectEditing} w="160px" value={schedule.price}/>
            <FlexBox w="100px" settings={{justify: "center"}}>
              <IconButton
                width="32px"
                height="28px"
                fontSize="12px"
                ghost={isHover ? false : true}
                style={{visibility: schedule.link?.length > 0 ? "visible" : "hidden"}}
                onClickEvent={() => {
                  console.log(schedule.link);
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
            id="delete-schedule-btn"
            width="32px"
            height="28px"
            fontSize="12px"
            disabled={isOnly ? true : false}
            ghost={isHover ? false : true}
            danger
            onClickEvent={() => {
              handleDeleteSchedule();
            }}
          >
            <CloseSquareOutlined />
          </IconButton>
        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  );
};

export default SortableScheduleItem;