import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useToastState } from '@/store/ToastContext'
import { cn } from '@/lib/utils'

const ICON = { success: CheckCircle2, error: AlertCircle, info: Info }
const ACCENT = {
  success: 'text-brand-green',
  error: 'text-danger',
  info: 'text-info',
}

export default function ToastViewport() {
  const { toasts, dismiss } = useToastState()

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-full max-w-sm flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICON[t.variant] ?? Info
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="panel pointer-events-auto flex items-start gap-3 p-3.5 pr-2.5"
            >
              <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', ACCENT[t.variant])} />
              <div className="min-w-0 flex-1">
                {t.title && <p className="text-sm font-semibold text-ink">{t.title}</p>}
                <p className="text-sm text-ink-soft">{t.message}</p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="rounded-md p-1 text-ink-soft hover:bg-brand-gray hover:text-ink"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
