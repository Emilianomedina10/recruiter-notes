import { useState } from 'react'
import { NOTE_TYPES, SIGNAL_SOURCES, WP_POSITIONS } from '../constants'
import styles from './BrowseNotes.module.css'

const TYPE_MAP = Object.fromEntries(NOTE_TYPES.map(t => [t.value, t.label]))
const SOURCE_MAP = Object.fromEntries(SIGNAL_SOURCES.map(s => [s.value, s.label]))

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.round(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.round(diff / 3600000)}h ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function BrowseNotes({ notes, onDelete, loading }) {
  const [fType, setFType] = useState('')
  const [fWP, setFWP] = useState('')
  const [fSearch, setFSearch] = useState('')

  const filtered = notes.filter(n => {
    if (fType && n.type !== fType) return false
    if (fWP && n.wp !== fWP) return false
    if (fSearch) {
      const q = fSearch.toLowerCase()
      if (!n.note.toLowerCase().includes(q) &&
          !n.recruiter.toLowerCase().includes(q) &&
          !n.tags.join(' ').toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div>
      <h2 className={styles.title}>Browse notes</h2>

      <div className={styles.filterBar}>
        <select value={fType} onChange={e => setFType(e.target.value)} className={styles.filterSelect}>
          <option value="">All types</option>
          {NOTE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <select value={fWP} onChange={e => setFWP(e.target.value)} className={styles.filterSelect}>
          <option value="">All work packets</option>
          {Object.keys(WP_POSITIONS).map(wp => <option key={wp} value={wp}>{wp}</option>)}
        </select>
        <input type="text" placeholder="Search notes…" value={fSearch}
          onChange={e => setFSearch(e.target.value)} className={styles.searchInput} />
      </div>

      {filtered.length > 0 && (
        <p className={styles.count}>{filtered.length} note{filtered.length !== 1 ? 's' : ''} found</p>
      )}

      {loading ? (
        <div className={styles.empty}>Loading notes…</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <i className="ti ti-notes" style={{ fontSize: 32, display: 'block', marginBottom: 8 }} aria-hidden="true" />
          No notes yet. Log your first observation.
        </div>
      ) : (
        filtered.map(n => (
          <div key={n.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.noteText}>{n.note}</p>
              <button className={styles.delBtn} onClick={() => onDelete(n.id)} aria-label="Delete note">
                <i className="ti ti-trash" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.badges}>
              {n.type && <span className={`${styles.badge} ${styles.badgeType}`}>{TYPE_MAP[n.type] || n.type}</span>}
              {n.source && <span className={`${styles.badge} ${styles.badgeSource}`}>{SOURCE_MAP[n.source] || n.source}</span>}
              {n.wp && <span className={`${styles.badge} ${styles.badgeWP}`}>{n.wp}</span>}
              {n.position && <span className={`${styles.badge} ${styles.badgePos}`}>{n.position}</span>}
              {n.tags.map(t => <span key={t} className={`${styles.badge} ${styles.badgeTag}`}>#{t}</span>)}
            </div>
            <p className={styles.meta}>{n.recruiter} · {timeAgo(n.created_at)}</p>
          </div>
        ))
      )}
    </div>
  )
}
