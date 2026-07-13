import { motion } from 'framer-motion'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50'

const sizes = {
  md: 'py-1.5 pl-6 pr-1.5 text-sm',
  lg: 'py-2 pl-8 pr-2 text-base',
}

const variants = {
  primary:
    'text-white bg-brand-green shadow-glow hover:bg-brand-navy',
  ghost:
    'text-ink border border-line bg-surface/60 backdrop-blur-md hover:border-brand-green hover:text-brand-green',
  glass:
    'text-white glass hover:bg-white/20',
  white:
    'bg-white text-brand-navy shadow-soft hover:bg-white/90',
}

// Circle background for the trailing icon, per variant (Wastex signature).
const iconCircle = {
  primary: 'bg-white text-brand-green',
  ghost: 'bg-brand-green/12 text-brand-green group-hover:bg-brand-green group-hover:text-white',
  glass: 'bg-white/20 text-white',
  white: 'bg-brand-green text-white',
}

const iconSizes = {
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  as = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  // `as` may be a string tag ('a'/'button') → use a motion element,
  // or a component (e.g. react-router Link) → use it directly.
  const isTag = typeof as === 'string'
  const Comp = isTag ? motion[as] || motion.button : as
  const motionProps = isTag ? { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } } : {}
  return (
    <Comp
      {...motionProps}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {Icon && (
        <span
          className={`relative z-10 grid ${iconSizes[size]} place-items-center rounded-full transition-all duration-300 ${iconCircle[variant]}`}
        >
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </Comp>
  )
}
