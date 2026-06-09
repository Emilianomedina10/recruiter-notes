export const WP_POSITIONS = {
  'Acme Corp - Technology Transformation': [
    'Senior Software Engineer',
    'Cloud Infrastructure Lead',
    'Product Manager',
  ],
  'Acme Corp - Data & Analytics': [
    'Data Engineer',
    'Analytics Manager',
  ],
  'Pinnacle Health - Digital Operations': [
    'Security Analyst',
    'IT Project Manager',
    'Business Systems Analyst',
  ],
}

export const NOTE_TYPES = [
  { value: 'hiring_manager_signal', label: 'Hiring manager signal' },
  { value: 'market_signal',         label: 'Market signal' },
  { value: 'candidate_feedback',    label: 'Candidate feedback' },
  { value: 'requirement_change',    label: 'Requirement change' },
  { value: 'other',                 label: 'Other' },
]

export const SIGNAL_SOURCES = [
  { value: 'call',      label: 'Call' },
  { value: 'email',     label: 'Email' },
  { value: 'sourcing',  label: 'Sourcing run' },
  { value: 'interview', label: 'Interview' },
  { value: 'market',    label: 'Market research' },
  { value: 'other',     label: 'Other' },
]

export const SEED_NOTES = [
  {
    id: 'seed-1',
    recruiter: 'Priya Nair',
    type: 'hiring_manager_signal',
    wp: 'Acme Corp - Technology Transformation',
    position: 'Senior Software Engineer',
    source: 'call',
    tags: ['system-design', 'bar-raised'],
    note: 'Hiring manager clarified they want someone who has led a migration from monolith to microservices — not just contributed to one. Previous shortlist was too junior on this dimension.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'seed-2',
    recruiter: 'Marcos Delgado',
    type: 'market_signal',
    wp: '',
    position: '',
    source: 'sourcing',
    tags: ['layoffs', 'talent-pool'],
    note: "Caught a wave of strong data engineers getting laid off from Stripe and Plaid this week. Worth moving fast — they'll get snapped up. Mostly mid-senior level, open to new roles.",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    recruiter: 'Priya Nair',
    type: 'candidate_feedback',
    wp: 'Pinnacle Health - Digital Operations',
    position: 'IT Project Manager',
    source: 'interview',
    tags: ['culture-fit', 'compensation'],
    note: "Strong panel feedback on Maya R. but she's currently at 145k base. Our band tops out at 130k — likely a no-go unless comp is reconsidered. Worth flagging to the client.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'seed-4',
    recruiter: 'Jordan Kim',
    type: 'requirement_change',
    wp: 'Acme Corp - Data & Analytics',
    position: 'Analytics Manager',
    source: 'email',
    tags: ['start-date', 'urgency'],
    note: 'Client pushed start date from Q3 to end of July — 3 weeks earlier than planned. Need to accelerate final round scheduling. Also mentioned they\'d accept someone with 5yrs exp instead of 7.',
    created_at: new Date(Date.now() - 43200000).toISOString(),
  },
]
