// Mulberry32 seeded PRNG — SSR/클라이언트 양쪽에서 동일한 난수 시퀀스를 보장
export function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
