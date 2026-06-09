import { useState } from 'react'
import { NOTE_TYPES, SIGNAL_SOURCES } from '../constants'
import styles from './AskAI.module.css'

const TYPE_MAP = Object.fromEntries(NOTE_TYPES.map(t => [t.value, t.label]))
const SOURCE_MAP = Object.fromEntries(SIGNAL_SOURCES.map(s => [s.value, s.label]))

const SUGGESTIONS = [
  "What have we heard about candidates across all Acme Corp roles?",
  "Are there any requirement or schedule changes I should know about?",
  "Summarize the key market signals we've captured so far.",
]

function buildContext(notes) {
  if (notes.length === 0) return 'No notes have been logged yet.'
  return notes.map((n, i) => `[Note ${i + 1}]
Type: ${TYPE_MAP[n.type] || n.type || 'unspecified'}
Recruiter: ${n.recruiter}
Work Packet: ${n.wp || 'N/A'}
Position: ${n.position || 'N/A'}
Source: ${SOURCE_MAP[n.source] || n.source || 'N/A'}
Tags: ${n.tags.join(', ') || 'none'}
Date: ${new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
Note: ${n.note}`).join('\n\n---\n\n')
}

export default function AskAI({ notes }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function ask(q) {
    const query = q || question
    if (!query.trim()) return
    if (notes.length === 0) { setError('No notes logged yet — add some notes first.'); return }
    setLoading(true)
    setAnswer('')
    setError('')

    const systemPrompt = `You are a recruiting intelligence assistant for Vereda Labs. You help recruiters find and synthesize information from their logged notes.

Below is the full set of recruiter notes. Answer the user's question by synthesizing relevant notes. Be specific — reference particular notes when useful. If nothing is relevant, say so clearly. Keep answers concise but thorough. Plain paragraphs only.

RECRUITER NOTES:
${buildContext(notes)}`

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: query }],
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const text = data.content?.map(c => c.type === 'text' ? c.text : '').join('') || 'No response received.'
      setAnswer(text)
    } catch (e) {
      setError('Could not reach the AI. Check your ANTHROPIC_API_KEY and connection.')
    }
    setLoading(false)
  }

  function useSuggestion(s) {
    setQuestion(s)
    ask(s)
  }

  return (
    <div>
      <h2 className={styles.title}>Ask about your notes</h2>
      <p className={styles.subtitle}>
        Ask a natural language question across all {notes.length} logged note{notes.length !== 1 ? 's' : ''}.
        The AI reads the full note history to answer.
      </p>

      <div className={styles.field}>
        <label htmlFor="ai-q">Your question</label>
        <textarea id="ai-q" rows={3} value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="e.g. What signals have we captured about Acme Corp? Are there any retention concerns?"
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ask() }} />
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btnPrimary} onClick={() => ask()} disabled={loading}>
          {loading
            ? <><span className={styles.spinner} /> Thinking…</>
            : <><i className="ti ti-sparkles" aria-hidden="true" /> Ask</>}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {answer && (
        <div className={styles.answerBox}>
          <p className={styles.answerLabel}>AI answer</p>
          <p className={styles.answerText}>{answer}</p>
        </div>
      )}

      <div className={styles.suggestions}>
        <p className={styles.suggestLabel}>Try asking:</p>
        <div className={styles.suggestList}>
          {SUGGESTIONS.map(s => (
            <button key={s} className={styles.suggestBtn} onClick={() => useSuggestion(s)}>
              {s} ↗
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
