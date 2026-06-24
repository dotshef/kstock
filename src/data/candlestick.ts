import { seededRng } from './_rng'

export interface CandleData {
  time: string | number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const rand = seededRng(1234)

function genCandles(count: number, base: number, startDate: Date): CandleData[] {
  const result: CandleData[] = []
  let price = base
  for (let i = 0; i < count; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const open = price
    const change = (rand() - 0.47) * price * 0.025
    const close = Math.round(open + change)
    const high = Math.round(Math.max(open, close) * (1 + rand() * 0.01))
    const low = Math.round(Math.min(open, close) * (1 - rand() * 0.01))
    result.push({
      time: d.toISOString().slice(0, 10),
      open: Math.round(open),
      high,
      low,
      close,
      volume: Math.floor(8_000_000 + rand() * 10_000_000),
    })
    price = close
  }
  return result
}

const threeYears  = genCandles(780, 55000, new Date('2021-06-01'))
const oneYear     = threeYears.slice(-250)
const threeMonths = threeYears.slice(-65)
const oneMonth    = threeYears.slice(-22)
const oneWeek     = threeYears.slice(-5)

function genIntraday(base: number): CandleData[] {
  const result: CandleData[] = []
  let price = base
  // lightweight-charts 분봉은 Unix timestamp(초)를 요구함
  // 09:00 UTC를 장 시작으로 사용 (차트에서 09:00~15:30 표시)
  const startSec = Math.floor(new Date('2024-06-24T09:00:00Z').getTime() / 1000)
  for (let min = 0; min < 390; min += 5) {
    const open = price
    const change = (rand() - 0.48) * price * 0.003
    const close = Math.round(open + change)
    result.push({
      time: startSec + min * 60,
      open: Math.round(open),
      high: Math.round(Math.max(open, close) * 1.001),
      low: Math.round(Math.min(open, close) * 0.999),
      close,
      volume: Math.floor(500_000 + rand() * 1_000_000),
    })
    price = close
  }
  return result
}

export const CANDLESTICK_DATA: Record<string, CandleData[]> = {
  '1일': genIntraday(77800),
  '1주': oneWeek,
  '1개월': oneMonth,
  '3개월': threeMonths,
  '1년': oneYear,
  '3년': threeYears,
}
