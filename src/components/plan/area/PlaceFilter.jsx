import React, { useEffect, useState } from 'react'
import { FlexBox, TextBox } from '../../common/PLA_FlexBox'
import { FlexContainer } from '../../common/PLA_Containers';
import { TextButton } from '../../common/PLA_Buttons';
import { CloseOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import modalStore from "../../../store/modalStore";
import { oneBtnPreset } from '../../../utils/alertModalPreset';

const FILTER_OPTION = [
  { label: "문화시설", value: "CT1" },
  { label: "음식점", value: "FD6" },
  { label: "관광명소", value: "AT4" },
  { label: "카페", value: "CE7" },
  { label: "숙박", value: "AD5" },
];

// 지도 검색용 필터
const PlaceFilter = ({setShowFilter, selectedPlaceFilters, setSelectedPlaceFilters}) => {
  // 모달창
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);

  const [checkedFilters, setCheckedFilters] = useState(selectedPlaceFilters);

  useEffect(() => {
    setCheckedFilters(selectedPlaceFilters);
  }, [selectedPlaceFilters]);

    // 체크박스 선택
  const handleChange = (checkedValues) => {
    setCheckedFilters(checkedValues);
  };

  // 전체 선택
  const handleSelectAll = () => {
    setCheckedFilters(FILTER_OPTION.map(item => item.value));
  };

  // 적용
  const handleApply = () => {
    setShowFilter(false);
    if (checkedFilters.length === 0) {
      openOneBtnModal(oneBtnPreset.CheckWarn);
      return;
    }
    
    setSelectedPlaceFilters(checkedFilters);
  };

  const onClose = () => {
    setShowFilter(false);
  }

  return (
    <>
      <FlexContainer settings={{ isVertical: true }}>
        <FlexBox bg="none" settings={{ justify: "space-between", align: "center" }} style={{ padding: "0 15px", borderBottom: "1px solid #ddd" }}>
          <TextBox alignW="left" h="40px" w="auto" size="15px">지도 검색 필터</TextBox>
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", fontSize: "15px"}} />
        </FlexBox>
        <Checkbox.Group value={checkedFilters} onChange={handleChange}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "20px 20px 10px"}}>
            {FILTER_OPTION.map(item => (
              <Checkbox key={item.value} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
        <FlexBox settings={{justify: "center"}} style={{gap: "10px", padding: "10px"}}>
          <TextButton type="primary" width="200px" height="35px" fontSize="13px" onClickEvent={handleSelectAll}>
            전체 선택
          </TextButton>
          <TextButton type="primary" width="200px" height="35px" fontSize="13px" onClickEvent={handleApply}>
            필터 적용
          </TextButton>
        </FlexBox>
      </FlexContainer>
    </>
  )
}

export default PlaceFilter
