import { Flex } from "antd";

export const FlexBox = ({ children, settings, w="100%", h="100%", bg, style, ...rest }) => {
  return (
    <Flex
      style={{ width: w, height: h, backgroundColor: bg, ...style }}
      vertical={settings?.isVertical}
      align={settings?.align ?? "center"}
      justify={settings?.justify ?? "space-between"}
      flex={settings?.flex}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const TextBox = ( { children, w="100%", h="100%", size="12px", weight=500, color="#A8A8A8", 
  alignW="center", alignH="center", bg, style, ...rest } ) => {
  const justify = alignW === "left" ? "flex-start" : alignW === "right" ? "flex-end" : "center";
  const align = alignH === "top" ? "start" : alignH === "bottom" ? "end" : "center";

  return (
    <Flex
      style={{ width: w, height: h, fontSize: size, fontWeight: weight, color: color, backgroundColor: bg, lineHeight: "100%", ...style }}
      align={align ?? "center"}
      justify={justify ?? "center"}
      flex={1}
      {...rest}
    >
      {children}
    </Flex>
  );
}
