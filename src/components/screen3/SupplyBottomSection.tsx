import MajorShareholders from '@/components/screen3/MajorShareholders'
import ProgramTradeSection from '@/components/screen3/ProgramTradeSection'

export default function SupplyBottomSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
      <MajorShareholders />
      <div style={{ background: '#fff', border: '1px solid #EEF1F6', borderRadius: 16, padding: '20px 22px' }}>
        <ProgramTradeSection />
      </div>
    </div>
  )
}
