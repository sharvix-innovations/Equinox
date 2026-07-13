// Pill-style category filter used across list pages.
export default function FilterTabs({ items, active, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2.5 ${className}`}>
      {items.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
            active === t
              ? 'bg-brand-green text-white shadow-glow'
              : 'border border-line bg-surface text-ink-soft hover:border-brand-green hover:text-brand-green'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
