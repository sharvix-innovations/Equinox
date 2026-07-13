import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/motion'

// Wastex-style section heading: a leaf-icon green eyebrow, a bold display
// title with a flat-green highlight word, and an optional subtitle.
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  uppercase = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <motion.div
      variants={stagger(0.14)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex flex-col ${alignment} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="mb-4 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-green"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-green/12">
            <Leaf className="h-3.5 w-3.5" />
          </span>
          {eyebrow}
          <span className="h-px w-8 bg-brand-green/40" />
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`font-display font-extrabold leading-[1.08] text-ink ${
          uppercase ? 'uppercase tracking-tight' : ''
        } text-3xl sm:text-4xl lg:text-[2.75rem]`}
      >
        {title}{' '}
        {highlight && <span className="text-brand-green">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base leading-relaxed text-ink-soft sm:text-lg ${
            align === 'center' ? 'max-w-2xl' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
