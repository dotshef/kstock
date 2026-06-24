'use client'

import SparklineChart from '@/components/common/SparklineChart'

const INDICATORS = [
  {
    name: '이동평균선',
    value: '정배열',
    signal: '매수',
    signalUp: true,
    sub: '5 > 20 > 60 > 120',
    data: [72, 73, 74, 74, 75, 76, 76, 77, 78, 78, 79],
    isRise: true,
  },
  {
    name: 'RSI (14)',
    value: '58.45',
    signal: '중립',
    signalUp: null,
    sub: null,
    data: [50, 53, 55, 52, 58, 56, 60, 57, 59, 58, 58],
    isRise: true,
  },
  {
    name: 'MACD',
    value: '+812.45',
    signal: '매수',
    signalUp: true,
    sub: null,
    data: [200, 300, 450, 380, 500, 620, 580, 700, 760, 800, 812],
    isRise: true,
  },
  {
    name: 'Stochastic',
    value: '62.31',
    signal: '중립',
    signalUp: null,
    sub: null,
    data: [55, 60, 58, 65, 62, 68, 64, 70, 65, 63, 62],
    isRise: true,
  },
  {
    name: 'BB %b',
    value: '0.46',
    signal: '중립',
    signalUp: null,
    sub: null,
    data: [0.30, 0.38, 0.35, 0.44, 0.42, 0.50, 0.45, 0.48, 0.44, 0.47, 0.46],
    isRise: false,
  },
]

function signalStyle(signalUp: boolean | null): React.CSSProperties {
  if (signalUp === true)  return { color: '#E8342B' }
  if (signalUp === false) return { color: '#3182f6' }
  return { color: '#8B95A1' }
}

export default function TechnicalIndicators() {
  return (
    <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: '20px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>기술적 지표</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
        {INDICATORS.map((ind, i) => (
          <div
            key={ind.name}
            style={{
              padding: '0 16px',
              borderLeft: i > 0 ? '1px solid #EEF1F6' : 'none',
            }}
          >
            <div style={{ fontSize: 12, color: '#8B95A1', fontWeight: 600, marginBottom: 6 }}>{ind.name}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>{ind.value}</div>
            {ind.sub
              ? <div style={{ fontSize: 11, color: '#8B95A1', marginTop: 3 }}>{ind.sub}</div>
              : <div style={{ fontSize: 12, fontWeight: 700, marginTop: 3, ...signalStyle(ind.signalUp) }}>{ind.signal}</div>
            }
            {ind.sub && (
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2, ...signalStyle(ind.signalUp) }}>{ind.signal}</div>
            )}
            <div style={{ marginTop: 10 }}>
              <SparklineChart data={ind.data} isRise={ind.isRise} height={40} />
            </div>
          </div>
        ))}
      </div>

      <button style={{ width: '100%', height: 40, marginTop: 18, border: '1px solid #E5E8EB', borderRadius: 10, background: '#fff', color: '#1B6CF2', fontSize: 13, fontWeight: 700, cursor: 'default' }}>
        기술적 지표 상세 보기 ›
      </button>
    </div>
  )
}
