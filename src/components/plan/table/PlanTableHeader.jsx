import { useContext } from "react";
import { FlexBox } from "../../common/PLA_FlexBox";
import { DeleteFilled } from "@ant-design/icons";
import { PlanTableContext } from "../contexts/PlanTableContext";

const PlanTableHeader = ({ styles }) => {
  const { isCollapsed } = useContext(PlanTableContext);

  return (
    <FlexBox h="30px" style={styles.headerStyle}>
      {/* 기본 항목 */}
      <FlexBox>
        <FlexBox w="72px" style={styles.headerTextStyle}>
          일자
        </FlexBox>
        <FlexBox w="92px" style={styles.headerTextStyle}>
          출발시간
        </FlexBox>
        <FlexBox w="92px" style={styles.headerTextStyle}>
          도착시간
        </FlexBox>
        <FlexBox w="76px" style={styles.headerTextStyle}>
          구분
        </FlexBox>
        <FlexBox w="330px" style={styles.headerTextStyle}>
          장소
        </FlexBox>
      </FlexBox>
      {/* 확장 시 추가 항목 */}
      {isCollapsed && (
        <FlexBox>
          <FlexBox w="220px" style={styles.headerTextStyle}>
            메모
          </FlexBox>
          <FlexBox w="80px" style={styles.headerTextStyle}>
            예산
          </FlexBox>
          <FlexBox w="48px" style={styles.headerTextStyle}>
            링크
          </FlexBox>
        </FlexBox>
      )}
      {/* 휴지통 */}
      <FlexBox w="48px" style={styles.headerTextStyle}>
        <DeleteFilled />
      </FlexBox>
    </FlexBox>
  );
};

export default PlanTableHeader;
