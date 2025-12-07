import { FormEvent, useMemo, useState } from 'react'
import { generateMathChallenge } from '../utils/mathChallenge'

interface ParentGateProps {
  onUnlock: () => void
}

function ParentGate({ onUnlock }: ParentGateProps) {
  const [challengeSeed, setChallengeSeed] = useState(Date.now())
  const challenge = useMemo(() => generateMathChallenge(challengeSeed), [challengeSeed])
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Number(answer) === challenge.answer) {
      setError('')
      onUnlock()
    } else {
      setError('Resposta incorreta. Tente novamente.')
      setChallengeSeed(Date.now())
      setAnswer('')
    }
  }

  return (
    <div className="card">
      <h2>Confirmação para Pais</h2>
      <p>Responda ao desafio para acessar o painel.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          {challenge.question}
          <input
            className="input"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Sua resposta"
            required
          />
        </label>
        <button className="button primary" type="submit">
          Entrar
        </button>
      </form>
      {error && <p className="text-error">{error}</p>}
    </div>
  )
}

export default ParentGate
