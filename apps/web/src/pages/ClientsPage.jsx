import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, ArrowRight, Users, TrendingUp } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import CtaBanner from '@/components/ui/CtaBanner'
import { clients, clientSectors } from '@/data/pages'
import { testimonials } from '@/data/site'
import { fadeUp, scaleIn, stagger, viewport } from '@/lib/motion'

export default function ClientsPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const [sector, setSector] = useState('All')
  const list = sector === 'All' ? clients : clients.filter((c) => c.sector === sector)

  return (
    <main>
      <PageBanner eyebrow="Trusted by industry" title="Our Clients" crumb="Clients" />

      {/* Clients Section */}
      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="Client Portfolio"
            title="Trusted by 100+ leaders"
            highlight="across sectors"
            subtitle="Industrial leaders, developers and government bodies who rely on Equinox for environmental compliance and sustainable growth."
          />

          <div className="mt-10">
            <FilterTabs items={clientSectors} active={sector} onChange={setSector} />
          </div>

          <motion.div
            key={sector}
            variants={stagger(0.05)}
            initial="hidden"
            animate="show"
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {list.map((c) => (
              <motion.div
                key={c.name}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-6 text-center shadow-soft transition-all duration-500 hover:border-brand-green hover:shadow-card overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/0 to-brand-green/0 opacity-0 transition-all duration-500 group-hover:from-brand-green/5 group-hover:to-brand-green/10 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Avatar with initials */}
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy font-display text-lg font-extrabold text-white transition-all duration-500 group-hover:bg-brand-green group-hover:shadow-glow">
                    {c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>

                  {/* Company name */}
                  <span className="mt-4 block font-display text-sm font-bold text-ink line-clamp-2">{c.name}</span>

                  {/* Sector badge */}
                  <span className="mt-2.5 inline-block rounded-full border border-brand-green/25 bg-brand-green/8 px-3 py-1 text-[10px] font-semibold text-brand-green uppercase tracking-wide">
                    {c.sector}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-pad relative overflow-hidden bg-surface-2">
        <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="Client Testimonials"
            title="Hear from those who"
            highlight="trust Equinox"
            subtitle="Real feedback from industry leaders and project partners across India."
          />

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {testimonials.slice(0, 3).map((t) => (
              <motion.figure
                key={t.name}
                variants={fadeUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft transition-all duration-500 hover:border-brand-green hover:shadow-card"
              >
                {/* Background accent */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-green/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Header with quote and rating */}
                <div className="relative flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15">
                    <Quote className="h-5 w-5 text-brand-green/60" />
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-green text-brand-green" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="relative mt-5 flex-1 text-sm leading-relaxed text-ink">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green font-display text-xs font-bold text-white">
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-ink text-sm">{t.name}</div>
                    <div className="text-xs text-ink-soft truncate">{t.title}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="pt-4 md:pt-10">
        <CtaBanner title="Join our list of satisfied clients" cta="Start a Project" />
      </div>
    </main>
  )
}
