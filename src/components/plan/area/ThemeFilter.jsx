import React, { useEffect, useState } from 'react'
import { FlexBox, TextBox } from '../../common/PLA_FlexBox'
import { FlexContainer } from '../../common/PLA_Containers';
import { TextButton } from '../../common/PLA_Buttons';
import { CloseOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import modalStore from "../../../store/modalStore";
import { oneBtnPreset } from '../../../utils/alertModalPreset';

const FILTER_OPTION = [
  { label: "반려동물 동반", value: "PET" },
  { label: "노약자, 영유아, 장애인 동반", value: "BF" }
];

const ThemeFilter = ({setShowFilter, selectedThemeFilters, setSelectedThemeFilters}) => {
  // 모달창
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);

  const [checkedFilters, setCheckedFilters] = useState(selectedThemeFilters);

  useEffect(() => {
      setCheckedFilters(selectedThemeFilters);
  }, [selectedThemeFilters]);

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
        
    setShowFilter(false);
    setSelectedThemeFilters(checkedFilters);
  };

  const onClose = () => {
    setShowFilter(false);
  }

  return (
    <>
      <FlexContainer settings={{ isVertical: true }}>
        <FlexBox bg="none" settings={{ justify: "space-between", align: "center" }} style={{ padding: "0 15px", borderBottom: "1px solid #ddd" }}>
          <TextBox alignW="left" h="40px" w="auto" size="15px">맞춤 테마 검색 필터</TextBox>
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", fontSize: "15px"}} />
        </FlexBox>
        <Checkbox.Group value={checkedFilters} onChange={handleChange}>
          <div style={{display: "grid", gap: "10px", padding: "20px 20px 10px"}}>
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

export default ThemeFilter
