import { Flex, Space } from "antd";

const boxStyle = {
  backgroundColor: "#ffffff",
  display: "flex",
  filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))",
  border: "solid 1px #A8A8A8",
  borderRadius: "8px",
  width: "100%",
  height: "100%",
};

/**
 * antd.Flex : 요소 간 간격 설정에 용이한 컨테이너
 * https://ant.design/components/flex
 * @param {*} props 
 * @returns 
 */
export const FlexContainer = ({ children, bg="#FFFFFF", settings, ...rest }) => {
  return (
    <Flex style={{...boxStyle, backgroundColor: bg}}
      vertical={settings?.isVertical}
      align={settings?.align}
      justify={settings?.justify}
      flex={settings?.flex}
      {...rest}>
      {children}
    </Flex>
  );
};

/**
 * antd.Space : 인라인 요소 간격 설정에 용이
 * https://ant.design/components/space
 * @param {*} props 
 * @returns 
 */
export const SpaceContainer = ({ children, settings, ...rest }) => {
  return (
    <Space style={boxStyle}
      vertical={settings?.isVertical}
      align={settings?.align}
      {...rest}>
      {children}
    </Space>
  );
};

export const FloatingContainer = ({ children, settings, ...rest }) => {
  return (
    <Flex style={{ ...boxStyle, position: "absolute", zIndex: "10", backgroundColor: settings?.backgroundColor, top: settings?.top, left: settings?.left, transform: settings?.transform }}
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
