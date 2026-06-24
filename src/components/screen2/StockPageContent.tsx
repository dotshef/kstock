'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Share2, AlertTriangle } from 'lucide-react'
import LoadingOverlay from '@/components/common/LoadingOverlay'
import StockSidebar from '@/components/screen2/StockSidebar'
import CandlestickChart from '@/components/screen2/CandlestickChart'
import InvestorTrendBar from '@/components/screen2/InvestorTrendBar'
import NewsAndAI from '@/components/screen2/NewsAndAI'
import Screen2RightSidebar from '@/components/screen2/Screen2RightSidebar'
import SupplyDemandChart from '@/components/screen3/SupplyDemandChart'
import NetBuyCards from '@/components/screen3/NetBuyCards'
import ProgramTradeSection from '@/components/screen3/ProgramTradeSection'
import AiInsightSection from '@/components/screen3/AiInsightSection'
import FinancialTable from '@/components/screen3/FinancialTable'
import ReportPreviewSidebar from '@/components/screen3/ReportPreviewSidebar'
import { SAMSUNG } from '@/data/stocks'

type Tab = 'price' | 'analysis'
const TABS = [
  { key: 'price',    label: '시세' },
  { key: 'dead',     label: '공시·뉴스' },
  { key: 'analysis', label: '수급' },
  { key: 'dead2',    label: '재무' },
  { key: 'dead3',    label: '투자분석' },
  { key: 'dead4',    label: 'AI분석' },
] as const

const fmt = (n: number) => n.toLocaleString('ko-KR')

export default function StockPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rawTab = searchParams.get('tab')
  const activeTab: Tab = rawTab === 'analysis' ? 'analysis' : 'price'
  const s = SAMSUNG

  const [loading, setLoading] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => { setLoading(false); setAnimate(true) }, 1400)
    return () => clearTimeout(t)
  }, [])

  function handleTabClick(key: string) {
    if (key === 'price')    router.replace('/stock/005930?tab=price')
    if (key === 'analysis') router.replace('/stock/005930?tab=analysis')
  }

  const tabsRow = (
    <div style={{ display: 'flex', borderBottom: '1px solid #EEF1F6', marginBottom: 16 }}>
      {TABS.map((t) => {
        const isActive = t.key === activeTab
        const isDead   = t.key.startsWith('dead')
        return (
          <button
            key={t.key}
            onClick={() => handleTabClick(t.key)}
            style={{
              padding: '0 0 13px', marginRight: 24, fontSize: 15, fontWeight: 700,
              cursor: isDead ? 'default' : 'pointer', background: 'none', border: 'none',
              borderBottom: `2.5px solid ${isActive ? '#1B6CF2' : 'transparent'}`,
              color: isActive ? '#1B6CF2' : isDead ? '#D1D6DB' : '#4E5968',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      <LoadingOverlay show={loading} />
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '18px 28px 56px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontSize: 13 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7684', textDecoration: 'none' }}>← 검색 결과</Link>
          <span style={{ color: '#D1D6DB' }}>|</span>
          <span style={{ fontWeight: 700, color: '#1B6CF2' }}>005930</span>
          <span style={{ fontWeight: 600, color: '#4E5968' }}>삼성전자</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 18 }}>
            <span style={{ color: '#6B7684', cursor: 'default', display: 'flex', alignItems: 'center', gap: 5 }}><Star size={14} color="#6B7684" /> 관심종목 추가</span>
            <span style={{ color: '#6B7684', cursor: 'default', display: 'flex', alignItems: 'center', gap: 5 }}><Share2 size={14} color="#6B7684" /> 공유하기</span>
          </div>
        </div>

        {activeTab === 'price' ? (
          /* ── 화면 2: 3컬럼 그리드 ── */
          <div style={{ display: 'grid', gridTemplateColumns: '236px 1fr 268px', gap: 18, alignItems: 'start' }}>
            <StockSidebar animate={animate} />

            {/* 중앙 카드 (탭 + 차트 + 투자자 + 뉴스) */}
            <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: '20px 22px' }}>
              {tabsRow}
              <CandlestickChart />
              <div style={{ marginTop: 14 }}>
                <InvestorTrendBar />
              </div>
              <NewsAndAI />
            </div>

            <Screen2RightSidebar />
          </div>
        ) : (
          /* ── 화면 3: 풀 와이드 ── */
          <div>
            {/* Compact 주가 헤더 */}
            <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 14, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#1428A0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>三星</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#111827' }}>삼성전자</div>
              <span style={{ fontSize: 12, color: '#8B95A1' }}>005930 · KOSPI</span>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#E8342B', marginLeft: 8 }}>{fmt(s.currentPrice)}</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E8342B' }}>▲ {fmt(s.change)} ({s.changeRate.toFixed(2)}%)</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 22, fontSize: 12.5, color: '#8B95A1' }}>
                <span>전일가 <b style={{ color: '#111827', fontWeight: 700 }}>{fmt(s.currentPrice - s.change)}</b></span>
                <span>고가 <b style={{ color: '#E8342B', fontWeight: 700 }}>{fmt(s.high)}</b></span>
                <span>저가 <b style={{ color: '#3182f6', fontWeight: 700 }}>{fmt(s.low)}</b></span>
                <span>거래량 <b style={{ color: '#111827', fontWeight: 700 }}>{fmt(s.volume)}주</b></span>
              </div>
            </div>

            {/* 탭 (수급 탭 활성) */}
            {tabsRow}

            {/* 4컬럼 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1.15fr 1.15fr 1fr', gap: 16, alignItems: 'start' }}>
              {/* 수급 분석 */}
              <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
                <SupplyDemandChart />
                <div style={{ marginTop: 16 }}><NetBuyCards /></div>
                <div style={{ marginTop: 16 }}><ProgramTradeSection /></div>
              </div>

              {/* 재무 */}
              <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
                <FinancialTable />
              </div>

              {/* AI 인사이트 */}
              <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
                <AiInsightSection />
              </div>

              {/* 리포트 미리보기 */}
              <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
                <ReportPreviewSidebar />
              </div>
            </div>

            {/* 면책 문구 */}
            <div style={{ marginTop: 16, background: '#FBFAF5', border: '1px solid #F0EAD8', borderRadius: 12, padding: '14px 18px', fontSize: 12.5, color: '#9A8C66', lineHeight: 1.5, display: 'flex', gap: 7, alignItems: 'flex-start' }}>
              <AlertTriangle size={13} color="#9A8C66" style={{ flexShrink: 0, marginTop: 1 }} /> 본 자료는 투자 권유 목적이 아닙니다. 수익을 보장하지 않으며 투자 결정은 본인 판단에 따릅니다.
            </div>
          </div>
        )}
      </div>
    </>
  )
}
