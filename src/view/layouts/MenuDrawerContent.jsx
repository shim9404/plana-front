import { FlexBox } from '../../components/common/PLA_FlexBox';

const MenuDrawerContent = (onClose, open) => {
  return (
    // TODO: 버튼 Navigation, 로그인, 마이페이지 등 동작 
    <FlexBox settings={{ isVertical: true, justify: 'start' }} style={{ padding: 16, gap: 16 }}>
      <FlexBox h="48px" bg="none">
        로그인 / 내 정보
      </FlexBox>
      <hr style={{width: "100%"}}/>
      <FlexBox h="48px" bg="none">
        내 여행
      </FlexBox>
      <FlexBox h="48px" bg="none">
        라운지
      </FlexBox>
    </FlexBox>
  )
}

export default MenuDrawerContent;
