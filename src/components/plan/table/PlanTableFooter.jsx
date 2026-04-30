import { Input, InputNumber } from "antd";
import { FlexBox } from "../../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { useTripInfo } from "../../../hooks/TripInfoContext";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";
import { editTripInfoApi } from "../../../services/tripApi";

const PlanTableFooter = ({ styles }) => {
  const {confirmedDates, entryCount, setEntryCount} = useTripInfo();
  const {planDays} = useTripPlan();
  const [totalPrice, setTotalPrice] = useState(0);
  const [memberPrice, setMemberPrice] = useState(0);

  const onChangeEntryCount = (value) => {
    setEntryCount(value);
    setMemberPrice(Math.floor(totalPrice / value));
  }

  const getDates = () => {
    return {
      start: confirmedDates[0].format("YYYY-MM-DD"),
      end: confirmedDates[1].format("YYYY-MM-DD"),
    }
  }

  const getDay = () => {
    return confirmedDates[1].date() - confirmedDates[0].date();
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
    setTotalPrice(price);
    setMemberPrice( price / entryCount);
  }, [planDays])

  return (
    <FlexBox h="40px" style={styles.footerStyle}>
      <FlexBox w="240px" settings={{ justify: "center" }}>
        {confirmedDates && confirmedDates.length > 0 ? `${getDates().start}-${getDates().end} (${getDay()}박 ${getDay() + 1}일)` : "여행 날짜를 선택해주세요"}
      </FlexBox>
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
