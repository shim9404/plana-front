import { Button } from 'antd';
import { usePlanEditing, useTripPlan } from '../../../hooks/plan/PlanTripContext';
import { FlexBox } from '../../common/PLA_FlexBox';

const AddScheduleButton = ({ dayId }) => {
  const { editingSchedule, addSchedule } = usePlanEditing();

  return (
    <Button style={{width:"100%", height: "24px", margin: "1px 2px 2px 1px", padding: "0px", overflow: "hidden"}}
      onClick={() => addSchedule(dayId)} disabled={editingSchedule == null ? false : true}>
      <FlexBox settings={{isVertical: false}}>
      <FlexBox w="20px" h="100%" bg="#A8a8a8" settings={{justify: "center"}}>
        +
      </FlexBox>
      <FlexBox settings={{justify: "center"}}>
        계획 추가
      </FlexBox>
      </FlexBox>
    </Button>
  )
}

export default AddScheduleButton;
