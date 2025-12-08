export interface MathChallenge {
  question: string
  answer: number
}

export function generateMathChallenge(): MathChallenge {
  const a = 1 + Math.floor(Math.random() * 9)
  const b = 1 + Math.floor(Math.random() * 9)
  const operations = ['+', '-', '+']
  const op = operations[Math.floor(Math.random() * operations.length)]
  const answer = op === '+' ? a + b : a - b
  return {
    question: `${a} ${op} ${b} = ?`,
    answer
  }
}
