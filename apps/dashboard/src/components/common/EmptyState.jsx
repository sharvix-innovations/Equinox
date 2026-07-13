import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message,
  action,
  className = '',
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-10 text-center', className)}>
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gray text-ink-soft">
        <Icon className="h-6 w-6" />
      </span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      {message && <p className="mt-1 max-w-xs text-sm text-ink-soft">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
