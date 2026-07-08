import React, { useState } from 'react'
import { FlexBox, TextBox } from '../../common/PLA_FlexBox'
import { FlexContainer } from '../../common/PLA_Containers'
import { IconButton } from '../../common/PLA_Buttons';
import { CATEGORY_ICON } from '../../../Constants/categoryIcon';
import { CATEGORY_NAME } from '../../../constants/categoryName';
import { SearchOutlined } from '@ant-design/icons';
import tripRecommandStore from '../../../store/trip/tripRecommandStore';

const RelationAreaItem = ({ item }) => {
  const CategoryIcon = CATEGORY_ICON[item.category || "ETC"];

  const setRelatedPlaceKeyword = tripRecommandStore((state) => state.setRelatedPlaceKeyword);
  
  // 키워드 저장
  const saveKeyword = (keyword) => {
    setRelatedPlaceKeyword(keyword);
  };

  const nameStyle = {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  };

  return (
    <FlexBox w="360px" h="75px" style={{ position: "relative", minHeight: "75px", flexShrink: 0}}>
      <FlexContainer bg="#ffffffff" settings={{ justify: "space-around" }}>
        {/* 맵 마커 넘버 */}
        <FlexBox w="55px" bg="none" style={{ padding: "15px 0px 0px 25px" }} settings={{ isVertical: true, flex: "flex-start", align: "center" }}>
          <FlexBox w="48px" h="40px" bg="none">
            <CategoryIcon size= "30px"/>
          </FlexBox>
        </FlexBox>
        {/* 정보 */}
        <FlexBox w="200px" bg="none" settings={{ isVertical: true, justify: "space-around" }} style={{ padding: "8px" }}>
          <TextBox h="20%" size="16px" color="#565656" weight={500} bg="none" alignW="left" style={nameStyle}>{item.name}</TextBox>
          <TextBox h="20%" bg="none" alignW="left">{CATEGORY_NAME[item.category]}</TextBox>
          <TextBox h="25%" bg="none" alignW="left">{item.zdoName || ""} {item.siguName || ""}</TextBox>
        </FlexBox>
        {/* 우측 버튼 */}
        <FlexBox w="70px" bg="none" settings={{ isVertical: true, justify: "space-around" }} style={{ padding: "8px", position: "relative" }}>
          <IconButton width="40px" height="40px" type="default" onClickEvent={() => saveKeyword(item.name)}>
            <SearchOutlined style={{color: "#A8A8A8", fontSize: "20px"}}/>
          </IconButton>
        </FlexBox>
      </FlexContainer>
    </FlexBox>
  )
}

export default RelationAreaItem
