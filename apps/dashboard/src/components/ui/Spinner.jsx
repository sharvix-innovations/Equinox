import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Spinner({ className = '', label }) {
  return (
    <div className={cn('flex items-center justify-center gap-2 text-ink-soft', className)}>
      <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={cn('animate-pulse rounded-lg bg-line/70', className)} />
}
