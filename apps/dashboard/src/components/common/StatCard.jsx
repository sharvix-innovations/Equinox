import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

/**
 * KPI card in the Donezo style: label + arrow button, a big number, and a
 * delta chip with a "since last month" caption. Pass `filled` for the
 * highlighted green card, and `to` to make the arrow button navigate.
 */
export default function StatCard({ label, value, delta, deltaLabel = 'from last month', filled = false, to }) {
  const up = typeof delta !== 'number' || delta >= 0
  const ArrowBtn = to ? Link : 'div'

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'panel panel-hover relative overflow-hidden p-5',
        filled && 'border-transparent bg-[linear-gradient(150deg,#3DA94E_0%,#2E9E43_55%,#1c7a35_100%)] text-white shadow-glow-green',
      )}
    >
      {filled && (
        <div className="pointer-events-none absolute -right-10 -bottom-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <p className={cn('text-sm font-semibold', filled ? 'text-white/90' : 'text-ink')}>{label}</p>
        <ArrowBtn
          {...(to ? { to } : {})}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform hover:scale-105',
            filled
              ? 'border-white/30 bg-white/15 text-white'
              : 'border-line bg-surface text-ink-soft hover:text-ink',
          )}
          aria-label={`View ${label}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </ArrowBtn>
      </div>

      <p className={cn('relative mt-3 text-5xl font-bold leading-none tracking-tight', filled ? 'text-white' : 'text-ink')}>
        {value}
      </p>

      {typeof delta === 'number' ? (
        <div className="relative mt-4 flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-bold',
              filled
                ? 'bg-white/20 text-white'
                : up
                  ? 'bg-brand-sky/20 text-brand-green'
                  : 'bg-danger/10 text-danger',
            )}
          >
            {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(delta)}
          </span>
          <span className={cn('text-xs', filled ? 'text-white/70' : 'text-ink-soft')}>
            {up ? 'Increased' : 'Decreased'} {deltaLabel}
          </span>
        </div>
      ) : (
        <p className={cn('relative mt-4 text-xs', filled ? 'text-white/70' : 'text-ink-soft')}>{deltaLabel}</p>
      )}
    </motion.div>
  )
}
