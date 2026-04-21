import { useState } from "react";
import { CATEGORY_ICON } from "../../Constants/categoryIcon";
import {
  getBookmarkActiveColor,
  getBookmarkColor,
} from "../../utils/plan/bookmarkUtils";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import { CATEGORY_NAME } from "../../constants/categoryName";

const BookmarkItem = ({ bookmark, ...rest }) => {
  const mainColor = getBookmarkColor(bookmark?.bookmarkType);
  const activeColor = getBookmarkActiveColor(bookmark?.bookmarkType);

  const defaultHeight = {
    header: "30px",
    titleMax: "16px",
    content: "118px",
    image: "52px",
    icon: "40px",
    info: "56px",
    address: "24px",
  };

  const expandHeight = {
    header: "48px",
    titleMax: "32px",
    content: "100px",
    image: "26px",
    icon: "16px",
    info: "64px",
    address: "24px",
  };
  const [heights, setHeights] = useState(defaultHeight);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const cardStyle = {
    backgroundColor: "#ffffff",
    display: "flex",
    filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.25))",
    border: `solid 2px ${getBookmarkColor(bookmark.bookmarkType)}`,
    minWidth: "148px",
    marginRight: "12px",
    borderRadius: "8px",
  };

  const titleStyle = {
    maxWidth: "100%",
    maxHeight: heights.titleMax,
    overflowY: "hidden",
    lineHeight: "100%",
  };

  const handleMouseOver = () => {
    setHeights(expandHeight);
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setHeights(defaultHeight);
    setIsMouseOver(false);
  };

  console.log(bookmark?.areaInfo?.category);

  const CategoryIcon = CATEGORY_ICON[bookmark?.areaInfo?.category || "AD5"];
  const categoryName = CATEGORY_NAME[bookmark?.areaInfo?.category || "AD5"];

  return (
    <FlexBox
      w="148px"
      h="156px"
      style={{ ...cardStyle, ...rest?.style }}
      settings={{ isVertical: true }}
      ref={rest?.ref}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {/* 헤더 */}
      <FlexBox
        h={heights.header}
        bg={mainColor}
        settings={{ justify: "center" }}
      >
        <TextBox
          size="16px"
          alignW="start"
          alignH={isMouseOver ? "center" : "top"}
          weight={600}
          color="#565656"
          style={titleStyle}
        >
          {bookmark?.areaInfo?.name || ""}
        </TextBox>
      </FlexBox>
      {/* 본문 */}

      <FlexBox
        h={heights.content}
        settings={{ isVertical: true }}
        style={{ padding: "4px 8px" }}
      >
        <FlexBox h={heights.image} settings={{ justify: "center" }}>
          {/* 이미지 영역 */}
          <FlexBox
            bg={activeColor}
            style={{
              borderRadius: "8px",
              boxShadow: "inset 2px 1px 5px rgba(0, 0, 0, 0.25)",
            }}
          >
            <FlexBox settings={{ justify: "center" }}>
              <FlexBox w={isMouseOver ? "28px" : "100%"}>
                <CategoryIcon
                  width="auto"
                  size={heights.icon}
                  color="#FFFFFF"
                />
              </FlexBox>
              {isMouseOver && (
                <TextBox w="80px" bg="none" color="#FFFFFF">
                  {categoryName}
                </TextBox>
              )}
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {/* 주소 영역 */}
        <FlexBox h={heights.info} settings={{ isVertical: true }}>
          <TextBox
            h={heights.address}
            alignW="left"
            alignH="top"
            weight={500}
            color="#565656"
            bg="none"
            style={{ overflowY: "hidden" }}
          >
            {bookmark?.areaInfo?.roadAddress ||
              bookmark?.areaInfo?.address ||
              ""}
          </TextBox>
          {
            <TextBox
              alignW="left"
              weight={300}
              color="#565656"
              bg="none"
              style={{
                maxHeight: "16px",
                borderTop: `dotted 1px ${mainColor}`,
              }}
            >
              {bookmark?.areaInfo?.telephone
                ? `T. ${bookmark?.areaInfo?.telephone}`
                : ""}
            </TextBox>
          }
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default BookmarkItem;
