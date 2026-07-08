import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { IconButton } from "../../common/PLA_Buttons";
import { Undo2 } from "lucide-react";
import tripRecommandStore from "../../../store/trip/tripRecommandStore";
import RowBookmarkItem from "../../bookmark/RowBookmarkItem";
import RelationAreaItem from "./RelationAreaItem";
import { Empty } from "antd";
import tripRegionStore from "../../../store/trip/tripRegionStore";
import { getRealatedPlaceApi } from "../../../services/areaApi";
import LoadingOverlay from "../../common/LoadingOverlay";

const RecommendPopup = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  // 시군구 코드
  const selectedSigu = tripRegionStore((state) => state.selectedSigu);
  // 중심 여행지
  const focusPlace = tripRecommandStore((state) => state.focusPlace);

  // 연관 여행지
  const [placeList, setPlaceList] = useState([]);
  useEffect(() => {
  const RelatedPlaces = async () => {
    if (!focusPlace) return;
    try {
      setLoading(true);
      const result = await getRealatedPlaceApi(focusPlace.areaInfo?.name, selectedSigu, 1);
      setPlaceList(result.data.themes || []);
    } catch (e) {
      console.warn(`장소 데이터 호출 오류`);
    } finally {
      setLoading(false);
    }
  };

  RelatedPlaces();
}, [focusPlace])

  // hover 표시
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <FlexBox
      settings={{ isVertical: true, justify: "center", align: "center"}}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5,
      }}
    >
      {/* 상단 */}
      <FlexBox w="450px" h="50px"
        settings={{ justify: "flex-end" }}
        style={{position: "absolute", top: "calc(50% - 355px)", gap: "10px", alignItems: "center"}}
      >
        {showBackButton ? (
          <IconButton width="220px" height="40px" fontSize="15px" type="default"
            onMouseEnter={() => setShowBackButton(true)}
            onMouseLeave={() => setShowBackButton(false)}
          >
            <Undo2 size="25px" color="#A8A8A8" />
              <TextBox style={{ marginLeft: "10px", fontSize: "15px" }}>
                추천 받지 않고 돌아가기
              </TextBox>
          </IconButton>
          ) : (
          <IconButton width="40px" height="40px" fontSize="15px" type="default"
            onClickEvent={onClose}
            onMouseEnter={() => setShowBackButton(true)}
          >
          <Undo2 size="25px" color="#A8A8A8" />
          </IconButton>
        )}
      </FlexBox>
      {/* 팝업 */}      
      <FlexBox w="450px" h="600px" bg="#FFFFFF"
        settings={{isVertical:true, justify:"flex-start"}}
        style={{filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))", padding:"20px", borderRadius:"16px", position:"relative"}}>
        <LoadingOverlay loading={loading}>
          <FlexBox w="100%" h="560px" settings={{isVertical:true, justify:"flex-start"}}>
            {/* 헤더 */}
            {focusPlace && (
              <RowBookmarkItem
                bookmark={focusPlace}
                id={focusPlace.bookmarkId}
              />
            )}
            <FlexBox h="40px" bg="none" 
              settings={{justify: "flex-start"}}
              style={{gap: "10px"}}
            >
              <TextBox color="black" style={{fontSize: "20px", fontWeight: "bold", marginTop: "30px"}}>
                이 여행지의 연관 여행지 추천
              </TextBox>
            </FlexBox>
            {/* 리스트 */}
            <FlexBox h="500px" w="400px" bg="#F3F3F3"
              settings={{isVertical: true, justify: "flex-start"}}
              style={{gap: "10px", marginTop: "20px", overflow: "hidden", borderRadius: "10px" }}
            >
              <FlexBox h="30px" bg="#B3B3B3" 
                settings={{ justify: "space-between" }} 
                style={{padding: "0 60px", borderRadius: "10px 10px 0 0", flexShrink: 0}}
              >
                <TextBox color="#FFFFFF" style={{fontSize: "14px"}}>
                  연관 여행지
                </TextBox>
                <SearchOutlined style={{color: "#FFFFFF", fontSize: "18px"}}/>
              </FlexBox>
              <FlexBox h="calc(100% - 35px)" bg="none"
                settings={{isVertical: true, justify: "flex-start"}} style={{gap: "10px", overflowY: "auto", padding: "10px"}}
              >
                {placeList?.length > 0 ? (
                  placeList.map((item, idx) => (
                    <RelationAreaItem key={idx} item={item}/>
                  ))
                ) : (
                  <FlexBox settings={{ isVertical: true, justify: "center" }}>
                    <Empty description={"검색 결과가 없습니다😥"} />
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>   
          </FlexBox>    
        </LoadingOverlay>
      </FlexBox>       
    </FlexBox>
  );
};

export default RecommendPopup;