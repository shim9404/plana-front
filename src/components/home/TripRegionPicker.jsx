import { Cascader } from "antd";
import styles from "../../styles/TripInfoSelector.module.css";
import { useEffect, useState } from "react";
import { FlexBox, TextBox } from "../common/PLA_FlexBox";
import { LoadingOutlined } from "@ant-design/icons";
import { useRegion } from "../../hooks/home/RegionContext";

const TripRegionPicker = ({ width = "400px", height = "52px", ...rest }) => {
  const { regionData } = useRegion();
  const { cascaderOptions } = regionData;

  const [existData, setExistData] = useState(cascaderOptions && cascaderOptions !== undefined && cascaderOptions?.length > 0);
  const labelStyle = {
    justifyContent: "flex-start",
    color: "#565656",
    width: width,
    height: height,
    fontSize: "16px",
  };

  useEffect(() => {
    setExistData(cascaderOptions && cascaderOptions !== undefined && cascaderOptions?.length > 0);
  }, [cascaderOptions]);

  return (
    <>
      {existData ? (
        <Cascader
          {...rest}
          options={cascaderOptions}
          rootClassName={styles.customPopup}
          style={labelStyle}
          placeholder="여행 지역을 선택해 주세요"
        />
      ) : (
        <FlexBox w={width} h={height} settings={{ justify: "center" }} style={{ border: "solid 1px #D9D9D9", borderRadius: "8px" }}>
          <LoadingOutlined style={{ margin: "12px" }} />
          <TextBox />
          데이터 로딩중...
        </FlexBox>
      )}
    </>
  );
};

export default TripRegionPicker;
