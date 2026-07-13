import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { modalMotion } from '@/lib/motion'

const WIDTHS = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
}) {
  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
          <motion.div
            className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              'panel relative z-10 my-auto w-full overflow-hidden',
              WIDTHS[size],
            )}
            {...modalMotion}
          >
            {(title || onClose) && (
              <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                <div>
                  {title && <h2 className="text-lg font-semibold text-ink">{title}</h2>}
                  {description && (
                    <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="focusable -mr-1 rounded-lg p-1.5 text-ink-soft hover:bg-brand-gray hover:text-ink"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="max-h-[70vh] overflow-y-auto px-5 py-5">{children}</div>

            {footer && (
              <div className="flex items-center justify-end gap-2 border-t border-line bg-surface-2/60 px-5 py-3.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
