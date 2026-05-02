import { FlexBox } from "../../common/PLA_FlexBox";
import SortableDayItem from "./SortableDayItem";
import { useTripInfo } from "../../../hooks/trip/TripInfoContext";
import { usePlanDays } from "../../../hooks/trip/PlanDaysContext";

const PlanTableContent = () => {
  const { activeDayCount } = useTripInfo();
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
