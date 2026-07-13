import { CaretDownOutlined, CaretUpOutlined, StarOutlined } from "@ant-design/icons";
import { ScrollStyle } from "../../styles/planStyles";
import { FlexContainer } from "../common/PLA_Containers";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import { useEffect, useState } from "react";
import { Button, Empty } from "antd";
import { getBookmarkColor } from "../../utils/plan/bookmarkUtils";
import DraggableBookmarkItem from "../bookmark/DraggableBookmarkItem";
import planBookmarkStore from "../../store/trip/planBookmarkStore";
import planUIStore from "../../store/trip/planUIStore";
import { TextButton } from "../common/PLA_Buttons";
import { Sparkles } from "lucide-react";
import tripRecommandStore from "../../store/trip/tripRecommandStore";

const PlanBookmarkContainer = () => {
  const bookmarks = planBookmarkStore((state) => state.bookmarks);
  const isExpandBookmark = planUIStore((state) => state.isExpandBookmark);
  const setIsExpandBookmark = planUIStore((state) => state.setIsExpandBookmark);
  const canExpandBookmark = planUIStore((state) => state.canExpandBookmark);

  // 연관 여행지 추천 여부 
  const isRecommend = tripRecommandStore((state) => state.isRecommend);
  const setIsRecommend = tripRecommandStore((state) => state.setIsRecommend);
  const setIsRecommendPopup = tripRecommandStore((state) => state.setIsRecommendPopup);
  const setFocusPlace = tripRecommandStore((state) => state.setFocusPlace);
  
  const [isExpandHover, setIsExpandHover] = useState(false);
  const [filterBookmarks, setFilterBookmarks] = useState([]);
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
        setFilterBookmarks(bookmarks);
        break;
      default:
        setFilterBookmarks(bookmarks.filter((b) => b.bookmarkType == type));
        break;
    }
  };

  useEffect(() => {
    setFilterBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    console.log("filterBookmarks:: ", filterBookmarks);
  }, [filterBookmarks]);

  return (
    <FlexContainer>
      <FlexBox settings={{ isVertical: true }} style={{ padding: "14px 30px" }}>
        {/* absolute: 확장 및 축소 버튼 */}
        <FlexBox h="12px" bg="none" style={{ position: "absolute", bottom: "0px", left: "0px"}}>
          <Button type="default" disabled={!canExpandBookmark}
            style={{height: "100%", width: "100%", 
              padding: "0px", margin: "0px",
              border: "0px", borderRadius: "6px 0px 0px 6px", 
              backgroundColor: isExpandHover ? "#D9D9D9" : "#FFFFFF",
              opacity: isExpandHover ? 0.75 : 0.1
            }}
            onMouseOver={() => {if(canExpandBookmark) setIsExpandHover(true)}}
            onMouseLeave={() => setIsExpandHover(false)}
            onClick={() => setIsExpandBookmark(prev => !prev)}
          >
            {
              isExpandBookmark ? 
              <CaretUpOutlined/>
              :
              <CaretDownOutlined/>
            }
          </Button>
        </FlexBox>

        <FlexBox h="36px" bg="none">
          <FlexBox>
            {/* 헤더 좌측 타이틀 */}
            <TextBox size="16px" alignW="left" color="#565656">
              <StarOutlined size="24px" style={{ marginRight: "8px" }} />
              북마크
              <TextButton type="default" width="190px" height="25px" fontSize="14px" 
                style={{marginLeft: "15px", marginRight: "8px",
                  backgroundColor: isRecommend ? "#FFFFFF" : "#E5E5E5",
                  border: isRecommend ? "1px solid #444444" : "1px solid #BDBDBD",
                  color: isRecommend ? "#222222" : "#7A7A7A",
                  boxShadow: isRecommend ? "0 2px 5px rgba(0,0,0,0.18)" : "inset 0 2px 4px rgba(0,0,0,0.15)",    
                  transform: isRecommend ? "translateY(0)" : "translateY(1px)",
                  transition: "all 0.2s ease",
                }}
                onClickEvent={() => {setIsRecommend(!isRecommend); setIsRecommendPopup(false); setFocusPlace("");}}>
                <Sparkles size={15} style={{marginRight: "5px", position: "relative", top: "2px"}}/> 
                연관여행지 추천 받기!
              </TextButton>
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
          h={isExpandBookmark? "180px" : "44px"}
          settings={{ justify: "flex-start", align: "start" }}
          style={ScrollStyle.scrollX}
        >
          {filterBookmarks && filterBookmarks?.length > 0 ? (
            filterBookmarks?.map((bookmark, idx) => {
              return (
                <DraggableBookmarkItem
                  bookmark={bookmark}
                  id={bookmark.bookmarkId}
                />
              );
            })
          ) : (
            <FlexBox settings={{ isVertical: true, justify: "center" }}>
              {isExpandBookmark ? <Empty description={"아직 북마크한 장소가 없습니다..."} />
              : <TextBox size="14px" weight={300}>아직 북마크한 장소가 없습니다...</TextBox>}
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </FlexContainer>
  );
};

export default PlanBookmarkContainer;
