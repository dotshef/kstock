'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  duration?: number
  className?: string
  formatter?: (n: number) => string
}

export default function CountingNumber({
  target,
  duration = 800,
  className,
  formatter = (n) => n.toLocaleString('ko-KR'),
}: Props) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <span className={className}>{formatter(value)}</span>
}
