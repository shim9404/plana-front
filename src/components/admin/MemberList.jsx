// React 기본 훅 import
import React, { useEffect, useState } from 'react'
// Ant Design 컴포넌트 import
// Splitter: 화면 분할
// Form: 검색 폼
// DatePicker, Select, Input, Button, Row, Col, Radio: 검색 UI 구성
// Table: 회원 목록 출력
import { Splitter, Form, DatePicker, Select, Input, Button, Row, Col, Radio, Table, Space } from 'antd'

// 공통 스타일
import '../../styles/global.css';

// CSS Module 스타일
import memberStyles from './member.module.css'
import { getAllMembersApi } from '../../services/memberApi'
import { Search } from 'lucide-react'


// 소셜 로그인 타입 선택 옵션
const SOCIAL_OPTIONS = [
  { value: 'LOCAL', label: 'LOCAL' },
  { value: 'GOOGLE', label: 'GOOGLE' },
  { value: 'KAKAO', label: 'KAKAO' },
  { value: 'NAVER', label: 'NAVER' },
]

// 검색 필드 선택 옵션
// 어떤 컬럼을 기준으로 검색할지 선택
const KEYWORD_OPTIONS = [
  { value: 'email', label: '이메일' },
  { value: 'name', label: '이름' },
  { value: 'nickname', label: '닉네임' },
]

const toYmd = (d) => {
  if (d == null) return undefined
  if (typeof d.format === 'function') return d.format('YYYY-MM-DD')
  if (d instanceof Date) return d.toISOString().slice(0, 10)
  const s = String(d)
  return s.length >= 10 ? s.slice(0, 10) : s
}

/** 폼 값 → GET 쿼리 파라미터(백엔드 memberList 동적 SQL과 키 일치) */
const buildMemberSearchParams = (values) => {
  const p = {}
  const jr = values.joinDateRange
  if (jr?.[0] && jr?.[1]) {
    p.joinDateStart = toYmd(jr[0])
    p.joinDateEnd = toYmd(jr[1])
  }
  if (values.status && values.status !== 'all') {
    p.status = String(values.status).toUpperCase()
  }
  if (values.role && values.role !== 'all') {
    p.role = values.role
  }
  const lr = values.lastLoginRange
  if (lr?.[0] && lr?.[1]) {
    p.lastLoginStart = toYmd(lr[0])
    p.lastLoginEnd = toYmd(lr[1])
  }
  if (values.socialType) {
    p.socialType = values.socialType
  }
  const kw = values.keyword != null ? String(values.keyword).trim() : ''
  if (kw && values.keywordField) {
    p.keywordField = values.keywordField
    p.keyword = kw
  }
  return p
}

// 회원 검색 영역 컴포넌트
const MemberSearchPanel = ({ onSearch, loading }) => {
  const [form] = Form.useForm()

  const handleSearch = (values) => {
    onSearch(buildMemberSearchParams(values))
  }

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        requiredMark={false}
        initialValues={{ status: 'all', role: 'all' }}
      >
        {/* 1행: 가입기간 / 회원상태 / 권한 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="joinDateRange" label="가입기간" layout='horizontal'>
              <DatePicker.RangePicker
                style={{ width: '70%' }}
                placeholder={['시작일', '종료일']}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="status" label="회원상태" layout='horizontal'>
              {/* 회원 상태 필터 */}
              <Radio.Group>
                <Radio.Button value="all">전체</Radio.Button>
                <Radio.Button value="active">활성</Radio.Button>
                <Radio.Button value="suspended">정지</Radio.Button>
                <Radio.Button value="withdrawn">탈퇴</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="role" label="회원유형" layout='horizontal'>
              {/* 회원 권한 필터 */}
              <Radio.Group>
                <Radio.Button value="all">전체</Radio.Button>
                <Radio.Button value="ROLE_MEMBER">회원</Radio.Button>
                <Radio.Button value="ROLE_MANAGER">부관리자</Radio.Button>
                <Radio.Button value="ROLE_ADMIN">관리자</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* 2행: 최근접속기간 / 검색(소셜·필드) / 검색키워드(라벨 없음) / 조회 */}
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={12} xl={7}>
            <Form.Item name="lastLoginRange" label="최근접속기간" layout='horizontal'>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                placeholder={['시작일', '종료일']}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} xl={6}>
            <Form.Item label="검색" layout="horizontal">
              <Space.Compact block style={{ width: '100%' }}>
                <Form.Item name="socialType" noStyle style={{ width: '50%', marginBottom: 0 }}>
                  <Select
                    allowClear
                    placeholder="계정유형"
                    options={SOCIAL_OPTIONS}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item name="keywordField" noStyle style={{ width: '50%', marginBottom: 0 }}>
                  <Select
                    allowClear
                    placeholder="검색필드"
                    options={KEYWORD_OPTIONS}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} xl={8}>
            <Form.Item name="keyword" colon={false}>
              <Input
                allowClear
                placeholder="검색"
                style={{ width: '100%' }}
                suffix={
                  <Search
                    size={16}
                    aria-hidden
                    style={{ color: 'rgba(0, 0, 0, 0.45)', pointerEvents: 'none' }}
                  />
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} xl={2}>
            {/* 버튼 라벨 공간 확보용 */}
            <Form.Item label="" colon={false} layout='horizontal'>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className={memberStyles.searchButton}
              >
                조회
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}//end of MemberSearchPanel

