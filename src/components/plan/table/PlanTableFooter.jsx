import { Input, InputNumber } from "antd";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { useTripInfo } from "../../../hooks/trip/TripInfoContext";
import { editTripInfoApi } from "../../../services/tripApi";
import dayjs from 'dayjs';
import { usePlanDays } from "../../../hooks/trip/PlanDaysContext";
import { useTripDate } from "../../../hooks/trip/TripDateContext";

const PlanTableFooter = ({ styles }) => {
  const { entryCount, setEntryCount, tripId } = useTripInfo();
  const { confirmedDates } = useTripDate();
  const { planDays } = usePlanDays();
  const [totalPrice, setTotalPrice] = useState(0);
  const [memberPrice, setMemberPrice] = useState(0);
  const onChangeEntryCount = (value) => {
    setEntryCount(value);
    setMemberPrice(Math.floor(totalPrice / value));
  }
  
  const getDates = () => {
    if (confirmedDates === null || confirmedDates === undefined) return null;

    const startDate = dayjs(confirmedDates[0]);
    const endDate = dayjs(confirmedDates[1]);
    const diff = endDate.diff(startDate, 'days');
    return {
      startDate: startDate.format("YYYY.MM.DD"),
      endDate: endDate.format("YYYY.MM.DD"),
      diff: diff === 0 ? "당일치기" : `${diff}박 ${diff + 1}일`
    }
  }

  const handleSaveEntryCount = () => {
    requestUpdateEntryCount();
  }

  /**
   * 여행 인원 수정 API 요청
   * @param {*} successCallback 
   */
  const requestUpdateEntryCount = async(successCallback) => {
    try {
      const request = { entryCount: entryCount };
      const isSuccess = await editTripInfoApi(tripId, request);
      if (isSuccess) {
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // 예산 계산
    let price = 0;
    planDays.map((day) => day.schedules.map((schedule) => {if (schedule.price && schedule.price > 0) price += parseInt(schedule.price);}))
    setTotalPrice(Math.floor(price));
    setMemberPrice(Math.floor(price / entryCount));
  }, [planDays])

  return (
    <FlexBox h="40px" settings={{justify: "flex-end"}} style={styles.footerStyle}>
      <TextBox w="auto" h="32px" alignH="center" alignW="left" style={{ marginLeft: "12px", overflow:"hidden", backgroundColor: "none" }}>
        {getDates() ? `${getDates().startDate} - ${getDates().endDate} (${getDates().diff})` : "여행 날짜를 선택해주세요"}
      </TextBox>
      <FlexBox w="440px" settings={{ justify: "space-around" }}>
        <FlexBox w="110px">
          <FlexBox w="56px">참여 인원</FlexBox>
          <FlexBox w="48px">
            <InputNumber min={1} max={99} value={entryCount} style={styles.footerInputStyle} 
            onChange={onChangeEntryCount}
            onBlur={() => handleSaveEntryCount()}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox w="150px">
          <FlexBox w="48px">총 예산</FlexBox>
          <FlexBox w="100px">
            <Input
              style={styles.footerInputStyle}
              value={`${totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} 원`}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox w="132px">
          <FlexBox w="40px">인당</FlexBox>
          <FlexBox w="110px">
            <Input
              style={styles.footerInputStyle}
              value={`${memberPrice ? memberPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} 원`}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default PlanTableFooter;
