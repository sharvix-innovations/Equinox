import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { company } from '@/data/site'
import { fadeUp, viewport } from '@/lib/motion'

// Reusable green CTA band shown near the bottom of inner pages.
export default function CtaBanner({
  title = 'Ready to build a cleaner future?',
  text = 'Talk to our environmental experts about your clearance, compliance or restoration goals.',
  cta = 'Get in Touch',
  to = '/contact',
}) {
  return (
    <section className="section-pad pt-0">
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] bg-brand-navy px-8 py-12 text-white shadow-card sm:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-navy-radial opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.06]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-green/30 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-white/75">{text}</p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              <Link
                to={to}
                className="inline-flex items-center gap-2 rounded-full bg-brand-green py-2 pl-6 pr-2 font-display font-semibold text-white shadow-glow transition-transform hover:scale-105"
              >
                {cta}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
