import { ConfigProvider } from "antd";
import { FlexBox } from "../../common/PLA_FlexBox";
import Search from "antd/es/input/Search";

const SearchInput = ({ placeholder, value, onSearchEvent, onChange }) => {
  return (
    <ConfigProvider theme={{
        components: {
          Button: {
            defaultShadow: "none",
          },
        },
      }}>
      <FlexBox w="100%" h="100%" style={{ position: "relative", overflow: "hidden" }}>
        <Search placeholder={placeholder} onSearch={onSearchEvent} size="large" style={{ width: "100%" }} 
          value={value} onChange={(e) => onChange(e.target.value)}/>
      </FlexBox>
    </ConfigProvider>
  );
};

export default SearchInput;
