'use client'

import { useEffect, useRef, useState } from 'react'
import type { ISeriesApi } from 'lightweight-charts'
import { CANDLESTICK_DATA } from '@/data/candlestick'

type Period = '1일' | '1주' | '1개월' | '3개월' | '1년' | '3년'
const PERIODS: Period[] = ['1일', '1주', '1개월', '3개월', '1년', '3년']

function calcMA(data: { close: number }[], len: number) {
  return data.map((_, i) => {
    if (i < len - 1) return null
    return data.slice(i - len + 1, i + 1).reduce((s, d) => s + d.close, 0) / len
  })
}

export default function CandlestickChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const candleRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const volumeRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  const ma5Ref   = useRef<ISeriesApi<'Line'> | null>(null)
  const ma20Ref  = useRef<ISeriesApi<'Line'> | null>(null)
  const ma60Ref  = useRef<ISeriesApi<'Line'> | null>(null)
  const chartRef = useRef<{ timeScale(): { fitContent(): void }; remove(): void; applyOptions(o: object): void; priceScale(id: string): { applyOptions(o: object): void } } | null>(null)
  const [period, setPeriod] = useState<Period>('3개월')

  function applyPeriodData(p: Period) {
    if (!candleRef.current || !volumeRef.current || !ma5Ref.current || !ma20Ref.current || !ma60Ref.current) return
    const raw = CANDLESTICK_DATA[p]
    candleRef.current.setData(raw.map(d => ({ time: d.time as never, open: d.open, high: d.high, low: d.low, close: d.close })))
    volumeRef.current.setData(raw.map(d => ({ time: d.time as never, value: d.volume, color: d.close >= d.open ? '#ffc0c5' : '#c0d0ff' })))
    const ma5v  = calcMA(raw, 5)
    const ma20v = calcMA(raw, 20)
    const ma60v = calcMA(raw, 60)
    ma5Ref.current.setData(raw.flatMap((d, i) => ma5v[i] != null ? [{ time: d.time as never, value: ma5v[i]! }] : []))
    ma20Ref.current.setData(raw.flatMap((d, i) => ma20v[i] != null ? [{ time: d.time as never, value: ma20v[i]! }] : []))
    ma60Ref.current.setData(raw.flatMap((d, i) => ma60v[i] != null ? [{ time: d.time as never, value: ma60v[i]! }] : []))
    chartRef.current?.timeScale().fitContent()
  }

  useEffect(() => {
    if (!containerRef.current) return
    let cleanup: (() => void) | undefined

    import('lightweight-charts').then(({ createChart, CandlestickSeries, HistogramSeries, LineSeries }) => {
      if (!containerRef.current) return
      const chart = createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height: 380,
        layout: { background: { color: '#ffffff' }, textColor: '#4e5968' },
        grid: { vertLines: { color: '#f2f4f6' }, horzLines: { color: '#f2f4f6' } },
        rightPriceScale: { borderColor: '#e5e8eb' },
        timeScale: { borderColor: '#e5e8eb', timeVisible: true },
      })
      chartRef.current = chart as never

      candleRef.current = chart.addSeries(CandlestickSeries, {
        upColor: '#f04452', downColor: '#3182f6',
        borderUpColor: '#f04452', borderDownColor: '#3182f6',
        wickUpColor: '#f04452', wickDownColor: '#3182f6',
      }) as never
      volumeRef.current = chart.addSeries(HistogramSeries, { priceFormat: { type: 'volume' }, priceScaleId: 'volume' }) as never
      chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.75, bottom: 0 } })
      ma5Ref.current  = chart.addSeries(LineSeries, { color: '#fe9800', lineWidth: 1, priceLineVisible: false }) as never
      ma20Ref.current = chart.addSeries(LineSeries, { color: '#03b26c', lineWidth: 1, priceLineVisible: false }) as never
      ma60Ref.current = chart.addSeries(LineSeries, { color: '#a234c7', lineWidth: 1, priceLineVisible: false }) as never

      applyPeriodData('3개월')

      const ro = new ResizeObserver(() => {
        if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth })
      })
      ro.observe(containerRef.current)
      cleanup = () => { ro.disconnect(); chart.remove() }
    })

    return () => cleanup?.()
  }, [])

  useEffect(() => { applyPeriodData(period) }, [period])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 13px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${period === p ? '#1B6CF2' : '#E5E8EB'}`,
                background: period === p ? '#1B6CF2' : '#fff',
                color: period === p ? '#fff' : '#8B95A1',
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 7, color: '#8B95A1', fontSize: 13 }}>
          <span style={{ padding: '6px 10px', border: '1px solid #E5E8EB', borderRadius: 8, cursor: 'default' }}>지표</span>
          <span style={{ padding: '6px 9px', border: '1px solid #E5E8EB', borderRadius: 8, cursor: 'default' }}>⤢</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, fontWeight: 700, marginBottom: -4 }}>
        <span style={{ color: '#fe9800' }}>MA5</span>
        <span style={{ color: '#03b26c' }}>MA20</span>
        <span style={{ color: '#a234c7' }}>MA60</span>
      </div>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}
