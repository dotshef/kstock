'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PROGRAM_TRADE } from '@/data/supply-demand'

export default function ProgramTradeSection() {
  const data = PROGRAM_TRADE.slice(-15).map((d) => ({
    date: d.date.slice(5),
    차익:    d.arbitrage,
    비차익: d.nonArbitrage,
  }))

  return (
    <div>
      <h3 className="text-sm font-semibold text-grey-900 mb-3">프로그램 매매 동향</h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f6" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8b95a1' }} interval={2} />
          <YAxis tick={{ fontSize: 10, fill: '#8b95a1' }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
          <Tooltip
            formatter={(v) => (Number(v) || 0).toLocaleString('ko-KR') + '주'}
            contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e8eb' }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="차익"  fill="#3182f6" opacity={0.7} />
          <Bar dataKey="비차익" fill="#fe9800" opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
