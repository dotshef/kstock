'use client'

import { AreaChart, Area, ResponsiveContainer } from 'recharts'

interface Props {
  data: number[]
  isRise: boolean
  height?: number
}

export default function SparklineChart({ data, isRise, height = 48 }: Props) {
  const chartData = data.map((v) => ({ v }))
  const color = isRise ? '#f04452' : '#3182f6'

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${isRise ? 'rise' : 'fall'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${isRise ? 'rise' : 'fall'})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
