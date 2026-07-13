import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const baseControl =
  'focusable w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink ' +
  'placeholder:text-ink-soft/60 transition-colors disabled:bg-brand-gray disabled:opacity-70'

/** Wraps a control with a label, optional hint and error message. */
export function Field({ label, htmlFor, hint, error, required, className = '', children }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-danger">{error}</p>
      ) : (
        hint && <p className="text-xs text-ink-soft">{hint}</p>
      )}
    </div>
  )
}

export const Input = forwardRef(function Input(
  { label, hint, error, required, className = '', id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId
  const control = (
    <input
      ref={ref}
      id={inputId}
      className={cn(baseControl, 'h-10', error && 'border-danger/60', className)}
      {...props}
    />
  )
  if (!label && !hint && !error) return control
  return (
    <Field label={label} htmlFor={inputId} hint={hint} error={error} required={required}>
      {control}
    </Field>
  )
})

export const Textarea = forwardRef(function Textarea(
  { label, hint, error, required, className = '', id, rows = 4, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId
  const control = (
    <textarea
      ref={ref}
      id={inputId}
      rows={rows}
      className={cn(baseControl, 'resize-y py-2.5', error && 'border-danger/60', className)}
      {...props}
    />
  )
  if (!label && !hint && !error) return control
  return (
    <Field label={label} htmlFor={inputId} hint={hint} error={error} required={required}>
      {control}
    </Field>
  )
})

export const Select = forwardRef(function Select(
  { label, hint, error, required, className = '', id, options = [], children, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId
  const control = (
    <div className="relative">
      <select
        ref={ref}
        id={inputId}
        className={cn(
          baseControl,
          'h-10 appearance-none pr-9',
          error && 'border-danger/60',
          className,
        )}
        {...props}
      >
        {options.length
          ? options.map((o) =>
              typeof o === 'string' ? (
                <option key={o} value={o}>
                  {o}
                </option>
              ) : (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ),
            )
          : children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
    </div>
  )
  if (!label && !hint && !error) return control
  return (
    <Field label={label} htmlFor={inputId} hint={hint} error={error} required={required}>
      {control}
    </Field>
  )
})
