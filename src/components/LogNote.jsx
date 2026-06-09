import { useState } from 'react'
import { WP_POSITIONS, NOTE_TYPES, SIGNAL_SOURCES } from '../constants'
import styles from './LogNote.module.css'

const EMPTY = {
  recruiter: '',
  type: '',
  wp: '',
  position: '',
  source: '',
  tags: '',
  note: '',
}

export default function LogNote({ onSave }) {
  const [form, setForm] = useState(EMPTY)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'wp') next.position = ''
      return next
    })
  }

  function handleSave() {
    if (!form.note.trim()) { setError('Note text is required.'); return }
    setError('')
    onSave({
      recruiter: form.recruiter.trim() || 'Anonymous',
      type: form.type,
      wp: form.wp,
      position: form.position,
      source: form.source,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      note: form.note.trim(),
    })
    setForm(EMPTY)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const positions = form.wp ? WP_POSITIONS[form.wp] || [] : []

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Log a recruiter note</h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="recruiter">Your name</label>
          <input id="recruiter" type="text" placeholder="e.g. Jordan Kim"
            value={form.recruiter} onChange={e => set('recruiter', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="note-type">Note type</label>
          <select id="note-type" value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="">— select —</option>
            {NOTE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="wp">Work packet</label>
          <select id="wp" value={form.wp} onChange={e => set('wp', e.target.value)}>
            <option value="">— not WP-specific —</option>
            {Object.keys(WP_POSITIONS).map(wp => <option key={wp} value={wp}>{wp}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="position">Position (optional)</label>
          <select id="position" value={form.position} onChange={e => set('position', e.target.value)}
            disabled={positions.length === 0}>
            <option value="">— {positions.length ? 'no specific position' : 'select WP first'} —</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="source">Signal source</label>
          <select id="source" value={form.source} onChange={e => set('source', e.target.value)}>
            <option value="">— select —</option>
            {SIGNAL_SOURCES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input id="tags" type="text" placeholder="e.g. remote, salary, retention"
            value={form.tags} onChange={e => set('tags', e.target.value)} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="note-body">
          Note <span className={styles.required}>*</span>
        </label>
        <textarea id="note-body" rows={4}
          placeholder="What did you observe or hear? Be specific — this helps you and your team find it later."
          value={form.note} onChange={e => set('note', e.target.value)} />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btnSecondary} onClick={() => setForm(EMPTY)}>Clear</button>
        <button className={styles.btnPrimary} onClick={handleSave}>
          <i className="ti ti-check" aria-hidden="true" /> Save note
        </button>
      </div>

      {saved && <div className={styles.toast}>Note saved ✓</div>}
    </div>
  )
}
