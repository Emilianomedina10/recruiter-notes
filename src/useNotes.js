import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { SEED_NOTES } from './constants'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notes:', error)
      setLoading(false)
      return
    }

    // Seed the database if empty
    if (data.length === 0) {
      const { data: seeded, error: seedError } = await supabase
        .from('notes')
        .insert(SEED_NOTES)
        .select()
      if (!seedError && seeded) setNotes(seeded)
    } else {
      setNotes(data)
    }
    setLoading(false)
  }

  async function addNote(note) {
    const newNote = {
      ...note,
      id: Date.now().toString(36),
      created_at: new Date().toISOString(),
    }
    const { data, error } = await supabase
      .from('notes')
      .insert(newNote)
      .select()
      .single()

    if (error) { console.error('Error saving note:', error); return }
    setNotes(prev => [data, ...prev])
    return data
  }

  async function deleteNote(id) {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) { console.error('Error deleting note:', error); return }
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return { notes, loading, addNote, deleteNote }
}
