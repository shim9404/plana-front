import { FlexBox } from "../../common/PLA_FlexBox";
import SortableDayItem from "./SortableDayItem";
import planDaysStore from "../../../store/trip/planDaysStore";
import tripDateStore from "../../../store/trip/tripDateStore";

const PlanTableContent = () => {
  const activeDayCount = tripDateStore((state) => state.activeDayCount);
  const planDays = planDaysStore((state) => state.planDays);

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
