import HeroSection from '@/components/screen1/HeroSection'
import ReportCards from '@/components/screen1/ReportCards'
import MarketIndexCards from '@/components/screen1/MarketIndexCards'
import TrustRow from '@/components/screen1/TrustRow'

export default function HomePage() {
  return (
    <div style={{ background: 'linear-gradient(180deg,#fff 0%,#fff 60%,#F5F7FB 100%)' }}>
      <HeroSection />
      <ReportCards />
      <MarketIndexCards />
      <TrustRow />
    </div>
  )
}
