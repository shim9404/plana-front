import { FlexContainer } from "../common/PLA_Containers";
import { TableStyles } from "../../styles/planStyles";
import { IconButton } from "../common/PLA_Buttons";
import { FlexBox } from "../common/PLA_FlexBox";
import {
  DownloadOutlined,
  EnvironmentFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import PlanTableHeader from "./table/PlanTableHeader";
import PlanTableContent from "./table/PlanTableContent";
import PlanTableFooter from "./table/PlanTableFooter";

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
  return (
    <FlexContainer settings={containerSetting}>
      <FlexBox
        settings={{ isVertical: true }}
        style={{ padding: "8px 20px" }}
        bg="none"
      >
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

        <PlanTableHeader styles={TableStyles} />

        {/* 여행 계획표 테이블 영역 */}
        <FlexBox
          h="80%"
          bg="none"
          style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,0.25) transparent",
          }}
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
