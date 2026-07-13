import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Linkedin, GraduationCap, Award, ClipboardCheck, CheckCircle2,
  FlaskConical, Mail, ArrowUpRight, Quote,
} from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import CtaBanner from '@/components/ui/CtaBanner'
import { management } from '@/data/pages'
import { company } from '@/data/site'
import { fadeUp, fromLeft, fromRight, stagger, viewport } from '@/lib/motion'

const BANNER =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80'

export default function ManagementPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <main>
      <PageBanner title="Our Management" crumb="Management" image={BANNER} />

      {/* Intro */}
      <section className="section-pad pb-4">
        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership"
            title="The experts steering"
            highlight="Equinox"
            subtitle="Decades of environmental science, engineering and regulatory expertise  accredited, published and trusted by industry and government alike."
            className="mx-auto text-center"
          />
        </div>
      </section>

      {management.map((m, i) => (
        <ProfileBlock key={m.name} m={m} index={i} reverse={i % 2 === 1} />
      ))}

      <div className="pt-4 md:pt-10">
        <CtaBanner title="Want to work with our leadership?" text="Reach out for a direct conversation with our senior team." cta="Get in Touch" />
      </div>
    </main>
  )
}

function ProfileBlock({ m, index, reverse }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <section className={`section-pad ${reverse ? 'bg-surface-2' : ''}`}>
      <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Photo + at-a-glance */}
        <motion.div
          variants={reverse ? fromRight : fromLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className={`relative lg:sticky lg:top-28 ${reverse ? 'lg:order-2' : ''}`}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-card group">
            <img
              src={m.photo}
              alt={m.name}
              onError={(e) => { e.currentTarget.src = m.photoFallback }}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/40 to-transparent" />
            
            {/* Role badge */}
            <span className="absolute left-5 top-5 rounded-full bg-brand-green px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-glow">
              {m.role}
            </span>

            {/* Name + number overlay */}
            <div className="absolute inset-x-5 bottom-5">
              <h3 className="font-display text-2xl font-bold text-white drop-shadow">{m.name}</h3>
              <span className="absolute bottom-0 right-0 font-display text-6xl font-extrabold text-white/20">{num}</span>
            </div>
          </div>

          {/* Experience Info Card */}
          <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                <Award className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <div className="font-display text-xl font-extrabold text-ink">{m.exp}</div>
                <div className="text-xs font-semibold text-brand-green uppercase tracking-wide">{m.expLabel}</div>
              </div>
              <a
                href={`mailto:${company.email}`}
                aria-label="Email"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-ink-soft transition-all hover:border-brand-green hover:bg-brand-green hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          variants={reverse ? fromLeft : fromRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className={reverse ? 'lg:order-1' : ''}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            <span className="h-px w-8 bg-brand-green/40" /> {index === 0 ? 'Chairman' : 'Managing Director'}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">{m.name}</h2>

          {/* Credentials chips */}
          <div className="mt-5 flex items-start gap-3">
            <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-brand-green" />
            <div className="flex flex-wrap gap-2">
              {m.credentials.map((c) => (
                <span key={c} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink">{c}</span>
              ))}
            </div>
          </div>

          {/* Role badges */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-green/10 text-brand-green"><ClipboardCheck className="h-5 w-5" /></span>
              <p className="text-sm font-medium leading-relaxed text-ink">{m.eiaRole}</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-green/10 text-brand-green"><FlaskConical className="h-5 w-5" /></span>
              <p className="text-sm font-semibold text-ink">{m.faExpert}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="relative mt-6 rounded-2xl bg-brand-green/5 p-5 pl-12">
            <Quote className="absolute left-4 top-5 h-5 w-5 text-brand-green/50" />
            <p className="text-base leading-relaxed text-ink-soft">{m.bio}</p>
          </div>

          {/* Research (optional) */}
          {m.research && (
            <div className="mt-8">
              <h4 className="font-display text-lg font-bold text-ink">Research</h4>
              <p className="mt-1 text-sm text-ink-soft">{m.research.intro}</p>
              <motion.ul variants={stagger(0.05)} className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {m.research.items.map((it) => (
                  <motion.li key={it} variants={fadeUp} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    <span>{it}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}

          {/* Highlights */}
          <div className="mt-8">
            <h4 className="font-display text-lg font-bold text-ink">{m.highlightsLabel}</h4>
            <motion.ul variants={stagger(0.06)} className="mt-4 space-y-2.5">
              {m.highlights.map((it) => (
                <motion.li key={it} variants={fadeUp} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5 transition-colors hover:border-brand-green">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/12 text-brand-green"><CheckCircle2 className="h-4 w-4" /></span>
                  <span className="text-sm font-medium text-ink">{it}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105">
            <Linkedin className="h-4 w-4" /> Connect on LinkedIn <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
