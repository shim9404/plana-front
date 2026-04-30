import { FlexBox } from "../../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { DUMMY_DAYS } from "./PLAN_DUMMY";
import { usePlanEditing, useTripPlan } from "../../../hooks/plan/PlanTripContext";
import SortableDayItem from "./SortableDayItem";

const PlanTableContent = () => {
  const { planDays } = useTripPlan();

  return (
    <FlexBox settings={{ isVertical: true }} style={{ gap: "8px" }}>
      {planDays?.map((day, index) => {
        return (
          <SortableDayItem
            id={`day-item-${day.tripDayId}`}
            key={day.tripDayId}
            dayId={day.tripDayId}
            index={index}
            schedules={day.schedules}
          />
        );
      })}
    </FlexBox>
  );
};

export default PlanTableContent;
