import { Suspense } from 'react'
import StockPageContent from '@/components/screen2/StockPageContent'

export default function StockPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64 text-grey-400 text-sm">로딩 중...</div>}>
      <StockPageContent />
    </Suspense>
  )
}
