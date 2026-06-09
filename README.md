# Recruiter Notes — Vereda Labs Interview Assessment

A lightweight tool for recruiters to log, browse, and query observations from their day-to-day work.

## Stack

- **React 18** + **Vite** — no framework overhead
- **localStorage** — notes persist in the browser (no backend required for demo)
- **Anthropic Claude API** — powers the natural language "Ask AI" tab
- **CSS Modules** — scoped styles, no build-time dependencies

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. No environment variables needed — the AI tab calls the Anthropic API directly from the browser (suitable for demo; see production notes below).

## Project structure

```
src/
  constants.js          # WP/position data, enums, seed notes
  useNotes.js           # localStorage persistence hook
  App.jsx / App.module.css
  components/
    LogNote.jsx         # Ingestion form
    BrowseNotes.jsx     # Filterable note list
    AskAI.jsx           # Claude-powered query interface
```

## Deploy to Vercel / Netlify

```bash
npm run build           # outputs to /dist
```

Point Vercel or Netlify at the repo root — both detect Vite automatically. No environment variables required for the demo build.

## Swapping to a real database (Supabase)

Replace the `load()` / `persist()` functions in `useNotes.js` with Supabase client calls:

```js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// load
const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })

// persist (insert)
await supabase.from('notes').insert(note)

// delete
await supabase.from('notes').delete().eq('id', id)
```

Suggested table schema:

```sql
create table notes (
  id          text primary key,
  recruiter   text,
  type        text,
  wp          text,
  position    text,
  source      text,
  tags        text[],
  note        text not null,
  created_at  timestamptz default now()
);
```

## Production notes

- The AI tab calls `api.anthropic.com` directly from the browser. In production, proxy this through a backend route (`/api/ask`) to keep the API key server-side.
- WPs and positions are hardcoded in `constants.js`. In production, pull these from a `work_packets` table.
- No authentication is implemented. Add Supabase Auth + a `recruiter_id` FK on the notes table to support multi-user isolation.
- At large note volumes (500+), switch the AI retrieval from full-corpus prompting to embedding-based search (Supabase pgvector) to stay within context limits.

## AI tools used

Built with Claude (Sonnet 4) in claude.ai — used for schema design, full code generation, and as the AI engine in the Ask tab.
