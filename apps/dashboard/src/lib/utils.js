// ── Class name joiner (tiny clsx) ──────────────────────────────────────────
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Formatting helpers ──────────────────────────────────────────────────────
export const formatNumber = (n) =>
  new Intl.NumberFormat('en-IN').format(Number(n) || 0)

export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(n) || 0)

export const formatCompact = (n) =>
  new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(
    Number(n) || 0,
  )

export function formatDate(value, opts = { day: '2-digit', month: 'short', year: 'numeric' }) {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-IN', opts)
}

export function timeAgo(value) {
  if (!value) return ''
  const d = value instanceof Date ? value : new Date(value)
  const diff = Date.now() - d.getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(d)
}

// ── Misc ─────────────────────────────────────────────────────────────────────
export const slugify = (s = '') =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

// Stable-ish unique id for new records (client-side only, mock persistence).
export const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

export const clone = (v) =>
  typeof structuredClone === 'function' ? structuredClone(v) : JSON.parse(JSON.stringify(v))
