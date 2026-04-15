import { Flex, Layout } from "antd";
import PageLayout from "../../components/common/PageLayout";
import { FlexContainer } from "../../components/common/PLA_Containers";
import Map from "../../components/home/Map";


const HomePage = () => {

  const flexStyle = {
    backgroundColor: "#D0DBEB", // 레이아웃 확인용 색상 (개발 완료 후 색상 제거)
    width: "100%",
    height: "100%"
  };


  return (
    <PageLayout isVisiableFooter>
      <Flex flex={1} justify="flex-end" align="flex-start" style={flexStyle}>
        <Map />
      </Flex>
    </PageLayout>
  );
};

export default HomePage;
