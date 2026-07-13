import { cn } from '@/lib/utils'
import SearchInput from './SearchInput'

/** Filter chips (segmented control) used above tables/grids. */
export function FilterChips({ options, value, onChange, className = '' }) {
  return (
    <div className={cn('no-scrollbar flex items-center gap-1 overflow-x-auto', className)}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        const active = val === value
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={cn(
              'focusable whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'bg-brand-gradient-soft text-brand-navy'
                : 'text-ink-soft hover:bg-brand-gray hover:text-ink',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/** Search + filter row above a data view. */
export default function Toolbar({ search, onSearch, searchPlaceholder, children, className = '' }) {
  return (
    <div className={cn('flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between', className)}>
      {onSearch && (
        <SearchInput
          value={search}
          onChange={onSearch}
          placeholder={searchPlaceholder}
          className="lg:w-72"
        />
      )}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
