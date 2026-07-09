import { Button, Input, Select, Switch } from "antd";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { IconButton } from "../../common/PLA_Buttons";
import { LinkOutlined } from "@ant-design/icons";
import SharedMemberItem from "./SharedMemberItem";

export const PopoverShareTitle = () => {
  return (
    <FlexBox settings={{ isVertical: true, justify: "center", align: "center" }} bg="none">
      <FlexBox>
        <FlexBox w="80%">
          <TextBox w="auto" alignW="left" size="20px" weight={700} bg="none" color="#565656">
            여행 계획 공유
          </TextBox>
        </FlexBox>
        {/* 링크 복사 */}
        <IconButton width="32px" height="32px">
          <LinkOutlined />
        </IconButton>
      </FlexBox>
      <hr style={{width: "100%", marginTop: "8px"}}/>

    </FlexBox>
  )
};

export const PopoverShareContent = ({isShared, setIsShared}) => {
  return (
    <FlexBox w="400px" h="100%" settings={{ isVertical: true, justify: "center", align: "center" }} bg="none">
      {/* 초대 이메일 입력란 및 초대 버튼 */}
      <FlexBox style={{ margin: "4px 0px 12px 0px"}}>
        <Input placeholder="초대 이메일 입력" style={{ width: "78%", height: "32px", borderRadius: "4px", padding: "0px 8px" }} />
        <Button style={{ width: "20%", height: "32px", borderRadius: "4px" }}>초대</Button>
      </FlexBox>
      {/* 초대자 목록 및 권한 설정 */}
      <FlexBox h="100%" w="100%" settings={{ isVertical: true, justify: "start", align: "start" }} bg="none" style={{ margin: "8px 0px", gap: "8px"  }}>
        {/* 멤버 아이템 */}
        <SharedMemberItem />
        <SharedMemberItem />
        <SharedMemberItem />
        <SharedMemberItem />
        <SharedMemberItem />
        <SharedMemberItem />
      </FlexBox>
      <hr style={{width: "100%", marginTop: "8px"}}/>
      {/* 여행 계획 접근 권한 : 공유된 사람 or 링크 소유자 */}
      <FlexBox h="32px" w="100%" settings={{ justify: "space-between", align: "center" }} bg="none" style={{ marginTop: "8px", padding: "0px 8px" }}>
        <TextBox w="240px" alignW="left" color="#565656" size="14px" bg="none">여행 계획 접근 권한</TextBox>
        <FlexBox w="180px" bg="none">
          <TextBox>링크가 있는 모든 사용자</TextBox>
          <Switch
            size="small"
            checkedChildren="허용"
            unCheckedChildren="거부"
            value={isShared}
            onChange={(checked) => setIsShared(checked)}
            />
        </FlexBox>
      </FlexBox>

    </FlexBox>
  )
}
