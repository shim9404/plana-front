import { FlexBox } from "../../common/PLA_FlexBox";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";
import SortableDayItem from "./SortableDayItem";

const PlanTableContent = () => {
  const { planDays, activeDayCount } = useTripPlan();

  return (
    <FlexBox settings={{ isVertical: true, justify: "flex-start" }} style={{ gap: "8px" }}>
      {planDays?.map((day, index) => {
        return (
          <SortableDayItem
            isDimmed={index >= activeDayCount}
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
