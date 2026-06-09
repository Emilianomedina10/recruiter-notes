Recruiter Notes — Vereda Labs Interview Assessment
A lightweight tool for recruiters to log, browse, and query observations from their day-to-day work.
Stack

React 18 + Vite
Supabase — PostgreSQL database, no auth required
Anthropic Claude API — powers the natural language "Ask AI" tab
CSS Modules — scoped styles

Getting started
bashnpm install
npm run dev
App runs at http://localhost:5173.
Environment variables
Create a .env file in the root:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
Database setup
Run this in your Supabase SQL Editor:
sqlcreate table notes (
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

alter table notes disable row level security;
The app auto-seeds 4 dummy notes on first load if the table is empty.
Project structure
src/
  constants.js          # WP/position data, enums, seed notes
  supabase.js           # Supabase client
  useNotes.js           # Data fetching hook (add, delete, load)
  App.jsx / App.module.css
  components/
    LogNote.jsx         # Ingestion form
    BrowseNotes.jsx     # Filterable note list
    AskAI.jsx           # Claude-powered query interface
Deploy to Vercel
bashnpm run build
Push to GitHub, import repo in Vercel, and add the two environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in the Vercel project settings before deploying.
AI tools used
Built with Claude (Sonnet 4) in claude.ai — used for schema design, full code generation, and as the AI engine powering the Ask AI tab.You said: but give me so i can copy directly to github with nice structurebut give me so i can copy directly to github with nice structure5:41 PMClaude responded: Here's the exact README formatted for GitHub — copy this directly into your repo's README.Here's the exact README formatted for GitHub — copy this directly into your repo's README.md:

Recruiter Notes

Interview Assessment — Vereda Labs · Business Operations Engineer

A lightweight internal tool for recruiters to log observations, browse the team's note history, and query captured intelligence using natural language.

What it does
TabDescriptionLog noteStructured form to capture recruiter observations — linked to a Work Packet, position, signal source, and typeBrowse notesFilterable list by type, work packet, and free-text searchAsk AINatural language queries across all logged notes, powered by Claude

Tech stack
LayerChoiceFrontendReact 18 + ViteDatabaseSupabase (PostgreSQL)AIAnthropic Claude API (Sonnet 4)StylesCSS ModulesDeployVercel

Local setup
bashgit clone https://github.com/your-username/recruiter-notes
cd recruiter-notes
npm install
npm run dev
App runs at http://localhost:5173

Environment variables
Create a .env file in the root (never commit this):
bashVITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

Database setup
Run once in your Supabase SQL Editor:
sqlcreate table notes (
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

alter table notes disable row level security;

The app auto-seeds 4 dummy notes on first load if the table is empty.


Project structure
recruiter-notes/
├── src/
│   ├── constants.js          # Work packets, enums, seed notes
│   ├── supabase.js           # Supabase client
│   ├── useNotes.js           # Data hook — load, add, delete
│   ├── App.jsx
│   └── components/
│       ├── LogNote.jsx       # Ingestion form
│       ├── BrowseNotes.jsx   # Filterable note list
│       └── AskAI.jsx         # Claude-powered query tab
├── .env                      # Local only — not committed
├── .env.example
└── index.html

Deploy
Push to GitHub, import into Vercel, and add the two env vars in Project Settings → Environment Variables before deploying. Vercel auto-detects Vite — no build config needed.

AI tools used
Built entirely with Claude (Sonnet 4) via claude.ai — used for schema design, application code, and as the AI engine powering the Ask AI tab.
