import React from 'react'
import { FlexBox, TextBox } from '../../common/PLA_FlexBox'
import { Select } from 'antd'
import { MEMBER_SHARING_OPTIONS } from '../../../Constants/tripShare'
import { TextButton } from '../../common/PLA_Buttons'

const SharedMemberItem = ({member}) => {
  return (
    <FlexBox h="32px" w="100%" settings={{ justify: "space-between", align: "center" }} style={{ gap: "8px" }} bg="none">
      {/* 프로필 이미지 */}
      <FlexBox w="32px" h="32px" bg="gray" style={{ borderRadius: "50%", overflow: "hidden" }}>
        <img src={member?.profileImage} alt={member?.name} />
      </FlexBox>
      {/* 멤버 정보 */}
      <FlexBox w="250px" settings={{isVertical: true}}>
        {/* 닉네임 */}
        <TextBox alignW="left" color="#565656" size="14px">{member?.name || "이름 없음"}</TextBox>
        {/* 이메일 */}
        <TextBox alignW="left" color="#A8A8A8" size="12px">{member?.email || "이메일 없음"}</TextBox>
      </FlexBox>
      {/* 권한 설정 */}
      <Select defaultValue={member?.role || "VIEWER"} style={{ height: "28px", width: "96px", border: "none", textAlign: "center", fontSize: "14px", color: "#565656" }}
      options={MEMBER_SHARING_OPTIONS}
      popupRender={menu => {
        return (
        <FlexBox w="100%" style={{overflow: "hidden", textAlign: "center"}} settings={{isVertical: true, align:"stretch"}}>
          {menu}
          <FlexBox settings={{isVertical: true}} style={{borderTop: "solid 1px #D9D9D9", paddingTop: "8px", gap: "4px"}}>
            <TextButton width="100%" height="28px"  type="primary">
              다시 초대
            </TextButton>
            <TextButton width="100%" height="28px"  type="primary" danger>
              제거
            </TextButton>
          </FlexBox>
        </FlexBox>
        )
      }}>

      </Select>
    </FlexBox>
  )
}

export default SharedMemberItem
