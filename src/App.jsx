import { useState } from 'react'
import { useNotes } from './useNotes'
import LogNote from './components/LogNote'
import BrowseNotes from './components/BrowseNotes'
import AskAI from './components/AskAI'
import styles from './App.module.css'

const TABS = [
  { id: 'log',    label: 'Log note',      icon: 'ti-plus' },
  { id: 'browse', label: 'Browse notes',  icon: 'ti-list' },
  { id: 'ask',    label: 'Ask AI',        icon: 'ti-message-circle' },
]

export default function App() {
  const [tab, setTab] = useState('log')
  const { notes, loading, addNote, deleteNote } = useNotes()

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.logo}>Vereda Labs</span>
        <span className={styles.appName}>Recruiter Notes</span>
        {loading && <span className={styles.syncing}>Syncing…</span>}
      </header>

      <main className={styles.main}>
        <nav className={styles.tabs} role="tablist">
          {TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={tab === t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}>
              <i className={`ti ${t.icon}`} aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          {tab === 'log'    && <LogNote onSave={addNote} />}
          {tab === 'browse' && <BrowseNotes notes={notes} onDelete={deleteNote} loading={loading} />}
          {tab === 'ask'    && <AskAI notes={notes} />}
        </div>
      </main>
    </div>
  )
}
