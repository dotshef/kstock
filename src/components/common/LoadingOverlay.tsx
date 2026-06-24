'use client'

import { AnimatePresence, motion } from 'motion/react'

interface Props {
  show: boolean
}

export default function LoadingOverlay({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-4"
        >
          <div className="w-10 h-10 border-4 border-grey-200 border-t-brand rounded-full animate-spin" />
          <p className="text-sm text-grey-500 font-medium">실시간 분석 중…</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
