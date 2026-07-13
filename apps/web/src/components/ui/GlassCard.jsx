import { motion } from 'framer-motion'

// Reusable glassmorphism surface with optional gradient-border + hover lift.
export default function GlassCard({
  children,
  className = '',
  hover = true,
  gradientBorder = false,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`glass-card ${gradientBorder ? 'gradient-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
