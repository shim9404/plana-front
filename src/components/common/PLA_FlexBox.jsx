import { Flex } from "antd";

export const FlexBox = ({ children, settings, w="100%", h="100%", bg, style }) => {
  return (
    <Flex
      style={{ width: w, height: h, backgroundColor: bg, ...style }}
      vertical={settings?.isVertical}
      align={settings?.align ?? "center"}
      justify={settings?.justify ?? "space-between"}
      flex={settings?.flex}
    >
      {children}
    </Flex>
  );
};