import { FlexBox } from "../../common/PLA_FlexBox";
import SortableDayItem from "./SortableDayItem";
import usePlanDaysStore from "../../../store/trip/usePlanDaysStore";
import useTripDateStore from "../../../store/trip/useTripDateStore";

const PlanTableContent = () => {
  const activeDayCount = useTripDateStore((state) => state.activeDayCount);
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
