import { cn } from '@/lib/utils'

const TONES = {
  neutral: 'bg-brand-gray text-ink-soft',
  green: 'bg-brand-sky/20 text-brand-green',
  blue: 'bg-info/10 text-info',
  amber: 'bg-warning/15 text-warning',
  red: 'bg-danger/10 text-danger',
  outline: 'bg-transparent text-ink-soft border border-line',
}

export default function Badge({ tone = 'neutral', dot = false, className = '', children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  )
}

// Maps common status strings to a tone + readable label. Used everywhere
// a record has a lifecycle (published/draft, new/resolved, active…).
const STATUS_MAP = {
  published: { tone: 'green', label: 'Published' },
  active: { tone: 'green', label: 'Active' },
  upcoming: { tone: 'green', label: 'Upcoming' },
  resolved: { tone: 'green', label: 'Resolved' },
  draft: { tone: 'amber', label: 'Draft' },
  in_progress: { tone: 'blue', label: 'In progress' },
  new: { tone: 'blue', label: 'New' },
  past: { tone: 'neutral', label: 'Past' },
  inactive: { tone: 'neutral', label: 'Inactive' },
  archived: { tone: 'neutral', label: 'Archived' },
  high: { tone: 'red', label: 'High' },
  medium: { tone: 'amber', label: 'Medium' },
  low: { tone: 'neutral', label: 'Low' },
}

export function StatusBadge({ status, className = '' }) {
  const cfg = STATUS_MAP[status] ?? { tone: 'neutral', label: status ?? '—' }
  return (
    <Badge tone={cfg.tone} dot className={className}>
      {cfg.label}
    </Badge>
  )
}
