import { FlexBox } from "../../common/PLA_FlexBox";
import SortableDayItem from "./SortableDayItem";
import { usePlanDays } from "../../../hooks/trip/PlanDaysContext";
import { useTripDate } from "../../../hooks/trip/TripDateContext";

const PlanTableContent = () => {
  const { activeDayCount } = useTripDate();
  const { planDays } = usePlanDays();

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
