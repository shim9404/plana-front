import { Button } from 'antd';
import { useTripInfo } from '../../../hooks/trip/TripInfoContext';
import { FlexBox, TextBox } from '../../common/PLA_FlexBox';
import { addScheduleApi } from '../../../services/tripApi'
import { useEditSchedule } from '../../../hooks/trip/EditScheduleContext';
import { PlusOutlined } from '@ant-design/icons';

const AddScheduleButton = ({ dayId }) => {
  const { editingSchedule, addSchedule } = useEditSchedule();
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
        <PlusOutlined style={{ fontSize:"10px", color:"#FFFFFF" }}/>
      </FlexBox>
      <TextBox color="#565656" settings={{justify: "center"}}>
        계획 추가
      </TextBox>
      </FlexBox>
    </Button>
  )
}

export default AddScheduleButton;
