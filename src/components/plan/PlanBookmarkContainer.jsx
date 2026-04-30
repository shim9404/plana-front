import { StarOutlined } from "@ant-design/icons";
import { ScrollStyle } from "../../styles/planStyles";
import { FlexContainer } from "../common/PLA_Containers";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { Button, Empty } from "antd";
import { getBookmarkColor } from "../../utils/plan/bookmarkUtils";
import DragableBookmarkItem from "../bookmark/DragableBookmarkItem";
import { useTripPlan } from "../../hooks/plan/PlanTripContext";

const PlanBookmarkContainer = () => {
  const { bookmarks } = useTripPlan();
  const [arrDisplay, setArrDisplay] = useState([]);
  const [filterType, setFilterType] = useState("");

  const getFilterStyle = (type, isSelected) => {
    let resultStyle = {
      background: getBookmarkColor(type),
      width: "28px",
      height: "28px",
      padding: "0px",
      marginLeft: "6px",
    }
    if (isSelected) {
      resultStyle = {
        ...resultStyle,
        boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.25)",
        filter: "drop-shadow(1px 1px 1px #A8A8A8)"
      }
    }
    return resultStyle;
  }

  const handleFilter = (e) => {
    const type = e.currentTarget.name;
    setFilterType(type);
    switch (type) {
      case "ALL":
        setArrDisplay(bookmarks);
        break;
      default:
        setArrDisplay(bookmarks.filter((b) => b.bookmarkType == type));
        break;
    }
  };

  useEffect(() => {
    setArrDisplay(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    console.log("arrDisplay:: ", arrDisplay);
  }, [arrDisplay]);

  return (
    <FlexContainer>
      <FlexBox settings={{ isVertical: true }} style={{ padding: "14px 30px" }}>
        <FlexBox h="48px" bg="none">
          <FlexBox>
            {/* 헤더 좌측 타이틀 */}
            <TextBox size="16px" alignW="left" color="#565656">
              <StarOutlined size="24px" style={{ marginRight: "8px" }} />
              북마크
            </TextBox>
          </FlexBox>
          {/* 헤더 우측 필터 */}
          <FlexBox
            w="320px"
            h="28px"
            bg="none"
            settings={{ justify: "flex-end" }}
          >
            <Button
              name="ALL"
              style={{ width: "48px", height: "28px" }}
              onClick={handleFilter}
            >
              <TextBox>전체</TextBox>
            </Button>
            <Button
              name="RED"
              style={getFilterStyle("RED", filterType === "RED")}
              onClick={handleFilter}
            />
            <Button
              name="YELLOW"
              style={getFilterStyle("YELLOW", filterType === "YELLOW")}
              onClick={handleFilter}
            />
            <Button
              name="GREEN"
              style={getFilterStyle("GREEN", filterType === "GREEN")}
              onClick={handleFilter}
            />
            <Button
              name="BLUE"
              style={getFilterStyle("BLUE", filterType === "BLUE")}
              onClick={handleFilter}
            />
            <Button
              name="PURPLE"
              style={getFilterStyle("PURPLE", filterType === "PURPLE")}
              onClick={handleFilter}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox
          h="180px"
          settings={{ justify: "flex-start", align: "start" }}
          style={ScrollStyle.scrollX}
        >
          {arrDisplay && arrDisplay?.length > 0 ? (
            arrDisplay?.map((bookmark, idx) => {
              return (
                <DragableBookmarkItem
                  bookmark={bookmark}
                  id={bookmark.bookmarkId}
                />
              );
            })
          ) : (
            <FlexBox settings={{ isVertical: true, justify: "center" }}>
              <Empty description={"아직 북마크한 장소가 없습니다"} />
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </FlexContainer>
  );
};

export default PlanBookmarkContainer;
