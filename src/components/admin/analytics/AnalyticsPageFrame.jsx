import React, { useRef } from 'react'
import { Button, theme } from 'antd'
import { Printer } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import '../../../styles/global.css'

/**
 * 이용현황 등 관리자 분석 페이지 공통 상단 영역 (제목 + 설명).
 * @param {boolean} [enablePrint] - true면 설명 아래에 인쇄 버튼 표시 (react-to-print)
 * @param {string} [printDocumentTitle] - 인쇄/PDF 저장 시 문서 제목(파일명 힌트)
 */
const AnalyticsPageFrame = ({
  title,
  description,
  children,
  enablePrint = false,
  printDocumentTitle,
}) => {
  const { token } = theme.useToken()
  const { colorText, colorTextSecondary } = token
  const contentRef = useRef(null)

  const triggerPrint = useReactToPrint({
    contentRef,
    documentTitle: printDocumentTitle || title || 'analytics-report',
    pageStyle: `
      @page { size: A4; margin: 12mm; }
      @media print {
        .analytics-page-frame__print-actions { display: none !important; }
      }
    `,
  })

  const descriptionMarginBottom = enablePrint ? 12 : children ? 24 : 0

  return (
    <div ref={contentRef} style={{ width: '100%' }}>
      <h2
        style={{
          marginTop: 0,
          marginBottom: 12,
          fontSize: 20,
          fontWeight: 600,
          color: colorText,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: 0,
          marginBottom: descriptionMarginBottom,
          fontSize: 14,
          lineHeight: 1.6,
          color: colorTextSecondary,
        }}
      >
        {description}
      </p>
      {enablePrint ? (
        <div
          className="analytics-page-frame__print-actions"
          style={{ marginBottom: children ? 24 : 0 }}
        >
          <Button
            type="default"
            icon={<Printer size={18} strokeWidth={2} aria-hidden />}
            onClick={() => triggerPrint()}
          >
            인쇄 / PDF 저장
          </Button>
        </div>
      ) : null}
      {children}
    </div>
  )
}

export default AnalyticsPageFrame
