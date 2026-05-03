import { FlexBox, TextBox } from '../../common/PLA_FlexBox';
import { FlexContainer } from '../../common/PLA_Containers';
import { IconButton } from '../../common/PLA_Buttons';
import { ExportOutlined, StarTwoTone } from '@ant-design/icons';
import MapMarkerImage from './MapMarkerImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getBookmarkColor, getBookmarkSubColor } from '../../../utils/plan/bookmarkUtils';
import { BOOKMARK_COLOR } from '../../../Constants/bookmarkColor';
import { CATEGORY_NAME } from '../../../constants/categoryName';
import { usePlanBookmark } from '../../../hooks/trip/PlanBookmarkContext';

const AreaBookmarkButton = ({ findId, onClickEvent }) => {
  const [bookmarkType, setBookmarkType] = useState("");
  const { getBookmarkType } = usePlanBookmark();

  useEffect(() => {
    setBookmarkType(getBookmarkType(findId));
  }, [getBookmarkType(findId)])

  return (
    <IconButton width="36px" height="36px"
    style={{backgroundColor: bookmarkType === "NONE" ? "#FFFFFF" : getBookmarkColor(bookmarkType)}}
    onClickEvent={onClickEvent} >
      <StarTwoTone twoToneColor={getBookmarkSubColor(bookmarkType)} />
    </IconButton>
  )
}

const AreaItem = ({ id, area, number, margin, popupBookmark }) => {
  const buttonRef = useRef();

  const handleBookmark = () => {
    popupBookmark?.(buttonRef.current.getBoundingClientRect().y, area.areaId, area.placeId);
  }

  const handleOpenlink = (link) => {
    window.open(link, "_blank");
  }

  const getFindId = useCallback(() => {
    const findId = area.placeId === null || area.placeId === undefined ? area.areaId : area.placeId;
    console.log("find ", findId);
    return findId;
  }, [area]);

  const nameStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  };

  return (
    <FlexBox w='330px' h="98px" style={{ margin: `${margin} 0px`, minHeight: "98px", position: "relative" }}>
      <FlexContainer bg="#F5F5F5" settings={{ justify: "space-around" }}>
        {/* 맵 마커 넘버 */}
        <FlexBox w="56px" bg="none" style={{ padding: "8px" }} settings={{ isVertical: true, flex: "flex-start", align: "center" }}>
          <FlexBox w="48px" h="48px" bg="none">
            <MapMarkerImage number={number} />
          </FlexBox>
        </FlexBox>
        {/* 정보 */}
        <FlexBox w="210px" bg="none" settings={{ isVertical: true, justify: "space-around" }} style={{ padding: "8px" }}>
          <TextBox h="25%" size="16px" color="#565656" weight={500} bg="none" alignW="left" style={nameStyle}>{area.name}</TextBox>
          <TextBox h="20%" bg="none" alignW="left">{CATEGORY_NAME[area.category]}</TextBox>
          <TextBox h="25%" bg="none" alignW="left">{area.roadAddress || area.address || ""}</TextBox>
          <TextBox h="20%" bg="none" alignW="left">{area.telephone}</TextBox>
        </FlexBox>
        {/* 우측 버튼 */}
        <FlexBox w="48px" bg="none" settings={{ isVertical: true, justify: "space-around" }} style={{ padding: "8px", position: "relative" }}
          ref={buttonRef}>
          <AreaBookmarkButton popupBookmark={popupBookmark} findId={area.areaId || area.placeId} onClickEvent={handleBookmark}/>
          <IconButton width="36px" height="36px" type="default" onClickEvent={() => handleOpenlink(area.link)}>
            <ExportOutlined />
          </IconButton>
        </FlexBox>
      </FlexContainer>
    </FlexBox>
  )
}

export default AreaItem;
