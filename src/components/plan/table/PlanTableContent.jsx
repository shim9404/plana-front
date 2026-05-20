import { FlexBox } from "../../common/PLA_FlexBox";
import SortableDayItem from "./SortableDayItem";
// import { usePlanDays } from "../../../hooks/trip/PlanDaysContext";
import usePlanDaysStore from '../../../hooks/trip/usePlanDaysStore.js';
import { useTripDate } from "../../../hooks/trip/TripDateContext";

const PlanTableContent = () => {
  const { activeDayCount } = useTripDate();
  // const { planDays } = usePlanDays();
  const planDays = usePlanDaysStore((state) => state.planDays);

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
