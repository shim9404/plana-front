import React from 'react'
import { Button, Card, Flex, Typography } from 'antd'
import { ArrowRight } from 'lucide-react'

const links = [
  { key: '2', label: '이용자 통계 보기', description: '방문자/가입자 추이를 확인합니다.' },
  { key: '3', label: '지역 검색 통계 보기', description: '지역별 검색 흐름을 분석합니다.' },
  { key: '4', label: '검색어 통계 보기', description: '인기 검색어 변화를 확인합니다.' },
  { key: '5', label: '이용 통계 보기', description: '전체 이용 패턴 이상 징후를 점검합니다.' },
]

const QuickLinks = ({ onNavigate }) => {
  return (
    <Card
      title="빠른 이동"
      size="small"
      extra={<Typography.Text type="secondary">상세 분석 바로가기</Typography.Text>}
      style={{ height: '100%' }}
      styles={{ body: { padding: 12 } }}
    >
      <Flex vertical gap={10} style={{ width: '100%' }}>
        {links.map((item) => (
          <Button
            key={item.key}
            block
            type="default"
            onClick={() => onNavigate?.(item.key)}
            icon={<ArrowRight size={14} />}
            style={{ height: 'auto', padding: '10px 12px', textAlign: 'left' }}
          >
            <div>
              <div>{item.label}</div>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {item.description}
              </Typography.Text>
            </div>
          </Button>
        ))}
      </Flex>
    </Card>
  )
}

export default QuickLinks