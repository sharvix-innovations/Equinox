import { cn } from '@/lib/utils'
import { initials as toInitials } from '@/lib/utils'

const SIZES = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base' }

export default function Avatar({ name = '', src, size = 'md', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-brand-gradient font-semibold text-white',
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        toInitials(name) || '?'
      )}
    </span>
  )
}
