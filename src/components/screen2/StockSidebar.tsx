'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import CountingNumber from '@/components/common/CountingNumber'
import { SAMSUNG } from '@/data/stocks'

interface Props { animate: boolean }

const fmt = (n: number) => n.toLocaleString('ko-KR')

export default function StockSidebar({ animate }: Props) {
  const s = SAMSUNG
  return (
    <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: 22 }}>
      {/* 종목 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1428A0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>三星</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>{s.name}</div>
          <div style={{ fontSize: 12, color: '#8B95A1' }}>{s.code} · KOSPI</div>
        </div>
      </div>

      {/* 현재가 */}
      <div style={{ fontSize: 34, fontWeight: 800, color: '#E8342B', letterSpacing: '-0.02em' }}>
        {animate ? <CountingNumber target={s.currentPrice} formatter={fmt} /> : fmt(s.currentPrice)}원
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#E8342B', marginTop: 2 }}>
        ▲ {fmt(s.change)} ({s.changeRate.toFixed(2)}%)
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '3px 9px', background: '#F2F4F6', borderRadius: 6, fontSize: 11, color: '#8B95A1' }}>
        실시간 · 05.23 10:15 기준
      </div>

      {/* 주요 수치 */}
      <div style={{ marginTop: 18, borderTop: '1px solid #F2F4F6', paddingTop: 6 }}>
        {[
          { k: '시가',     v: fmt(s.open),   color: '#111827' },
          { k: '고가',     v: fmt(s.high),   color: '#E8342B' },
          { k: '저가',     v: fmt(s.low),    color: '#3182f6' },
          { k: '거래량',   v: fmt(s.volume), color: '#111827' },
          { k: '거래대금', v: (s.tradingValue / 1e8).toFixed(0) + '억', color: '#111827' },
          { k: '시가총액', v: (s.marketCap / 1e12).toFixed(1) + '조',  color: '#111827' },
        ].map(({ k, v, color }) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F7F8FA', fontSize: 13 }}>
            <span style={{ color: '#8B95A1' }}>{k}</span>
            <span style={{ fontWeight: 700, color }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: '#8B95A1' }}>PER</span>
          <span style={{ fontWeight: 700, color: '#111827' }}>{s.per.toFixed(2)}</span>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: '#8B95A1' }}>PBR</span>
          <span style={{ fontWeight: 700, color: '#111827' }}>{s.pbr.toFixed(2)}</span>
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: '#8B95A1' }}>배당수익률</span>
          <span style={{ fontWeight: 700, color: '#111827' }}>{s.dividendYield.toFixed(2)}%</span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/report/005930"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 46, marginTop: 18, borderRadius: 11, background: '#1B6CF2', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
      >
        무료 리포트 신청하기
      </Link>
      <button style={{ width: '100%', height: 44, marginTop: 9, border: '1px solid #E5E8EB', borderRadius: 11, background: '#fff', color: '#4E5968', fontSize: 13.5, fontWeight: 600, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Star size={14} color="#4E5968" /> 관심종목 추가
      </button>
    </div>
  )
}
