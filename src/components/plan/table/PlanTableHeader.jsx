import { FlexBox } from "../../common/PLA_FlexBox";
import { DeleteFilled } from "@ant-design/icons";
import { useTripPlan } from "../../../hooks/plan/PlanTripContext";

const DefaultHeaderContents = ({ styles }) => {
  return (
    <FlexBox w="auto" settings={{justify: "flex-start"}}>
      <FlexBox w="92px" bg="none" style={styles.headerTextStyle}>
        출발시간
      </FlexBox>
      <FlexBox w="92px" bg="none" style={styles.headerTextStyle}>
        도착시간
      </FlexBox>
      <FlexBox w="88px" bg="none" style={styles.headerTextStyle}>
        구분
      </FlexBox>
      <FlexBox w="300px" bg="none" style={styles.headerTextStyle}>
        장소
      </FlexBox>
    </FlexBox>
  );
};

const ExpandedHeaderContents = ({ styles }) => {
  return (
    <FlexBox w="auto" settings={{justify: "flex-start"}}>
      <FlexBox w="92px" bg="none" style={styles.headerTextStyle}>
        출발시간
      </FlexBox>
      <FlexBox w="92px" bg="none" style={styles.headerTextStyle}>
        도착시간
      </FlexBox>
      <FlexBox w="88px" bg="none" style={styles.headerTextStyle}>
        구분
      </FlexBox>
      <FlexBox w="300px" bg="none" style={styles.headerTextStyle}>
        장소
      </FlexBox>
      <FlexBox w="380px" bg="none" style={styles.headerTextStyle}>
        메모
      </FlexBox>
      <FlexBox w="160px" bg="none" style={styles.headerTextStyle}>
        예산
      </FlexBox>
      <FlexBox w="100px" bg="none" style={styles.headerTextStyle}>
        링크
      </FlexBox>

    </FlexBox>
  );
};

const PlanTableHeader = ({ styles }) => {
  const { isExpanded } = useTripPlan();

  return (
    <FlexBox h="30px" style={styles.headerStyle} settings={{justify: "flex-start"}}>
      <FlexBox w="85px" bg="none" style={{ ...styles.headerTextStyle }} >
        일자
      </FlexBox>
      {isExpanded ? (
        <ExpandedHeaderContents styles={styles} />
      ) : (
        <DefaultHeaderContents styles={styles} />
      )}
      <FlexBox w="36px" bg="none" style={styles.headerTextStyle} >
        <DeleteFilled />
      </FlexBox>
    </FlexBox>
  );
};

export default PlanTableHeader;
