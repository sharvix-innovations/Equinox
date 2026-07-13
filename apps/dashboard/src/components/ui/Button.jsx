import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  primary:
    'bg-brand-blue text-white shadow-sm hover:bg-brand-green active:scale-[.98] disabled:bg-brand-blue/50',
  secondary:
    'bg-brand-gray text-ink hover:bg-brand-sky/25 active:scale-[.98] border border-line',
  outline:
    'bg-surface text-ink border border-line hover:bg-brand-gray active:scale-[.98]',
  ghost: 'bg-transparent text-ink-soft hover:bg-brand-gray hover:text-ink',
  danger:
    'bg-danger text-white shadow-sm hover:bg-danger/90 active:scale-[.98] disabled:bg-danger/50',
  subtle: 'bg-brand-gradient-soft text-brand-navy hover:brightness-95',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-sm gap-2 rounded-xl',
  icon: 'h-10 w-10 rounded-xl',
  'icon-sm': 'h-8 w-8 rounded-lg',
}

const Button = forwardRef(function Button(
  {
    as: Comp = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    icon: Icon,
    iconRight: IconRight,
    className = '',
    children,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'focusable inline-flex select-none items-center justify-center font-semibold',
        'transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-90',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className={cn('h-4 w-4', size === 'sm' && 'h-3.5 w-3.5')} />
      )}
      {children}
      {IconRight && !loading && <IconRight className="h-4 w-4" />}
    </Comp>
  )
})

export default Button
