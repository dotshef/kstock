import { seededRng } from './_rng'

const rand = seededRng(5678)

function genDate(daysAgo: number): string {
  const d = new Date('2024-06-24')
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

export interface DailySupplyDemand {
  date: string
  foreign: number
  institution: number
  individual: number
}

export const SUPPLY_DEMAND: DailySupplyDemand[] = Array.from({ length: 30 }, (_, i) => ({
  date: genDate(29 - i),
  foreign: Math.round((rand() - 0.45) * 1_500_000),
  institution: Math.round((rand() - 0.5) * 800_000),
  individual: Math.round((rand() - 0.55) * 1_200_000),
}))

export const NET_BUY_SUMMARY = {
  foreign:     1_246_817,
  institution:  -412_043,
  individual:  -834_774,
}

export const PROGRAM_TRADE = Array.from({ length: 30 }, (_, i) => ({
  date: genDate(29 - i),
  arbitrage:    Math.round((rand() - 0.5) * 300_000),
  nonArbitrage: Math.round((rand() - 0.5) * 500_000),
}))
