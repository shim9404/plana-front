import { useContext } from "react";
import { FlexBox } from "../../common/PLA_FlexBox";
import { DeleteFilled } from "@ant-design/icons";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";

// 708px
const DefaultHeaderContents = ({ styles }) => {
  return (
    <FlexBox>
      <FlexBox w="15%" bg="none" style={styles.headerTextStyle}>
        출발시간
      </FlexBox>
      <FlexBox w="15%" bg="none" style={styles.headerTextStyle}>
        도착시간
      </FlexBox>
      <FlexBox w="14%" bg="none" style={styles.headerTextStyle}>
        구분
      </FlexBox>
      <FlexBox w="46%" bg="none" style={styles.headerTextStyle}>
        장소
      </FlexBox>
      <FlexBox
        w="10%"
        bg="none"
        style={{ minWidth: "48px", ...styles.headerTextStyle }}
      >
        <DeleteFilled />
      </FlexBox>
    </FlexBox>
  );
};

// 1392px
const ExpandedHeaderContents = ({ styles }) => {
  return (
    <FlexBox>
      <FlexBox w="7.5%" bg="none" style={styles.headerTextStyle}>
        출발시간
      </FlexBox>
      <FlexBox w="7.5%" bg="none" style={styles.headerTextStyle}>
        도착시간
      </FlexBox>
      <FlexBox w="6%" bg="none" style={styles.headerTextStyle}>
        구분
      </FlexBox>
      <FlexBox w="24%" bg="none" style={styles.headerTextStyle}>
        장소
      </FlexBox>
      <FlexBox w="29%" bg="none" style={styles.headerTextStyle}>
        메모
      </FlexBox>
      <FlexBox w="15%" bg="none" style={styles.headerTextStyle}>
        예산
      </FlexBox>
      <FlexBox w="4%" bg="none" style={styles.headerTextStyle}>
        링크
      </FlexBox>
      <FlexBox
        w="7%"
        bg="none"
        style={{ minWidth: "48px", ...styles.headerTextStyle }}
      >
        <DeleteFilled />
      </FlexBox>
    </FlexBox>
  );
};

const PlanTableHeader = ({ styles }) => {
  const { isExpanded } = useTripPlan();

  return (
    <FlexBox h="30px" style={styles.headerStyle}>
      <FlexBox
        w="80px"
        bg="none"
        style={{ minWidth: "80px", ...styles.headerTextStyle }}
      >
        일자
      </FlexBox>
      {isExpanded ? (
        <ExpandedHeaderContents styles={styles} />
      ) : (
        <DefaultHeaderContents styles={styles} />
      )}
    </FlexBox>
  );
};

export default PlanTableHeader;
