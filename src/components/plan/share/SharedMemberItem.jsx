import React from 'react'
import { FlexBox, TextBox } from '../../common/PLA_FlexBox'
import { Select } from 'antd'

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
      <Select defaultValue={member?.role || "뷰어"} style={{ width: "100px", border: "none", textAlign: "center" }}>
        <Option value="viewer" style={{ textAlign: "center" }}>뷰어</Option>
        <Option value="editor" style={{ textAlign: "center" }}>편집자</Option>
      </Select>
    </FlexBox>
  )
}

export default SharedMemberItem
