export interface MathChallenge {
  question: string
  answer: number
}

export function generateMathChallenge(seed = Date.now()): MathChallenge {
  const random = mulberry32(seed)
  const a = 1 + Math.floor(random() * 9)
  const b = 1 + Math.floor(random() * 9)
  const operations = ['+', '-', '+'] // slightly bias to addition
  const op = operations[Math.floor(random() * operations.length)]
  const answer = op === '+' ? a + b : a - b
  return {
    question: `${a} ${op} ${b} = ?`,
    answer
  }
}

// small deterministic rng so the challenge refreshes nicely per seed
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
