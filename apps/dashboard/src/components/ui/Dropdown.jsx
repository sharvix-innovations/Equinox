import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Lightweight click-outside menu. `trigger` is the clickable element;
 * children are the menu contents (use <MenuItem>).
 */
export default function Dropdown({ trigger, children, align = 'right', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.14 }}
            onClick={() => setOpen(false)}
            className={cn(
              'panel absolute z-40 mt-1.5 min-w-[11rem] overflow-hidden p-1.5',
              align === 'right' ? 'right-0' : 'left-0',
              className,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MenuItem({ icon: Icon, children, onClick, danger = false, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors',
        danger ? 'text-danger hover:bg-danger/10' : 'text-ink hover:bg-brand-gray',
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  )
}

export function MenuDivider() {
  return <div className="my-1 h-px bg-line" />
}
