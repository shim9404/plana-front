import { Button, Flex } from 'antd';
import styled from 'styled-components';
import { FlexBox } from '../../common/PLA_FlexBox';

// 5각형 배경을 담당할 Wrapper
const PentagonWrapper = styled.div`
  position: relative;
  display: inline-flex;
  padding: 12px 12px 16px 40px; /* 말풍선 내부 여백 */
  color: white;
  filter: drop-shadow(1px 0px 0px #A8A8A8) 
          drop-shadow(-1px 0px 0px #A8A8A8) 
          drop-shadow(0px 1px 0px #A8A8A8) 
          drop-shadow(0px -1px 0px #A8A8A8)
          drop-shadow(0px 2px 4px rgba(0,0,0,0.25)) 
          ; // 그림자 효과


  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #FFFFFF; // Ant Design 기본 블루 컬러 예시
    z-index: -1;
    /* 5각형 모양 + 둥근 모서리를 위한 clip-path (브라우저 지원 확인 필요) */
    /* 혹은 SVG 배경 이미지를 넣는 것이 가장 정교합니다. */
    clip-path: polygon(
      0% 50%,   /* 왼쪽 중앙 (뾰족한 꼭지점) */
      10% 0%,   /* 위쪽 꺾이는 지점 */
      100% 0%,  /* 우측 상단 */
      100% 100%,/* 우측 하단 */
      10% 100%  /* 아래쪽 꺾이는 지점 */
    );
    border-radius: 8px; // clip-path와 같이 쓰면 적용이 안 될 수 있음
  }
`;

export const BookmarkPopup = () => {
  return (
    <FlexBox>
      <PentagonWrapper>
        <FlexBox>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </FlexBox>
      </PentagonWrapper>
    </FlexBox>
  );
};
