import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/motion'

const BG =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80'

export default function PageBanner({ title, crumb, image = BG }) {
  return (
    <section className="relative flex min-h-[24rem] items-center overflow-hidden pt-20 lg:min-h-[30rem]">
      {/* Prominent background photo */}
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* Green legibility overlay  image stays clearly visible */}
      <div className="absolute inset-0 bg-brand-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-transparent to-brand-navy/70" />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        animate="show"
        className="container-x relative w-full px-5 text-center sm:px-8 lg:px-12"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Simple breadcrumb */}
        <motion.nav
          variants={fadeUp}
          aria-label="Breadcrumb"
          className="mt-6 flex items-center justify-center gap-2.5 text-base font-semibold"
        >
          <Link to="/" className="text-brand-green transition-colors hover:text-brand-sky">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-white/60" />
          <span className="text-white">{crumb || title}</span>
        </motion.nav>
      </motion.div>
    </section>
  )
}
