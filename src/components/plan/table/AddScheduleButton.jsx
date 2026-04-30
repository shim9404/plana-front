import { Button } from 'antd';
import { usePlanEditing } from '../../../hooks/plan/PlanTripContext';
import { useTripInfo } from '../../../hooks/TripInfoContext';
import { FlexBox } from '../../common/PLA_FlexBox';
import { addScheduleApi } from '../../../services/tripApi'

const AddScheduleButton = ({ dayId }) => {
  const { editingSchedule, addSchedule } = usePlanEditing();
  const { tripId } = useTripInfo();

  const handleAddSchedule = () => {
    requestAddSchedule((addData) => {
      addSchedule(dayId, addData);
    })
  }

  const requestAddSchedule = async(successCallback) => {
    try {
      const result = await addScheduleApi(tripId, dayId);
      if (result) {
        const addData = result.data;
        successCallback?.(addData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log("finally");
    }
  }

  return (
    <Button style={{width:"100%", height: "24px", margin: "1px 2px 2px 1px", padding: "0px", overflow: "hidden"}}
      onClick={() => handleAddSchedule()} disabled={editingSchedule == null ? false : true}>
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
