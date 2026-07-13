import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focusable h-10 w-full rounded-xl border border-line bg-surface pl-9 pr-9 text-sm text-ink placeholder:text-ink-soft/60"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-soft hover:bg-brand-gray hover:text-ink"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
