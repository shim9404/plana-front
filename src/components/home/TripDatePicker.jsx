import { useState } from 'react';
import { DatePicker } from 'antd';
import styles from "../../styles/TripInfoSelector.module.css"
import { TextButton } from '../common/PLA_Buttons';
import { useTripInfo } from '../../hooks/TripInfoContext';

const { RangePicker } = DatePicker;

const TripDatePicker = ({ width="400px", height="52px", placement }) => {
  // 최종 확정 날짜 ["YYYY-MM-DD","YYYY-MM-DD"] (확인 버튼 클릭 시에만 업데이트)
  const { setConfirmedDates } = useTripInfo();

  // 임시 선택 날짜 ["YYYY-MM-DD","YYYY-MM-DD"] (달력에서 클릭할 때마다 변함)
  const [tempDates, setTempDates] = useState([]);

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
    }
  };

  const handleCalendarChange = (values, dateStrings) => {
    setTempDates(values);

    // 버튼 활성화
    if (dateStrings?.[0] && dateStrings?.[1]) {
      setDisabled(false);
    }
  }

  const handleOpenChange = (visible) => {
    if (visible) setOpen(true)
    else return;
  }

  const handleCancel = () => {
    setTempDates([]);
    setConfirmedDates(null);
    setDisabled(true);
    setOpen(false);
  }

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
        <div style={{ display: 'flex', justifyContent: 'Space-Between', padding: '8px 0' }}>
          <TextButton type="primary" disabled={disabled} onClickEvent={handleConfirm} width='70%' height='32px'>
            이 일정으로 선택
          </TextButton>
          <TextButton danger type="primary" onClickEvent={handleCancel} width='20%' height='32px'>
            취소
          </TextButton>
        </div>
      )}
    />
  );
};

export default TripDatePicker;