# Recruiter Notes

> A lightweight internal tool for recruiters to log observations, browse note history, and query captured intelligence using natural language.

**Vereda Labs — Interview Assessment · Business Operations Engineer**

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| **Log Note** | Structured form to capture recruiter observations linked to Work Packet, position, signal source, and type |
| **Browse Notes** | Filterable list by type, work packet, position, and free-text search |
| **Ask AI** | Natural language query interface powered by Claude to surface relevant observations |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite |
| **Database** | Supabase (PostgreSQL) |
| **AI Engine** | Anthropic Claude API (Sonnet 4) |
| **Styling** | CSS Modules |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Clone & Install

```bash
git clone https://github.com/Emilianomedina10/recruiter-notes
cd recruiter-notes
npm install
npm run dev
```

App runs at **http://localhost:5173**

### Environment Variables

Create a `.env` file in the root (never commit):

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Database Setup

Run once in your Supabase SQL Editor:

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

alter table notes disable row level security;
```

The app auto-seeds 4 dummy notes on first load if the table is empty.

---

## 📁 Project Structure

```
recruiter-notes/
├── src/
│   ├── constants.js          # Work packets, enums, seed notes
│   ├── supabase.js           # Supabase client
│   ├── useNotes.js           # Data hook — load, add, delete
│   ├── App.jsx
│   ├── App.module.css
│   └── components/
│       ├── LogNote.jsx       # Ingestion form
│       ├── BrowseNotes.jsx   # Filterable note list
│       └── AskAI.jsx         # Claude-powered query tab
├── .env                      # Local only — not committed
├── .env.example
├── index.html
└── package.json
```

---

## 🌐 Deploy to Vercel

### Build

```bash
npm run build
```

### Deploy

1. Push to GitHub
2. Import repo into [Vercel](https://vercel.com)
3. Add environment variables in **Project Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy (Vercel auto-detects Vite — no build config needed)

---

## 🤖 AI Tools Used

Built entirely with **Claude (Sonnet 4)** via [claude.ai](https://claude.ai):
- Schema design
- Full application code generation
- AI engine powering the Ask AI tab

---

## 📝 License

MIT
