import { FlexContainer } from "../common/PLA_Containers";
import { ScrollStyle, TableStyles } from "../../styles/planStyles";
import { IconButton } from "../common/PLA_Buttons";
import { FlexBox } from "../common/PLA_FlexBox";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DownloadOutlined,
  EnvironmentFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import PlanTableHeader from "./table/PlanTableHeader";
import PlanTableContent from "./table/PlanTableContent";
import PlanTableFooter from "./table/PlanTableFooter";
import { Button } from "antd";
import { useState } from "react";
import { useTripPlan } from "../../hooks/plan/PlanTripContext";

const containerSetting = {
  isVertical: true,
  align: "center",
  justify: "center",
  flex: "",
};

/**
 * 계획 페이지 우측 여행 계획표 영역 컨테이너
 * @param {*} param0
 * @returns
 */
const PlanTableContainer = () => {
  const [isExpandHover, setIsExpandHover] = useState(false);
  const { isExpanded, setIsExpanded } = useTripPlan();
  return (
    <FlexContainer settings={containerSetting}>
      <FlexBox
        settings={{ isVertical: true }}
        style={{ padding: "8px 20px", position: "relative" }}
        bg="none"
      >
        {/* absolute: 확장 및 축소 버튼 */}
        <FlexBox w="12px" bg="none" style={{ position: "absolute", top: "0px", left: "0px",}}>
          <Button type="default" 
            style={{height: "100%", width: "100%", 
              padding: "0px", margin: "0px",
              border: "0px", borderRadius: "6px 0px 0px 6px", 
              backgroundColor: isExpandHover ? "#D9D9D9" : "#FFFFFF",
              opacity: isExpandHover ? 0.75 : 0.1
            }}
            onMouseOver={() => setIsExpandHover(true)}
            onMouseLeave={() => setIsExpandHover(false)}
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {
              isExpanded ? 
              <CaretRightOutlined/>
              :
              <CaretLeftOutlined/>
            }
          </Button>
        </FlexBox>

        {/* 여행 계획표 타이틀 영역 */}
        <FlexBox h="52px" bg="none">
          <FlexBox w="auto" h="auto" bg="none" style={TableStyles.titleStyle} settings={{ justify: "flex-start" }}>
            <EnvironmentFilled />
            여행 계획표
          </FlexBox>
          <FlexBox w="108px" bg="none">
            <IconButton width="48px" height="36px" type="default">
              <ShareAltOutlined />
            </IconButton>
            <IconButton width="48px" height="36px" type="default">
              <DownloadOutlined />
            </IconButton>
          </FlexBox>
        </FlexBox>

        {/* 여행 계획표 헤더 영역 */}
        <PlanTableHeader styles={TableStyles} />

        {/* 여행 계획표 테이블 영역 */}
        <FlexBox
          h="80%"
          bg="none"
          style={ ScrollStyle.scrollY }
          settings={{ justify: "flex-start" }}
        >
          <PlanTableContent style={TableStyles.tableStyle} />
        </FlexBox>

        {/* 하단 여행 요약 및 인원 예산 영역 */}
        <PlanTableFooter styles={TableStyles} />
      </FlexBox>
    </FlexContainer>
  );
};

export default PlanTableContainer;
