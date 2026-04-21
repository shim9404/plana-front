import { Input, InputNumber } from "antd";
import { FlexBox } from "../../common/PLA_FlexBox";
import { useState } from "react";

const PlanTableFooter = ({ styles, start, end, day, totalPrice }) => {

  const [entryCount, setEntryCount] = useState(1);
  const [memberPrice, setMemberPrice] = useState(0);

  const onChangeEntryCount = (value) => {
    setEntryCount(value);
    setMemberPrice(totalPrice / value);
  }

  return (
    <FlexBox h="40px" style={styles.footerStyle}>
      <FlexBox w="240px" settings={{ justify: "center" }}>
        {`${start ?? "1970.01.01"}-${end ?? "1970.01.01"} (${day ?? 1}박 ${day ?? 1 + 1}일)`}
      </FlexBox>
      <FlexBox w="440px" settings={{ justify: "space-around" }}>
        <FlexBox w="110px">
          <FlexBox w="56px">참여 인원</FlexBox>
          <FlexBox w="48px">
            <InputNumber min={1} value={entryCount} style={styles.footerInputStyle} 
            onChange={onChangeEntryCount}/>
          </FlexBox>
        </FlexBox>
        <FlexBox w="150px">
          <FlexBox w="48px">총 예산</FlexBox>
          <FlexBox w="100px">
            <Input
              style={styles.footerInputStyle}
              disabled
              value={`${totalPrice ?? 0} 원`}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox w="132px">
          <FlexBox w="40px">인당</FlexBox>
          <FlexBox w="110px">
            <Input
              style={styles.footerInputStyle}
              disabled
              value={`${memberPrice ?? "0"} 원`}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default PlanTableFooter;
