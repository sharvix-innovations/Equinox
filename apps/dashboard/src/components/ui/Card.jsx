import { cn } from '@/lib/utils'

export function Card({ className = '', children, ...props }) {
  return (
    <div className={cn('panel', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div
      className={cn('flex items-center justify-between gap-3 border-b border-line px-5 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={cn('text-base font-semibold text-ink', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardBody({ className = '', children, ...props }) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  )
}