const MEMBER_ROLE_LABELS = {
  ROLE_ADMIN: '관리자',
  ROLE_MANAGER: '매니저',
  ROLE_MEMBER: '회원',
}

const formatMemberRoleLabel = (role) => {
  if (role == null || role === '') return '—'
  const k = String(role).trim().toUpperCase()
  return MEMBER_ROLE_LABELS[k] ?? role
}

const MEMBER_STATUS_LABELS = {
  ACTIVE: '활성',
  SUSPENDED: '정지',
  WITHDRAWN: '탈퇴',
}

const formatMemberStatusLabel = (status) => {
  if (status == null || status === '') return '—'
  const k = String(status).trim().toUpperCase()
  return MEMBER_STATUS_LABELS[k] ?? status
}

const renderMemberStatusCell = (status, record) => {
  const value = status ?? record?.STATUS
  const raw = String(value ?? '')
    .trim()
    .toUpperCase()
  const label = formatMemberStatusLabel(value)
  if (raw === 'WITHDRAWN') {
    return <span style={{ color: '#ff4d4f' }}>{label}</span>
  }
  if (raw === 'SUSPENDED') {
    return <span style={{ color: '#8c8c8c' }}>{label}</span>
  }
  return label
}

// 테이블 컬럼 정의 함수
// page, pageSize를 받아 현재 페이지 기준 No 값을 계산
const getMemberTableColumns = (page, pageSize) => [
  {
    title: 'No',
    key: 'no',
    width: 64,
    align: 'center',
    // index는 현재 페이지 내부 인덱스
    // 전체 순번을 만들기 위해 (현재페이지-1)*페이지사이즈 + index + 1 계산
    render: (_, __, index) => (page - 1) * pageSize + index + 1,
  },
  {
    title: '회원유형',
    dataIndex: 'role',
    key: 'role',
    width: 100,
    render: (role, record) => formatMemberRoleLabel(role ?? record?.ROLE),
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    width: 88,
    render: (status, record) => renderMemberStatusCell(status, record),
  },
  { title: '이메일', dataIndex: 'email', key: 'email', ellipsis: true },
  { title: '계정유형', dataIndex: 'social_type', key: 'social_type', width: 100 },
  { title: '이름', dataIndex: 'name', key: 'name', width: 100 },
  { title: '닉네임', dataIndex: 'nickname', key: 'nickname', width: 100 },
  { title: '가입일', dataIndex: 'create_date', key: 'create_date', width: 120 },
  { title: '최근 수정일', dataIndex: 'updatedAt', key: 'updatedAt', width: 160 },
]

/** API(Map)·Oracle 등에서 member_id 키 대소문자·목업 key까지 고려 */
const getMemberRowKey = (record) => {
  const id =
    record.member_id ?? record.MEMBER_ID ?? record.key ?? record.email ?? record.EMAIL
  return id != null && id !== '' ? String(id) : JSON.stringify(record)
}

// 회원 목록 테이블 영역 컴포넌트
const MemberTablePanel = ({ members }) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setPage(1)
  }, [members])

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <Table
        size="small"
        rowKey={getMemberRowKey}
        columns={getMemberTableColumns(page, pageSize)} // 동적 컬럼 생성
        dataSource={members}                     // 현재는 목업 데이터
        pagination={{
          current: page,
          pageSize,
          showSizeChanger: true,                      // 페이지 크기 변경 허용
          showTotal: (t) => `총 ${t}건`,             // 전체 건수 표시
          onChange: (p, ps) => {
            // 페이지 이동 또는 페이지 크기 변경 시 상태 갱신
            setPage(p)
            setPageSize(ps)
          },
        }}
        scroll={{ x: 1100 }} // 컬럼이 많아 가로 스크롤 허용
      />
    </div>
  )
}

// 최상위 회원 목록 화면 컴포넌트
const MemberList = () => {
  const [members, setMembers] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const fetchMembers = async (params = {}) => {
    setSearchLoading(true)
    try {
      const data = await getAllMembersApi(params)
      setMembers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('회원 목록 조회 실패', error)
      setMembers([])
    } finally {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers({})
  }, [])
  return (
    <>
      <Splitter
        vertical
        style={{ height: 650, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        {/* 상단: 검색 조건 영역 */}
        <Splitter.Panel defaultSize="23%" min="120px">
          <MemberSearchPanel onSearch={fetchMembers} loading={searchLoading} />
        </Splitter.Panel>

        {/* 하단: 회원 목록 테이블 영역 */}
        <Splitter.Panel>
          <MemberTablePanel members={members} />
        </Splitter.Panel>
      </Splitter>
    </>
  )
}

export default MemberList