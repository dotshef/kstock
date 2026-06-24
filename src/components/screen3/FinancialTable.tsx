import { FINANCIAL_METRICS, ANNUAL_FINANCIALS } from '@/data/financials'

const fmt = (n: number) => n.toLocaleString('ko-KR')

export default function FinancialTable() {
  const metrics = [
    { label: 'PER',      value: FINANCIAL_METRICS.per.toFixed(1) + '배' },
    { label: 'PBR',      value: FINANCIAL_METRICS.pbr.toFixed(1) + '배' },
    { label: 'ROE',      value: FINANCIAL_METRICS.roe.toFixed(1) + '%' },
    { label: 'EPS',      value: fmt(FINANCIAL_METRICS.eps) + '원' },
    { label: 'DY',       value: FINANCIAL_METRICS.dividendYield.toFixed(2) + '%' },
    { label: '시총',     value: '464조' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>주요 재무 지표 <span style={{ color: '#B0B8C1', fontSize: 12 }}>ⓘ</span></div>
        <span style={{ fontSize: 12, color: '#8B95A1', cursor: 'default' }}>연간 ▾</span>
      </div>

      {/* 3×2 지표 카드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ border: '1px solid #EEF1F6', borderRadius: 10, padding: 13, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#8B95A1' }}>{m.label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#111827', marginTop: 4 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* 연도별 실적 테이블 */}
      <div style={{ marginTop: 14, fontSize: 11, color: '#8B95A1', marginBottom: 6 }}>(단위: 억원)</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
        <thead>
          <tr style={{ color: '#8B95A1' }}>
            <td style={{ padding: '5px 2px', textAlign: 'left' }}></td>
            {ANNUAL_FINANCIALS.map((f) => (
              <td key={f.year} style={{ textAlign: 'right', padding: '5px 2px', color: f.year === '2024E' ? '#1B6CF2' : '#8B95A1', fontWeight: f.year === '2024E' ? 700 : 400 }}>
                {f.year}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: '매출액',   key: 'revenue'         as const },
            { label: '영업이익', key: 'operatingProfit'  as const },
            { label: '순이익',   key: 'netProfit'        as const },
            { label: 'EPS(원)',  key: 'eps'              as const },
          ].map((row) => (
            <tr key={row.label} style={{ borderTop: '1px solid #F2F4F6' }}>
              <td style={{ padding: '6px 2px', color: '#6B7684' }}>{row.label}</td>
              {ANNUAL_FINANCIALS.map((f) => (
                <td key={f.year} style={{ textAlign: 'right', padding: '6px 2px', color: f.year === '2024E' ? '#111827' : '#4E5968', fontWeight: f.year === '2024E' ? 700 : 400 }}>
                  {fmt(f[row.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ width: '100%', height: 40, marginTop: 14, border: '1px solid #E5E8EB', borderRadius: 10, background: '#fff', color: '#4E5968', fontSize: 13, fontWeight: 600, cursor: 'default' }}>
        더 많은 재무 정보 보기 ›
      </button>
    </div>
  )
}
