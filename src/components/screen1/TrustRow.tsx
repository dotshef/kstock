import { ShieldCheck, Zap, BarChart2, Gem, type LucideIcon } from 'lucide-react'

const TRUST_ITEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: '안전한 개인정보 보호', desc: '입력하신 정보는 리포트 발송 목적으로만 사용됩니다.' },
  { icon: Zap,         title: '실시간 시세 제공', desc: '지연 없는 실시간 주가·수급 데이터를 제공합니다.' },
  { icon: BarChart2,   title: '전문가 분석 리포트', desc: '검증된 애널리스트의 심층 분석 리포트를 제공합니다.' },
  { icon: Gem,         title: '완전 무료 제공', desc: '회원가입 없이 누구나 무료로 리포트를 받아보세요.' },
]

export default function TrustRow() {
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 28px 56px' }}>
      <div style={{
        background: '#fff', border: '1px solid #EEF1F6', borderRadius: 18,
        padding: '24px 28px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24
      }}>
        {TRUST_ITEMS.map((tr) => (
          <div key={tr.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <tr.icon size={20} color="#1B6CF2" />
            </div>
            <div style={{ lineHeight: 1.4 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: '#111827' }}>{tr.title}</div>
              <div style={{ fontSize: 12.5, color: '#8B95A1', marginTop: 2 }}>{tr.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
