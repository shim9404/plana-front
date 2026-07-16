import { Button, Input, message, Select, Switch } from "antd";
import { FlexBox, TextBox } from "../../common/PLA_FlexBox";
import { IconButton } from "../../common/PLA_Buttons";
import { LinkOutlined } from "@ant-design/icons";
import SharedMemberItem from "./SharedMemberItem";
import { MEMBER_SHARING_OPTIONS } from "../../../Constants/tripShare";
import { useState } from "react";
import { inviteMemberApi, shareTripApi, unshareTripApi } from "../../../services/tripApi";
import tripInfoStore from "../../../store/trip/tripInfoStore";
import modalStore from "../../../store/modalStore";

export const PopoverShareTitle = () => {
  const shareToken = tripInfoStore((state) => state.shareToken);
  
  const handleCopyShareLink = () => {
    if (shareToken && shareToken.length > 0) {
      const shareLink = `${window.location.origin}/plan/share/${shareToken}`;
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          message.success("공유 링크가 복사되었습니다.");
        })
        .catch((error) => {
          message.error("공유 링크 복사에 실패했습니다.");
          console.error("Error copying share link:", error);
        });
    } else {
      const shareLink = `${window.location}`;
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          message.success("공유 링크가 복사되었습니다.");
        })
        .catch((error) => {
          message.error("공유 링크 복사에 실패했습니다.");
          console.error("Error copying share link:", error);
        });
    }
  }
  return (
    <FlexBox settings={{ isVertical: true, justify: "center", align: "center" }} bg="none">
      <FlexBox>
        <FlexBox w="80%">
          <TextBox w="auto" alignW="left" size="20px" weight={700} bg="none" color="#565656">
            여행 계획 공유
          </TextBox>
        </FlexBox>
        {/* 링크 복사 */}
        <IconButton width="32px" height="32px" onClick={handleCopyShareLink}>
          <LinkOutlined />
        </IconButton>
      </FlexBox>
      <hr style={{width: "100%", marginTop: "8px"}}/>

    </FlexBox>
  )
};

export const PopoverShareContent = () => {
  const tripId = tripInfoStore((state) => state.tripId);
  const shareToken = tripInfoStore((state) => state.shareToken);
  const setShareToken = tripInfoStore((state) => state.setShareToken);
  const openTwoBtnModal = modalStore((state) => state.openTwoBtnModal);

  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputRole, setInputRole] = useState("VIEWER");
  
  /**
   * 공유 토큰 API 요청
   * @param {*} successCallback 
   */
  const requestShareTrip = async(successCallback) => {
    try {
      const result = await shareTripApi(tripId);
      if (result) {
        const data = result.data;
        successCallback?.(data);
      }
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  /**
   * 공유 중단 API 요청
   * @param {*} successCallback 
   */
  const requestUnshareTrip = async(successCallback) => {
    try {
      const isSuccess = await unshareTripApi(tripId);
      console.log("unshareTripApi", isSuccess);
      if (isSuccess) {
        successCallback?.();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 단건 여행 데이터 조회 API 요청
   * @param {} tripId 
   * @param {*} successCallback 
   */
  const requestInviteMember = async(tripId, successCallback) => {
    try {
      const result = await inviteMemberApi(tripId, {
        invitedEmail: inputEmail,
        role: inputRole
      });
      if (result) {
        const data = result.data;
        successCallback?.(data);
      }
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeInputEmail = (e) => {
    setInputEmail(e.target.value);
    setIsTypingEmail(!!e.target.value);
  }
  
  const handleInviteMember = () => {
    if (!inputEmail) {
      message.warning("초대할 멤버 이메일을 입력해주세요.");
      return;
    }
    requestInviteMember(tripId, (data) => {
      message.success("여행 계획 초대 메일을 발송했습니다!");

      console.log("초대 성공", data);
    });
  }

  const handleShareTrip = () => {

    // 여행 링크 공개 상태의 경우
    if (shareToken && shareToken.length > 0) {
      openTwoBtnModal({
        title: "초대된 멤버에게만 여행 공개",
        message: "기존 링크로 여행 계획을 볼 수 없게 됩니다.\n여행 계획 공유를 비활성화 하시겠습니까?",
        type: "success",
        onOk: async() => {
          requestUnshareTrip(() => {
            setShareToken("");
          });
        }
      });

    } else {  // 여행 링크 비공개 상태의 경우
      openTwoBtnModal({
        title: "링크가 있는 모든 사용자에게 여행 공개",
        message: "링크를 가진 모든 사용자가 여행 계획을 볼 수 있습니다.\n여행 계획 공유를 활성화 하시겠습니까?",
        type: "success",
        onOk: async() => {
          requestShareTrip((data) => {
            setShareToken(data.shareToken);
          });
        }
      });
    }
  }


  return (
    <FlexBox w="400px" h="100%" settings={{ isVertical: true, justify: "center", align: "center" }} bg="none">
      {/* 초대 이메일 입력란 및 초대 버튼 */}
      <FlexBox style={{ margin: "4px 0px 12px 0px", position: "relative" }}>
        {/* 이메일 입력 */}
        <Input placeholder="초대 이메일 입력" style={{ height: "32px", borderRadius: isTypingEmail ? "8px 0px 0px 8px" : "8px", padding: "0px 8px" }} 
          onChange={handleChangeInputEmail}/>
        {/* 권한 설정 */}
        {
          isTypingEmail && 
          <Select defaultValue={"VIEWER"} style={{ height: "32px", width: "96px", borderRadius: "0px 8px 8px 0px", textAlign: "center", fontSize: "14px", color: "#565656" }}
          options={MEMBER_SHARING_OPTIONS}
          value={inputRole}
          onChange={(value) => setInputRole(value)}
          popupRender={menu => {
            return (
            <FlexBox w="100%" style={{overflow: "hidden", right: "28px", textAlign: "center"}} settings={{isVertical: true, align:"stretch"}}>
              {menu}
            </FlexBox>
            )
          }}>
          </Select>
        }
        {/* 초대 버튼 */}
        <Button style={{ minWidth: "64px", height: "32px", marginLeft: "4px", borderRadius: "8px" }} onClick={handleInviteMember}>
          초대
        </Button>
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
            value={shareToken && shareToken.length > 0}
            onChange={handleShareTrip}
            />
        </FlexBox>
      </FlexBox>

    </FlexBox>
  )
}
