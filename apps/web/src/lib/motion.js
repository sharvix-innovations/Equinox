// Shared Framer Motion variants & transitions for consistent choreography.

export const easeOut = [0.22, 1, 0.36, 1]
export const easeSoft = [0.4, 0, 0.2, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
}

export const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
}

export const fromRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
}

// Stagger container  children should use `fadeUp` (or similar) as variants.
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// Default viewport config for whileInView usage.
export const viewport = { once: true, amount: 0.25 }
