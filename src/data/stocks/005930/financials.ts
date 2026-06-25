export const FINANCIAL_METRICS = {
  per: 14.2,
  pbr: 1.3,
  roe: 9.8,
  eps: 5478,
  dividendYield: 2.14,
}

export const ANNUAL_FINANCIALS = [
  { year: '2021',  revenue: 279_605, operatingProfit: 51_634, netProfit: 39_907, eps: 5_777 },
  { year: '2022',  revenue: 302_231, operatingProfit: 43_376, netProfit: 55_654, eps: 8_057 },
  { year: '2023',  revenue: 258_935, operatingProfit:  6_567, netProfit: 15_487, eps: 2_131 },
  { year: '2024E', revenue: 300_870, operatingProfit: 36_042, netProfit: 28_990, eps: 4_058 },
]

export const FINANCIAL_SUMMARY = {
  basis: '2024.03 기준',
  items: [
    { k: '매출액',     v: '719,156억', change: '-1.42%',      up: false },
    { k: '영업이익',   v: '66,060억',  change: '+931.25%',    up: true  },
    { k: '당기순이익', v: '67,547억',  change: '+1,525.43%',  up: true  },
    { k: '영업이익률', v: '9.18%',     change: '+8.28%p',     up: true  },
    { k: 'ROE',        v: '9.36%',     change: '+8.10%p',     up: true  },
  ],
}

export const DIVIDEND_INFO = {
  yield: 2.14,
  perShare: 1444,
  payout: 20.5,
  history: [
    { year: '2020',  amount: 1932 },
    { year: '2021',  amount: 1444 },
    { year: '2022',  amount: 1444 },
    { year: '2023',  amount: 1444 },
    { year: '2024E', amount: 1500 },
  ],
}

export const QUARTERLY_EARNINGS = [
  { quarter: '23.1Q',    revenue: 637455, op:   6402, opMargin:  1.0 },
  { quarter: '23.2Q',    revenue: 600050, op:   6685, opMargin:  1.1 },
  { quarter: '23.3Q',    revenue: 671520, op:  24340, opMargin:  3.6 },
  { quarter: '23.4Q',    revenue: 673210, op:  28120, opMargin:  4.2 },
  { quarter: '24.1Q',    revenue: 710480, op:  66060, opMargin:  9.3 },
  { quarter: '24.2Q',    revenue: 740000, op: 103470, opMargin: 14.0 },
  { quarter: '24.3Q(E)', revenue: 800000, op: 120000, opMargin: 15.0 },
  { quarter: '24.4Q(E)', revenue: 870000, op: 150000, opMargin: 17.2 },
]
