import { useEffect, useState } from "react";
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
    header: "35px",
    titleMax: "16px",
    content: "40px",
    image: "28px",
    icon: "40px",
    info: "30px",
    address: "24px",
  };

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
    maxHeight: "16px",
    overflowY: "hidden",
    lineHeight: "100%",
  };

  const CategoryIcon = CATEGORY_ICON[bookmark?.areaInfo?.category || "ETC"];
  const categoryName = CATEGORY_NAME[bookmark?.areaInfo?.category || "ETC"];

  return (
    <FlexBox
      w="400px"
      h="100px"
      bg="#F3F3F3"
      style={{
        padding: "20px",
        borderRadius: "16px",
        gap: "5px",
      }}
    settings={{ justify: "flex-start" }}
    >
      {/* 왼쪽 카드 */}
      <FlexBox
        w="170px"
        h="70px"
        style={{ ...cardStyle, ...rest?.style }}
        settings={{ isVertical: true }}
        ref={rest?.ref}
      >
        {/* 헤더 */}
        <FlexBox
          h={defaultHeight.header}
          bg={mainColor}
          settings={{ justify: "center" }}
          style={{overflow: "hidden", padding: "0 10px"}}
        >
          <TextBox
            size="16px"
            alignW="center"
            alignH="center"
            weight={600}
            color="#565656"   
            style={{
              ...titleStyle,
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "block"
            }}
          >
            {bookmark?.areaInfo?.name || ""}
          </TextBox>
        </FlexBox>
        {/* 본문 */}
        <FlexBox
          h={defaultHeight.content}
          settings={{ isVertical: true }}
          style={{ padding: "4px 8px" }}
        >
          <FlexBox h={defaultHeight.image} settings={{ justify: "center" }}>
            {/* 이미지 영역 */}
            <FlexBox
              bg={activeColor}
              style={{
                borderRadius: "8px",
                boxShadow: "inset 2px 1px 5px rgba(0, 0, 0, 0.25)",
              }}
            >
              <FlexBox settings={{ justify: "center" }}>
                  <CategoryIcon
                    width="30px"
                    size="20px"
                    color="#FFFFFF"
                  />
                  <TextBox w="50px" bg="none" color="#FFFFFF">
                    {categoryName}
                  </TextBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      {/* 오른쪽 카드 */}
      <FlexBox h={defaultHeight.info} w="200px" settings={{ isVertical: true }}>
        <TextBox
          h={defaultHeight.address}
          alignW="left"
          alignH="top"
          weight={500}
          color="#565656"
          bg="none"
          style={{
            display: "block",
            whiteSpace: "normal",
            wordBreak: "break-word",
            width: "100%",
          }}
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
              paddingTop: "15px"
            }}
          >
            {bookmark?.areaInfo?.telephone
              ? `T. ${bookmark?.areaInfo?.telephone}`
              : ""}
          </TextBox>
        }
      </FlexBox>
    </FlexBox>
  );
};

export default BookmarkItem;
