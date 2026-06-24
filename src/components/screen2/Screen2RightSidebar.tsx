'use client'

import { SAMSUNG } from '@/data/stocks'
import { CANDLESTICK_DATA } from '@/data/candlestick'
import SparklineChart from '@/components/common/SparklineChart'

const fmt = (n: number) => n.toLocaleString('ko-KR')

export default function Screen2RightSidebar() {
  const s = SAMSUNG
  const yearClose = CANDLESTICK_DATA['1년'].map((d) => d.close)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 주요 지표 요약 */}
      <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 14 }}>주요 지표 요약</div>
        {[
          { k: '시가',     v: fmt(s.open) + '원',  color: '#111827' },
          { k: '고가',     v: fmt(s.high) + '원',  color: '#E8342B' },
          { k: '저가',     v: fmt(s.low)  + '원',  color: '#3182f6' },
          { k: '전일종가', v: fmt(s.currentPrice - s.change) + '원', color: '#111827' },
          { k: 'PER',      v: s.per.toFixed(2),   color: '#111827' },
          { k: 'PBR',      v: s.pbr.toFixed(2),   color: '#111827' },
        ].map(({ k, v, color }) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F7F8FA', fontSize: 13 }}>
            <span style={{ color: '#8B95A1' }}>{k}</span>
            <span style={{ fontWeight: 700, color }}>{v}</span>
          </div>
        ))}
      </div>

      {/* 최근 1년 주가 추이 */}
      <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 12 }}>최근 1년 주가 추이</div>
        <SparklineChart data={yearClose} isRise height={120} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#B0B8C1', marginTop: 4 }}>
          <span>{Math.min(...yearClose).toLocaleString('ko-KR')}원</span>
          <span>{Math.max(...yearClose).toLocaleString('ko-KR')}원</span>
        </div>
        <button style={{ width: '100%', height: 42, marginTop: 14, border: '1px solid #E5E8EB', borderRadius: 11, background: '#fff', color: '#4E5968', fontSize: 13, fontWeight: 600, cursor: 'default' }}>
          상세 차트 보기
        </button>
      </div>
    </div>
  )
}
