import { FlexBox, TextBox } from '../../common/PLA_FlexBox';
import { FlexContainer } from '../../common/PLA_Containers';
import { IconButton } from '../../common/PLA_Buttons';
import { ExportOutlined, StarTwoTone } from '@ant-design/icons';
import MapMarkerImage from './MapMarkerImage';
import { useEffect, useRef, useState } from 'react';
import { getBookmarkColor } from '../../../utils/plan/bookmarkUtils';
import { BOOKMARK_COLOR } from '../../../Constants/bookmarkColor';
import { CATEGORY_NAME } from '../../../constants/categoryName';
import { usePlanBookmark } from '../../../hooks/trip/PlanBookmarkContext';

const AreaItem = ({ area, number, margin, popupBookmark }) => {
  const [bookmarkType, setBookmarkType] = useState("");
  const { bookmarks } = usePlanBookmark();
  const buttonRef = useRef();

  const handleBookmark = () => {
    popupBookmark?.(buttonRef.current.getBoundingClientRect().y, area.areaId, area.placeId);
  }

  useEffect(() => {
    setBookmarkType(searchMyBookmark());
  }, [bookmarks])

  const searchMyBookmark = () => {
    bookmarks.map((item, index) => {
      console.log(item);
    }
    )

    const found = bookmarks.find(b => b.placeId == area.placeId);

    return found?.bookmarkType;
  }

  const handleOpenlink = (link) => {
    window.open(link, "_blank");
  }

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
          <IconButton width="36px" height="36px" type={bookmarkType == "" ? "default" : "primary"} onClickEvent={(e) => handleBookmark(e)} >
            <StarTwoTone twoToneColor={getBookmarkColor(bookmarkType)} />
          </IconButton>
          <IconButton width="36px" height="36px" type="default" onClickEvent={() => handleOpenlink(area.link)}>
            <ExportOutlined />
          </IconButton>
        </FlexBox>
      </FlexContainer>
    </FlexBox>
  )
}

export default AreaItem;
