import { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import styles from "../../styles/TripInfoSelector.module.css"
import { TextButton } from '../common/PLA_Buttons';
import dayjs from 'dayjs';
import { useTripDate } from '../../hooks/trip/TripDateContext';

const { RangePicker } = DatePicker;

const TripDatePicker = ({ width="400px", height="52px", placement, isShowConfirm, handleSave }) => {
  // 최종 확정 날짜 ["YYYY-MM-DD","YYYY-MM-DD"] (확인 버튼 클릭 시에만 업데이트)
  const { confirmedDates, setConfirmedDates } = useTripDate();
  
  // 임시 선택 날짜 ["YYYY-MM-DD","YYYY-MM-DD"] (달력에서 클릭할 때마다 변함)
  const [tempDates, setTempDates] = useState([]);
  
  // confirm 버튼이 있는 버전에서 취소를 눌렀을 경우 이전 날짜로 돌리기 위한 저장
  const prevDatesRef = useRef(null);

  // 팝업 열림 제어
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const labelStyle = {
    justifyContent: "flex-start",
    color: "#565656",
    width: width,
    height: height,
    fontSize: "16px"
  }

  const handleConfirm = () => {
    if (tempDates?.[0] && tempDates?.[1]) {
      setConfirmedDates(tempDates);
      setOpen(false);
      handleSave?.(tempDates);
    }
  };

  const handleCalendarChange = (values, dateStrings) => {
  if (!values || !values[0] || !values[1]) {
    setTempDates(values);
    return;
  }

  // 날짜 순서 잘 못 지정 시, 순서 뒤집기
  let [start, end] = values;
  if (start.isAfter(end)) {
    [start, end] = [end, start];
  }
  setTempDates([start, end]);

    // 버튼 활성화
    if (dateStrings?.[0] && dateStrings?.[1]) {
      setDisabled(false);
    }
  }

  const handleOpenChange = (visible) => {
    if (visible) {
      setOpen(true);
      if (isShowConfirm) {
        prevDatesRef.current = confirmedDates;
      }
    }
    else {
      if (!isShowConfirm) {
        setOpen(false);
        handleConfirm();
      }
    }
  }

  const handleCancel = () => {
    setDisabled(true);
    setOpen(false);
    if (isShowConfirm) {
      setTempDates(prevDatesRef.current);
      prevDatesRef.current = null;
    }
  }

  useEffect(() => {
    console.log(tempDates);
  }, [tempDates])
  
  useEffect(() => {
    if (confirmedDates) {
      setTempDates(confirmedDates);
    }
    else {
      const todays = [dayjs(), dayjs()];
      setTempDates(todays);
      setConfirmedDates(todays);
    }
  }, [confirmedDates])

  return (
    <RangePicker
      value={tempDates}
      allowClear={false}
      open={open}
      onOpenChange={handleOpenChange}
      rootClassName={styles.customDatePicker}
      onCalendarChange={handleCalendarChange} // 날짜 찍을 때마다 상태 업데이트
      placeholder={["출발 날짜", "도착 날짜"]}
      placement={placement ?? "topLeft"}
      style={labelStyle}
      // '확인' 버튼 커스텀 렌더링
      renderExtraFooter={() => (
        isShowConfirm &&
        <div style={{ display: 'flex', justifyContent: 'Space-Between', padding: '8px 0' }}>
          <TextButton danger type="primary" fontSize="14px" onClickEvent={handleCancel} width='20%' height='40px'>
            취소
          </TextButton>
          <TextButton type="primary" fontSize="14px" disabled={disabled} onClickEvent={handleConfirm} width='78%' height='40px'>
            이 일정으로 선택
          </TextButton>
        </div>
      )}
    />
  );
};

export default TripDatePicker;