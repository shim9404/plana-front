import { ConfigProvider } from "antd";
import { FlexBox } from "../../common/PLA_FlexBox";
import Search from "antd/es/input/Search";

const SearchInput = ({ placeholder, onSearchEvent }) => {
  return (
    <ConfigProvider theme={{
        components: {
          Button: {
            defaultShadow: "none",
          },
        },
      }}>
      <FlexBox w="100%" h="100%" style={{ position: "relative", overflow: "hidden" }}>
        <Search placeholder={placeholder} onSearch={onSearchEvent} size="large" style={{ width: "100%" }} />
      </FlexBox>
    </ConfigProvider>
  );
};

export default SearchInput;
