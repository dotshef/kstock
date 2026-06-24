import ReportContent from '@/components/screen4/ReportContent'
import ApplicationPanel from '@/components/screen4/ApplicationPanel'
import Link from 'next/link'

export default function ReportPage() {
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '18px 28px 56px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontSize: 13, color: '#6B7684' }}>
        <Link href="/stock/005930" style={{ cursor: 'pointer', textDecoration: 'none', color: '#6B7684' }}>← 삼성전자(005930) 분석</Link>
        <span style={{ color: '#D1D6DB' }}>›</span>
        <span style={{ color: '#4E5968', fontWeight: 600 }}>전문가 리포트</span>
      </div>

      {/* 1.55fr : 1fr grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* 좌측 — 흰 카드로 래핑 */}
        <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 18, padding: 30 }}>
          <ReportContent />
        </div>
        <ApplicationPanel />
      </div>
    </div>
  )
}
