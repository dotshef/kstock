import { DUMMY_NEWS, AI_ONE_LINER } from '@/data/reports'

export default function NewsAndAI() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 16 }}>
      {/* 오늘의 뉴스 */}
      <div style={{ border: '1px solid #EEF1F6', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>오늘의 뉴스</span>
          <span style={{ fontSize: 12, color: '#8B95A1', cursor: 'default' }}>더보기 ›</span>
        </div>
        {DUMMY_NEWS.map((n, i) => (
          <div key={i} style={{ padding: '9px 0', borderTop: '1px solid #F2F4F6' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#333D4B', lineHeight: 1.4 }}>{n.title}</div>
            <div style={{ fontSize: 11, color: '#B0B8C1', marginTop: 3 }}>{n.source} · {n.time}</div>
          </div>
        ))}
      </div>

      {/* AI 한줄 분석 */}
      <div style={{ border: '1px solid #EEF1F6', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 10 }}>
          AI 한줄 분석{' '}
          <span style={{ fontSize: 10, color: '#1B6CF2', background: '#EAF1FE', padding: '2px 6px', borderRadius: 5, fontWeight: 700 }}>Beta</span>
        </div>
        <div style={{ background: '#F5F3FF', borderRadius: 10, padding: 14, fontSize: 13, lineHeight: 1.6, color: '#4E5968' }}>
          {AI_ONE_LINER}
        </div>
        <button style={{ width: '100%', height: 40, marginTop: 12, border: '1px solid #E5E8EB', borderRadius: 10, background: '#fff', color: '#1B6CF2', fontSize: 13, fontWeight: 700, cursor: 'default' }}>
          AI 상세 분석 보기 ›
        </button>
      </div>
    </div>
  )
}
